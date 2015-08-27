DashboardObj = function() {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.titleSectionObj = null;
    self.sideMenuObj = null;
    self.workspaceObj = new WorkspaceObj();
    self.overlaysObj = new OverlaysObj();
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
        
        self.overlaysObj.attachToDiv(contentDiv);
        
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
    this.overlaysObj.showOverlayDiv();
}

DashboardObj.prototype.hideOverlayDiv = function() {
    this.overlaysObj.hideOverlayDiv();
}

DashboardObj.prototype.clearOverlayDiv = function() {
    this.overlaysObj.clearOverlayDiv();
}

DashboardObj.prototype.showHelpOverlayDiv = function() {
    this.overlaysObj.showHelpOverlayDiv();
}

DashboardObj.prototype.hideHelpOverlayDiv = function() {
    this.overlaysObj.hideHelpOverlayDiv();
}

DashboardObj.prototype.showAlertOverlayDiv = function() {
    this.overlaysObj.showAlertOverlayDiv();
}

DashboardObj.prototype.hideAlertOverlayDiv = function() {
    this.overlaysObj.hideAlertOverlayDiv();
}

DashboardObj.prototype.clearAlertOverlayDiv = function() {
    this.overlaysObj.clearAlertOverlayDiv();
}

DashboardObj.prototype.alertOverlayDivLoading = function() {
    this.overlaysObj.alertOverlayDivLoading();
}

DashboardObj.prototype.alert = function(msg, callback) {
    this.overlaysObj.alert(msg, callback);
}

DashboardObj.prototype.confirm = function(config) {
    this.overlaysObj.confirm(config);
}

DashboardObj.prototype.options = function(config) {
    this.overlaysObj.options(config);
}

DashboardObj.prototype.dropdown = function(config) {
    this.overlaysObj.dropdown(config);
}

DashboardObj.prototype.buildOverlayEditSpace = function (overlayDiv) {
    this.overlaysObj.buildOverlayEditSpace(overlayDiv);

}

