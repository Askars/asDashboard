RightSubMenuBtnObj = function(parentMenu, parentDiv, isFirst, title, description, onclick, href) {
    var self = this;
    self.selected = false;
    self.parentMenu = parentMenu;
    
    self.contentDiv = document.createElement('div');
    $(self.contentDiv).addClass('RightMenuButton').appendTo(parentDiv).click(onclick);
    if (isFirst) {
        $(self.contentDiv).addClass('RightMenuButtonFirst');
    }
    var titleDiv = document.createElement('div');
    $(titleDiv).addClass('RightMenuButtonTitle').appendTo(self.contentDiv).html(title);
    var descDiv = document.createElement('div');
    $(descDiv).addClass('RightMenuButtonDesc').appendTo(self.contentDiv).html(description);
    
    $(self.contentDiv).hover(
        function () {
            $(self.contentDiv).stop(true);
            $(self.contentDiv).animate(
                {height: (26 + descDiv.clientHeight)},
                300
            );
        },
        function () {
            $(self.contentDiv).stop(true);
            $(self.contentDiv).animate(
                {height: 26},
                300
            );
        }
    );
}

RightSubMenuBtnObj.prototype.emulateClick = function() {
    $(this.contentDiv).trigger('click');
}

RightSubMenuObj = function(parentBtn, width) {
    var self = this;
    self.parentBtn = parentBtn;
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
    
    self.buttonsDiv = document.createElement('div');
    self.contentDiv.appendChild(self.buttonsDiv);

};

RightSubMenuObj.prototype.addButton = function (text, description, onclick, href) {
    var self = this;
    
    var isFirst = (self.buttons.length == 0);
    
    var new_btn = new RightSubMenuBtnObj(self, self.buttonsDiv, isFirst, text, description, onclick, href)
    self.buttons.push(new_btn);
    
    return new_btn;
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
