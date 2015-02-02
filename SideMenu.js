// User Object for use exclusively with SideMenuObj
UserSectionObj = function (parent) {
  var self = this;
  self.parent = parent;
  self.contentDiv = null;
  self.firstName = null;
  self.lastName = null;
};

UserSectionObj.prototype.attachToDiv = function(contentDiv) {
    if (contentDiv != null) {
        
        // We will lose "this" scoping within functions, so refer to "self"
        var self = this;
        
        self.contentDiv = contentDiv;
        self.contentDiv.className = "UserSectionDiv";
        
        
        var containingDiv = document.createElement('div');
        var iconContainingDiv = document.createElement('div');
        var highlightedIconDiv = document.createElement('div');
        var unhighlightedIconDiv = document.createElement('div');
        
        containingDiv.className = "UserSectionInfo";
        
        highlightedIconDiv.className = "HighlightedIconDiv";
        unhighlightedIconDiv.className = "UnhighlightedIconDiv";
        
        var textContainingDiv = document.createElement('div');
        var topTextDiv = document.createElement('div');
        var bottomTextDiv = document.createElement('div');
        
        textContainingDiv.className = "NameTextDiv";
        topTextDiv.className = "FirstName highlightableText";
        bottomTextDiv.className = "LastName highlightableText";
        
        topTextDiv.innerHTML = self.firstName;
        bottomTextDiv.innerHTML = self.lastName.toUpperCase();
        
        contentDiv.appendChild(containingDiv);
        containingDiv.appendChild(iconContainingDiv);
        containingDiv.appendChild(textContainingDiv);
        
        iconContainingDiv.appendChild(unhighlightedIconDiv);
        iconContainingDiv.appendChild(highlightedIconDiv);
        
        textContainingDiv.appendChild(topTextDiv);
        textContainingDiv.appendChild(bottomTextDiv);
        
        containingDiv.style.left = (self.parent.minWidth - unhighlightedIconDiv.clientWidth)/2 + "px";
        containingDiv.style.top = (self.contentDiv.clientHeight - unhighlightedIconDiv.clientHeight)/2 + "px";
        
        $(self.contentDiv).hover(
            function () {
                $(unhighlightedIconDiv).stop(true);
                $(unhighlightedIconDiv).animate(
                    {opacity: 0},
                    300
                );
                $(highlightedIconDiv).stop(true);
                $(highlightedIconDiv).animate(
                    {opacity: 1},
                    300
                );
                $('.UserSectionInfo .highlightableText').stop(true);
                $('.UserSectionInfo .highlightableText').animate(
                    {color: '#FFF'},
                    300
                );
            },
            function () {
                $(unhighlightedIconDiv).stop(true);
                $(unhighlightedIconDiv).animate(
                    {opacity: 1},
                    300
                );
                $(highlightedIconDiv).stop(true);
                $(highlightedIconDiv).animate(
                    {opacity: 0},
                    300
                );
                $('.UserSectionInfo .highlightableText').stop(true);
                $('.UserSectionInfo .highlightableText').animate(
                    {color: '#768089'},
                    300
                );
            }
        );
    }
};

UserSectionObj.prototype.setFirstName = function(firstName) {
    this.firstName = firstName;
};

UserSectionObj.prototype.setLastName = function(lastName) {
    this.lastName = lastName;
};

// Side Menu object

SideMenuObj = function(minwidth, maxwidth) {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.minWidth = minwidth;
    self.maxWidth = maxwidth;
    self.userSectionObj = new UserSectionObj(self);
    self.userSectionHref = null;
    self.leftMenuObj = null;
    self.rightMenuObj = null;
    self.rightMenuObjExpanded = false;
    self.rightMenuWrapperDiv = null;
    self.rightMenuOpacityDiv = null;
};

SideMenuObj.prototype.attachToDiv = function(contentDiv) {
    if (contentDiv != null) {
        
        // We will lose "this" scoping within functions, so refer to "self"
        var self = this;
        
        self.contentDiv = contentDiv;
        self.contentDiv.className = "SideMenuDiv";
        
        var userSectionLinkDiv = document.createElement('a');
        userSectionLinkDiv.href = self.userSectionHref;
        userSectionLinkDiv.style.outline = 0;
        contentDiv.appendChild(userSectionLinkDiv);
        
        var userSectionDiv = document.createElement('div');
        userSectionLinkDiv.appendChild(userSectionDiv);
        
        var menuSectionDiv = document.createElement('div');
        menuSectionDiv.className = "MenuSectionDiv";
        
        var leftMenuDiv = document.createElement('div');
        self.rightMenuWrapperDiv = document.createElement('div');
        self.rightMenuOpacityDiv = document.createElement('div');
        contentDiv.appendChild(menuSectionDiv);
        menuSectionDiv.appendChild(leftMenuDiv);
        menuSectionDiv.appendChild(self.rightMenuWrapperDiv);
        self.rightMenuWrapperDiv.className = "RightMenuWrapperDiv";
        self.rightMenuWrapperDiv.appendChild(self.rightMenuOpacityDiv);
        self.rightMenuOpacityDiv.className = "RightMenuOpacityDiv";
        
        if (self.leftMenuObj != null) {
            $(this.rightMenuWrapperDiv).css('left', self.leftMenuObj.minWidth + 'px');
        }
        
        self.userSectionObj.attachToDiv(userSectionDiv);
        self.leftMenuObj.attachToDiv(leftMenuDiv);
        
        // Add some jquery reactivity
        $(self.contentDiv).hover(
            function () {
                self.expand()
            },
            function () {
                self.collapse()
            }
        );
    }
}

SideMenuObj.prototype.expand = function() {
    this.animateWidth(this.maxWidth);
    this.parent.titleSectionObj.hideMainTitle();
    this.expandUserSection();
    if (! this.leftMenuObj.expanded) {
        this.expandRightMenu();
    }
}

SideMenuObj.prototype.collapse = function() {
    this.animateWidth(this.minWidth);
    this.collapseRightMenu();
    this.parent.titleSectionObj.showMainTitle();
    this.collapseUserSection();
}

SideMenuObj.prototype.setRightMenuOffset = function(target_offset) {
    $(this.rightMenuWrapperDiv).stop(true);
    $(this.rightMenuWrapperDiv).animate(
        {left: target_offset},
        500
    );
}

SideMenuObj.prototype.expandRightMenu = function() {
    if (! this.rightMenuObjExpanded) {
        $(this.rightMenuOpacityDiv).stop();
        $(this.rightMenuOpacityDiv).animate(
            {opacity: 1},
            500
        );
        this.rightMenuObjExpanded = true;
    }
}

SideMenuObj.prototype.collapseRightMenu = function() {
    if (this.rightMenuObjExpanded) {
        $(this.rightMenuOpacityDiv).stop();
        $(this.rightMenuOpacityDiv).animate(
            {opacity: 0},
            500
        );
        this.rightMenuObjExpanded = false;
    }
}

SideMenuObj.prototype.setUserSectionObj = function(userSectionObj) {
    if (userSectionObj != null) {
        this.userSectionObj = userSectionObj;
        userSectionObj.parent = this;
    }
}

SideMenuObj.prototype.setLeftMenuObj = function(leftMenuObj) {
    if (leftMenuObj != null) {
        this.leftMenuObj = leftMenuObj;
        leftMenuObj.parent = this;
    }
}

SideMenuObj.prototype.attachRightMenu = function(rightMenuObj) {
    var self = this;
    if (self.rightMenuObj != null) {
       rightMenuObj.detachDiv();
    }
    self.rightMenuObj = rightMenuObj;
    rightMenuObj.attachToDiv(self.rightMenuOpacityDiv);
}

SideMenuObj.prototype.getUserSectionObj = function() {
    return this.userSectionObj;
}

SideMenuObj.prototype.setUserSectionName = function(firstName, lastName) {
    this.userSectionObj.setFirstName(firstName);
    this.userSectionObj.setLastName(lastName);
}

SideMenuObj.prototype.animateWidth = function(requested_width) {
    $(this.contentDiv).stop(true);
    $(this.contentDiv).animate(
        {width: requested_width},
        500
    );
}

SideMenuObj.prototype.expandUserSection = function () {
    var self = this;
    $('.UserSectionInfo').stop(true);
    $('.UserSectionInfo').animate(
        {left: self.minWidth/4 - 22},
        500
    );
    $('.UserSectionInfo .NameTextDiv').stop(true);
    $('.UserSectionInfo .NameTextDiv').animate(
        {'margin-left': 7, opacity: 1},
        500
    );
}

SideMenuObj.prototype.collapseUserSection = function () {
    var self = this;
    $('.UserSectionInfo').stop(true);
    $('.UserSectionInfo').animate(
        {left: self.minWidth/2 - 22},
        500
    );
    $('.UserSectionInfo .NameTextDiv').stop(true);
    $('.UserSectionInfo .NameTextDiv').animate(
        {'margin-left': 20, opacity: 0},
        500
    );
}

SideMenuObj.prototype.setUserSectionHref = function(address) {
    this.userSectionHref = address;
}

SideMenuObj.prototype.resizeMenu = function() {
    this.leftMenuObj.resizeSpacers(this.contentDiv.clientHeight - 100);
}

