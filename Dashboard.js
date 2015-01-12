DashboardObj = function() {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.titleSectionObj = null;
    self.sideMenuObj = null;
    self.workspaceObj = new WorkspaceObj();
    self.overlayDiv = null;
    self.helpOverlayDiv = null;
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
        
        self.overlayDiv.className = "OverlayDiv";
        self.helpOverlayDiv.className = "HelpOverlayDiv";
        
        contentDiv.appendChild(self.overlayDiv);
        contentDiv.appendChild(self.helpOverlayDiv);
        
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