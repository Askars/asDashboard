RightSubMenuBtnObj = function(parent, text, description, titleTextArr, onclick, href) {
    var self = this;
    self.selected = false;
    self.parentMenu = parent;
    self.leftTitleText = titleTextArr[0];
    self.rightTitleText = titleTextArr[1];
    self.onclick = onclick;
}

RightSubMenuObj = function(width) {
    var self = this;
    self.parent  = null;
    self.wrapperDiv = null;
    self.width = width;
    self.buttons = [];
    
    // We do this one a little differently, we own the contentDiv and the parent supplies a wrappingDiv
    // This is because we want to keep everything in the menu self contained for detach/reattachments.
    self.contentDiv = document.createElement('div');
    $(self.contentDiv).addClass('RightMenuDiv').css('width', width);
    
    
    var titleDiv = document.createElement('div');
    $(titleDiv).addClass('RightMenuSubTitle').appendTo($(self.contentDiv))
    
    self.leftSubTitleDiv = document.createElement('div');
    self.rightSubTitleDiv = document.createElement('div');
    $(self.leftSubTitleDiv).addClass("LeftTextDiv").appendTo($(titleDiv));
    $(self.rightSubTitleDiv).addClass("RightTextDiv").appendTo($(titleDiv));
    
    var floatClear = document.createElement('div');
    $(floatClear).css('clear', 'both').appendTo($(titleDiv));
    
    titleDiv.appendChild(floatClear);

};

RightSubMenuObj.prototype.addButton = function (text, description, titleTextArr, onclick, href) {
    var self = this;
    self.buttons.push(new RightSubMenuBtnObj(self, text, description, titleTextArr, onclick, href));
}

RightSubMenuObj.prototype.setSubTitle = function (leftText, rightText) {
    var self = this;
    $(self.leftSubTitleDiv).html(leftText);
    $(self.rightSubTitleDiv).html(rightText);
};

RightSubMenuObj.prototype.showDefault = function () {

};

RightSubMenuObj.prototype.detachDiv = function () {
    var self = this;
    // Idealy one should use $(self.contentDiv).detach() but it doesn't work and I have no idea why....
    $('.RightMenuDiv').detach();
    self.wrapperDiv = null;
};

RightSubMenuObj.prototype.attachToDiv = function (wrapperDiv) {
    var self = this;
    self.wrapperDiv = wrapperDiv;
    wrapperDiv.appendChild(self.contentDiv);
}
