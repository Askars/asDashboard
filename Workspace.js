addSpinnerToDiv = function(div) {
    var spinnerDiv = document.createElement('div');
    spinnerDiv.className = "SpinnerDiv";
    div.appendChild(spinnerDiv);
    
    var html = '<div class="spinner">'
    for (var i = 1; i <= 3; i++) {
        html += '<div class="spinner-container container' + i +'">';
        for (var j = 1; j <= 4; j++) {
            html += '<div class="circle' + j +'"></div>';
        }
        html += '</div>';
    }
    html += '</div>';
    spinnerDiv.innerHTML = html;
    
    return spinnerDiv;
}


WorkspaceObj = function() {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.displayFrameDiv = null;
    self.spinnerDiv = null;
};

WorkspaceObj.prototype.attachToDiv = function(contentDiv) {
    var self = this;
    if (contentDiv != null) {
        self.contentDiv = contentDiv;
        self.contentDiv.className = "WorkspaceDiv";
        
        self.displayFrameDiv = document.createElement('div');
        self.displayFrameDiv.className = "DisplayFrameDiv";
        self.contentDiv.appendChild(self.displayFrameDiv);
    }
}

WorkspaceObj.prototype.getDisplayFrameDiv = function() {
    return this.displayFrameDiv;
}

WorkspaceObj.prototype.addSpinner = function() {
    this.spinnerDiv = addSpinnerToDiv(this.displayFrameDiv);
}

WorkspaceObj.prototype.setSpinnerVisibility = function(visibility) {
    if (visibility) {
        this.spinnerDiv.style.visibility = "visible";
    } else {
        this.spinnerDiv.style.visibility = "hidden";
    }
}

