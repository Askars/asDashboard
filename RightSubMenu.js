RightSubMenuBtnObj = function(parent, titleTextArr, text, description, onclick, href) {
    var self = this;
    self.selected = false;
    self.parentMenu = parent;
    self.leftTitleText = titleTextArr[0];
    self.rightTitleText = titleTextArr[1];
    self.subMenu = new RightSubMenuObj(270);
}


RightSubMenuObj = function(width) {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.width = width;
    self.buttons = [];
    self.expanded = false;
};

RightSubMenuObj.prototype.setSubTitle = function (leftText, rightText) {

};

RightSubMenuObj.prototype.showDefault = function () {

};