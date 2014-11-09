MainTitleObj = function() {
    var self = this;
    self.contentDiv = null;
    self.textDiv = null;
    self.leftWordDiv = null;
    self.rightWordDiv = null;
}

MainTitleObj.prototype.attachToDiv = function(contentDiv) {
    var self = this;
        if (contentDiv != null) {
        self.contentDiv = contentDiv;
        self.contentDiv.className = "MainTitleDiv"
    }
    
    self.textDiv = document.createElement('div');
    self.textDiv.className = "TextDiv";
    self.leftTextDiv = document.createElement('div');
    self.leftTextDiv.className = "LeftTextDiv";
    self.rightTextDiv = document.createElement('div');
    self.rightTextDiv.className = "RightTextDiv";
    self.textDiv.appendChild(self.leftTextDiv);
    self.textDiv.appendChild(self.rightTextDiv);
    self.contentDiv.appendChild(self.textDiv);
}

MainTitleObj.prototype.changeText = function(leftWord, rightWord) {
    var self = this;
    if (leftWord != null) {
        self.leftTextDiv.innerHTML = leftWord; 
    }
    if (rightWord != null) {
        self.rightTextDiv.innerHTML = rightWord;
    }
}

MainTitleObj.prototype.hide = function() {
    var self = this;
    $(self.contentDiv).stop(true);
    $(self.contentDiv).animate(
        {"top": -100},
        500
    );
}

MainTitleObj.prototype.show = function() {
    var self = this;
    $(self.contentDiv).stop(true);
    $(self.contentDiv).animate(
        {"top": 0},
        500
    );
}

SubTitleObj = function () {
    var self = this;
    self.contentDiv = null;
    self.textDiv = null;
    self.leftWordDiv = null;
    self.rightWordDiv = null;
}

SubTitleObj.prototype.attachToDiv = function(contentDiv) {
    var self = this;
        if (contentDiv != null) {
        self.contentDiv = contentDiv;
        self.contentDiv.className = "SubTitleDiv"
    }
    
    self.textDiv = document.createElement('div');
    self.textDiv.className = "TextDiv";
    self.leftTextDiv = document.createElement('div');
    self.leftTextDiv.className = "LeftTextDiv";
    self.rightTextDiv = document.createElement('div');
    self.rightTextDiv.className = "RightTextDiv";
    self.textDiv.appendChild(self.leftTextDiv);
    self.textDiv.appendChild(self.rightTextDiv);
    self.contentDiv.appendChild(self.textDiv);
}

SubTitleObj.prototype.changeText = function(leftWord, rightWord) {
    var self = this;
    if (leftWord != null) {
        self.leftTextDiv.innerHTML = leftWord; 
    }
    if (rightWord != null) {
        self.rightTextDiv.innerHTML = rightWord;
    }
}

TitleSectionObj = function() {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.mainTitleObj = new MainTitleObj();
    self.subTitleObj = new SubTitleObj();
};

TitleSectionObj.prototype.attachToDiv = function(contentDiv) {
    var self = this;
    if (contentDiv != null) {
        self.contentDiv = contentDiv;
        self.contentDiv.className = "TitleSectionDiv"
    }
    mainTitleDiv = document.createElement('div');
    self.mainTitleObj.attachToDiv(mainTitleDiv);
    
    mainTitleUnderlayDiv = document.createElement('div');
    mainTitleUnderlayDiv.className = "MainTitleUnderlay";
    
    subTitleDiv = document.createElement('div');
    self.subTitleObj.attachToDiv(subTitleDiv);
    
    self.contentDiv.appendChild(mainTitleUnderlayDiv);
    self.contentDiv.appendChild(mainTitleDiv);
    self.contentDiv.appendChild(subTitleDiv);
}

TitleSectionObj.prototype.changeMainTitle = function(leftWord, rightWord) {
    this.mainTitleObj.changeText(leftWord, rightWord);
}

TitleSectionObj.prototype.changeSubTitle = function(leftWord, rightWord) {
    //console.log(leftWord, rightWord);
    this.subTitleObj.changeText(leftWord, rightWord);
}


TitleSectionObj.prototype.hideMainTitle = function() {
    this.mainTitleObj.hide();
}

TitleSectionObj.prototype.showMainTitle = function() {
    this.mainTitleObj.show();
}
