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

DashboardObj.prototype.clearOverlayDiv = function() {
    this.overlayDiv.innerHTML = '';
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

DashboardObj.prototype.clearAlertOverlayDiv = function() {
    this.alertOverlayDiv.innerHTML = '';
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
    } else {
        result.msgAndDropdownDiv = document.createElement('div');
        result.dropdownDiv = document.createElement('div');
    }
    
    result.clickCaptureDiv = document.createElement('div');
    var clearDiv = document.createElement('div');
    
    $(result.clickCaptureDiv).addClass('ClickCaptureDiv').appendTo($(self.alertOverlayDiv));
    var centeringDiv = createTotalCenterer(result.clickCaptureDiv, null);
    
    $(result.modalDiv).addClass("AlertDialog").appendTo($(centeringDiv));
    $(result.iconDiv).addClass("AlertIconDiv").appendTo($(result.modalDiv));
    if (isOptions) {
        $(result.rightDiv).addClass("AlertOptionsDiv").appendTo($(result.modalDiv));
        $(result.msgDiv).addClass("AlertMsg").appendTo($(result.rightDiv));
    } else {
        $(result.msgAndDropdownDiv).addClass("AlertMsg").appendTo($(result.modalDiv));
        $(result.msgDiv).addClass("AlertMsgAndDropdown").appendTo($(result.msgAndDropdownDiv));
        $(result.dropdownDiv).addClass("AlertDropdown").appendTo($(result.msgAndDropdownDiv));    
    }
    $(clearDiv).css("clear", "both").appendTo($(result.modalDiv));
       
    return result;
}

DashboardObj.prototype.alert = function(msg, callback) {
    var self = this;
    
    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();
    
    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.msgDiv).html(msg);
    
    $(skeletonDivs.iconDiv).addClass('AlertIconAlert');
    
    var okDiv = document.createElement('div');
    
    $(okDiv).addClass("AlertBtn").html("OK").appendTo($(skeletonDivs.modalDiv)).click(function () {
        if (callback) {
            callback();
        }
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
        ok_callback: function () {},
        cancel_callback: function () {}
    }*/
    
    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.msgDiv).html(config.msg);
    
    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');
    
    var okDiv = document.createElement('div');
    $(okDiv).addClass("AlertBtn").addClass("AlertConfirmBtn").html("OK").appendTo($(skeletonDivs.modalDiv)).click(function () {
        if (config.ok_callback) {
            config.ok_callback();
        }
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
    });
    
    var cancelDiv = document.createElement('div');
    $(cancelDiv).addClass("AlertBtn").html("Cancel").appendTo($(skeletonDivs.modalDiv)).click(function () {
        if (config.cancel_callback) {
            config.cancel_callback();
        }
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
        cancel_callback: function () {}
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
    
    if (config.show_close) {
        $(skeletonDivs.clickCaptureDiv).click(function() {
            if (config.cancel_callback) {
                config.cancel_callback();
            }
            if (config.auto_hide) {
                self.hideAlertOverlayDiv();
                self.alertOverlayDiv.innerHTML = "";
            }
        });
    }
    
    // Stop the event propagating up the DOM 
    $(skeletonDivs.modalDiv).click(function(event) {
        event.stopPropagation();
    });
    
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

DashboardObj.prototype.dropdown = function(config) {
    
    /* var example = {
        msg: "Example message",
        auto_hide: false,
        show_close: false,
        cancel_callback: function()
        options: [
            {
                text: "Text",
                another_key: another_value,
                ....
            }
        ]
        ok_callback: function(selected_option_obj),
        
    }*/
    
    var self = this;
    
    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();
    
    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.msgDiv).html(config.msg).css('float','none');
    
    var cancel_function = function () {
        if (config.cancel_callback) {
            config.cancel_callback();
        }
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
    }
    
    /*if (config.show_close) {
        $(skeletonDivs.clickCaptureDiv).click(function () {cancel_function()});
    }*/
    
    // Stop the event propagating up the DOM 
    $(skeletonDivs.modalDiv).click(function(event) {
        event.stopPropagation();
    });
    
    var dropdown = document.createElement('select');
    
    var default_option = document.createElement('option');
    default_option.text = "Please select...";
    default_option.value = null;
    dropdown.add(default_option);
    
    for (var pos in config.options) {
        var this_option = config.options[pos];
        var option = document.createElement('option');
        option.text = this_option.text;
        option.value = pos;
        dropdown.add(option);
    }
    
    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');
    
    var okDiv = document.createElement('div');
    $(okDiv).addClass("AlertBtn").addClass("AlertConfirmBtn").html("OK").appendTo($(skeletonDivs.modalDiv)).click(function () {
        if (dropdown.options[dropdown.selectedIndex].value != null) {
            if (config.ok_callback) {
                config.ok_callback(config.options[dropdown.options[dropdown.selectedIndex].value]);
            }
            if (config.auto_hide) {
                self.hideAlertOverlayDiv();
                self.alertOverlayDiv.innerHTML = "";
            }
        }
    });
    
    if (config.show_close) {
        var cancelDiv = document.createElement('div');
        $(cancelDiv).addClass("AlertBtn").html("Cancel").appendTo($(skeletonDivs.modalDiv)).click(function () {cancel_function()}); 
    }
    
    $(dropdown).appendTo($(skeletonDivs.dropdownDiv));
    
    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.modalDiv));
    
}

DashboardObj.prototype.buildOverlayEditSpace = function (overlayDiv) {
    var result = {};
    result.info_div = document.createElement('div');
    $(result.info_div).addClass("asEditSpaceContentAlignment asEditSpaceContent").appendTo($(overlayDiv));
    
    result.title_div = document.createElement('div');
    $(result.title_div).addClass('asEditSpaceContentAlignment asEditSpaceHeader').appendTo($(overlayDiv));
    
    var buttons = document.createElement('div');
    $(buttons).addClass('asEditSpaceContentAlignment asEditSpaceButtons').appendTo($(overlayDiv));
    
    result.cancel_btn = document.createElement('div');
    $(result.cancel_btn).addClass('asEditSpaceButton').html('cancel').appendTo($(buttons));
    result.done_btn = document.createElement('div');
    $(result.done_btn).addClass('asEditSpaceButton').html('done').appendTo($(buttons));
    
    return result;
}

