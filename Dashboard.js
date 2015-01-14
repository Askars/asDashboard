DashboardObj = function() {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.titleSectionObj = null;
    self.sideMenuObj = null;
    self.workspaceObj = new WorkspaceObj();
    self.overlayDiv = null;
    self.helpOverlayDiv = null;
    self.alertOverlayDiv = null;
};

DashboardObj.prototype.attachToDiv = function(contentDiv) {
    var self = this;
    if (contentDiv != null) {
        self.contentDiv = contentDiv;
        var titleSectionDiv = document.createElement('div');
        var sideMenuDiv = document.createElement('div');
        var workspaceDiv = document.createElement('div');
        contentDiv.appendChild(workspaceDiv);
        contentDiv.appendChild(titleSectionDiv);
        contentDiv.appendChild(sideMenuDiv);
        
        self.overlayDiv = document.createElement('div');
        self.helpOverlayDiv = document.createElement('div');
        self.alertOverlayDiv = document.createElement('div');
        
        self.overlayDiv.className = "OverlayDiv";
        self.helpOverlayDiv.className = "HelpOverlayDiv";
        self.alertOverlayDiv.className = "AlertOverlayDiv";
        
        contentDiv.appendChild(self.overlayDiv);
        contentDiv.appendChild(self.helpOverlayDiv);
        contentDiv.appendChild(self.alertOverlayDiv);
        
        self.workspaceObj.attachToDiv(workspaceDiv);
        self.titleSectionObj.attachToDiv(titleSectionDiv);
        self.sideMenuObj.attachToDiv(sideMenuDiv);        
    }
}


DashboardObj.prototype.setSideMenuObj = function(sideMenuObj) {
    if (sideMenuObj != null) {
        this.sideMenuObj = sideMenuObj;
        sideMenuObj.parent = this;
    }
}

DashboardObj.prototype.setTitleSectionObj = function(titleSectionObj) {
    if (titleSectionObj != null) {
        this.titleSectionObj = titleSectionObj;
        titleSectionObj.parent = this;
    }
}

DashboardObj.prototype.handleResize = function() {
    this.sideMenuObj.resizeMenu();
    this.workspaceObj.setSize(
        this.contentDiv.clientWidth - this.sideMenuObj.minWidth,
        this.contentDiv.clientHeight - this.titleSectionObj.contentDiv.clientHeight
    );
}

DashboardObj.prototype.showOverlayDiv = function() {
    this.overlayDiv.style.visibility = 'visible';
}

DashboardObj.prototype.hideOverlayDiv = function() {
    this.overlayDiv.style.visibility = 'hidden';
}

DashboardObj.prototype.showHelpOverlayDiv = function() {
    this.helpOverlayDiv.style.visibility = 'visible';
}

DashboardObj.prototype.hideHelpOverlayDiv = function() {
    this.helpOverlayDiv.style.visibility = 'hidden';
}

DashboardObj.prototype.showAlertOverlayDiv = function() {
    this.alertOverlayDiv.style.visibility = 'visible';
}

DashboardObj.prototype.hideAlertOverlayDiv = function() {
    this.alertOverlayDiv.style.visibility = 'hidden';
}


// Is options = is a options dialog
DashboardObj.prototype.buildAlertSkeleton = function (isOptions) {
    var self = this;
    var result = {};   
    
    result.modalDiv = document.createElement('div');
    result.iconDiv = document.createElement('div');
    result.msgDiv = document.createElement('div');
    if (isOptions) {
        result.rightDiv = document.createElement('div');
    }
    
    var clearDiv = document.createElement('div');
    var centeringDiv = createTotalCenterer(self.alertOverlayDiv, null);
    
    $(result.modalDiv).addClass("AlertDialog").appendTo($(centeringDiv));
    $(result.iconDiv).addClass("AlertIconDiv").appendTo($(result.modalDiv));
    if (isOptions) {
        $(result.rightDiv).addClass("AlertOptionsDiv").appendTo($(result.modalDiv));
        $(result.msgDiv).addClass("AlertMsg").appendTo($(result.rightDiv));
    } else {
        $(result.msgDiv).addClass("AlertMsg").appendTo($(result.modalDiv));    
    }
    $(clearDiv).css("clear", "both").appendTo($(result.modalDiv));
       
    return result;
}

DashboardObj.prototype.alert = function(msg) {
    var self = this;
    
    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();
    
    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.msgDiv).html(msg);
    
    $(skeletonDivs.iconDiv).addClass('AlertIconAlert');
    
    var okDiv = document.createElement('div');
    
    $(okDiv).addClass("AlertBtn").html("OK").appendTo($(skeletonDivs.modalDiv)).click(function () {
        self.hideAlertOverlayDiv();
        self.alertOverlayDiv.innerHTML = "";
    });
    
    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.modalDiv)); 

}

DashboardObj.prototype.confirm = function(config) {
    var self = this;
    
    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();
    
    /* var example = {
        msg: "Example message",
        auto_hide: false,
        show_close: false,
        ok_callback: function () {},
        cancel_callback: function () {}
    }*/
    
    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.msgDiv).html(config.msg);
    
    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');
    
    var okDiv = document.createElement('div');
    $(okDiv).addClass("AlertBtn").addClass("AlertConfirmBtn").html("OK").appendTo($(skeletonDivs.modalDiv)).click(function () {
        config.ok_callback();
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
    });
    
    var cancelDiv = document.createElement('div');
    $(cancelDiv).addClass("AlertBtn").html("Cancel").appendTo($(skeletonDivs.modalDiv)).click(function () {
        config.cancel_callback();
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
    });
    
    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.modalDiv)); 
}

DashboardObj.prototype.options = function(config) {
    
    /* var example = {
        msg: "Example message",
        auto_hide: false,
        show_close: false,
        buttons: [
            {
                text: "Text",
                callback: function() {}
            }
        ]
    }*/
    
    var self = this;
    
    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();
    
    skeletonDivs = this.buildAlertSkeleton(true);
    $(skeletonDivs.msgDiv).html(config.msg).css('float','none');
    
    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');
    
    for (var pos in config.buttons) {
        this_button = config.buttons[pos];
        var newDiv = document.createElement('div');
        $(newDiv).addClass("AlertBtn").html(this_button.text).css('float','none').appendTo($(skeletonDivs.rightDiv)).click(
            function (button) {
                return function () {
                    button.callback();
                    if (config.auto_hide) {
                        self.hideAlertOverlayDiv();
                        self.alertOverlayDiv.innerHTML = "";    
                    }
                }
            }(this_button)
        );
    }
    
    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.modalDiv));
    
}

