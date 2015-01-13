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


DashboardObj.prototype.buildAlertSkeleton = function () {
    var self = this;
    var result = {};   
    
    result.modalDiv = document.createElement('div');
    result.iconDiv = document.createElement('div');
    result.msgDiv = document.createElement('div');
    
    var clearDiv = document.createElement('div');
    var centeringDiv = createHorizontalCenterer(self.alertOverlayDiv, "AlertDialogWrapper");
    
    $(result.modalDiv).addClass("AlertDialog").appendTo($(centeringDiv));
    $(result.iconDiv).addClass("AlertIconDiv").appendTo($(result.modalDiv));
    $(result.msgDiv).addClass("AlertMsg").appendTo($(result.modalDiv));
    $(clearDiv).css("clear", "both").appendTo($(result.modalDiv));
       
    return result;
}

DashboardObj.prototype.alert = function(msg) {
    var self = this;
    
    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();
    
    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.msgDiv).html(msg);
    
    var okDiv = document.createElement('div');
    
    $(okDiv).addClass("AlertBtn").html("OK").appendTo($(skeletonDivs.modalDiv)).click(function () {
        self.hideAlertOverlayDiv();
        self.alertOverlayDiv.innerHTML = "";
    });
    
    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.modalDiv)); 

}

DashboardObj.prototype.confirm = function(msg, auto_hide, ok_callback, cancel_callback) {
    var self = this;
    
    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.msgDiv).html(msg);
    
    var cancelDiv = document.createElement('div');
    $(cancelDiv).addClass("AlertBtn").html("Cancel").appendTo($(skeletonDivs.modalDiv)).click(function () {
        cancel_callback();
        if (auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
    });
    
    var okDiv = document.createElement('div');
    $(okDiv).addClass("AlertBtn").html("OK").appendTo($(skeletonDivs.modalDiv)).click(function () {
        ok_callback();
        if (auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
    });
    
    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.modalDiv)); 
    
}
