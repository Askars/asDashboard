RightSubMenuBtnObj = function(parent, titleTextArr, text, description, onclick, href) {
    var self = this;
    self.selected = false;
    self.parentMenu = parent;
    self.leftTitleText = titleTextArr[0];
    self.rightTitleText = titleTextArr[1];
    
}


RightSubMenuObj = function(width) {
    var self = this;
    self.parent  = null;
    self.wrapperDiv = null;
    self.width = width;
    self.buttons = [];
    self.expanded = false;
    
    // We do this one a little differently, we own the contentDiv and the parent supplies a wrappingDiv
    // This is because we want to keep everything in the menu self contained for detach/reattachments.
    self.contentDiv = document.createElement('div');
    
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

RightSubMenuObj.prototype.setSubTitle = function (leftText, rightText) {

};

RightSubMenuObj.prototype.showDefault = function () {

};