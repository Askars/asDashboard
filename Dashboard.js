DashboardObj = function() {
    var self = this;
    self.parent  = null;
    self.containingDiv = null;
    self.titleSectionObj = null;
    self.sideMenuObj = null;
    self.workspaceObj = new WorkspaceObj();
    
};

DashboardObj.prototype.attachToDiv = function(contentDiv) {
    var self = this;
    if (contentDiv != null) {
        self.containingDiv = contentDiv;
        var titleSectionDiv = document.createElement('div');
        var sideMenuDiv = document.createElement('div');
        var workspaceDiv = document.createElement('div');
        contentDiv.appendChild(workspaceDiv);
        contentDiv.appendChild(titleSectionDiv);
        contentDiv.appendChild(sideMenuDiv);
        
        
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