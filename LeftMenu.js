LeftMenuBtnObj = function(parent, className, text, collapseOnClick, onclick, href) {
    var self = this;
    self.selected = false;
    self.parentMenu = parent;
    
    self.contentDiv = document.createElement('div');
    self.contentDiv.className = "MenuBtn " + className;
    
    if (onclick != null) {
        $(self.contentDiv).click(function () {
            if (collapseOnClick) {
                self.parentMenu.collapse();
            }
            onclick();
        });
    }
    
    self.iconDiv = document.createElement('div');
    self.iconDiv.className = "IconContainerDiv";
    
    unhlightIconDiv = document.createElement('div');
    hlightIconDiv = document.createElement('div');
    
    unhlightIconDiv.className = "UnhighlightedIconDiv IconDiv";
    hlightIconDiv.className = "HighlightedIconDiv IconDiv"
    
    textDiv = document.createElement('div');
    textDiv.className = "TextDiv";
    textDiv.innerHTML = text;
    
    self.iconDiv.appendChild(unhlightIconDiv);
    self.iconDiv.appendChild(hlightIconDiv);
    
    if (href != null) {
        var href_div = document.createElement("a");
        href_div.href = href;
        href_div.appendChild(self.iconDiv);
        href_div.appendChild(textDiv);
        self.contentDiv.appendChild(href_div);
    } else {
        self.contentDiv.appendChild(self.iconDiv);
        self.contentDiv.appendChild(textDiv);
    }
    

    
    $(self.contentDiv).hover(
        function () {
            if (! self.selected) {
                self.highlight();
            }
            self.parentMenu.expand();
        },
        function () {
            if (! self.selected) {
                self.unhighlight();
            }
        }
    );
}

LeftMenuBtnObj.prototype.highlight = function() {
    $(".UnhighlightedIconDiv", this.contentDiv).stop(true);
    $(".UnhighlightedIconDiv", this.contentDiv).animate(
        {opacity: 0},
        0
    );
    $(".HighlightedIconDiv", this.contentDiv).stop(true);
    $(".HighlightedIconDiv", this.contentDiv).animate(
        {opacity: 1},
        0
    );
    $(this.contentDiv).stop(true);
    $(this.contentDiv).animate(
        {color: "#FFF"},
        0
    );
    
}

LeftMenuBtnObj.prototype.unhighlight = function() {
    $(".UnhighlightedIconDiv", this.contentDiv).stop(true);
    $(".UnhighlightedIconDiv", this.contentDiv).animate(
        {opacity: 1},
        200
    );
    $(".HighlightedIconDiv", this.contentDiv).stop(true);
    $(".HighlightedIconDiv", this.contentDiv).animate(
        {opacity: 0},
        200
    );
    $(this.contentDiv).stop(true);
    $(this.contentDiv).animate(
        {color: "#768089"},
        200
    );
}

LeftMenuBtnObj.prototype.setSelected = function (isSelected) {
    this.selected = isSelected;
    if (isSelected) {
       
    } else {
        
        this.unhighlight();
         
    }
}

LeftMenuObj = function(minwidth, maxwidth) {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.minWidth = minwidth;
    self.maxWidth = maxwidth;
    self.sections = [[]];
    self.expanded = false;
};

LeftMenuObj.prototype.addButton = function (className, text, collapseOnClick, onclick, href) {
    var self = this;
    self.sections[self.sections.length - 1].push(new LeftMenuBtnObj(self, className, text, collapseOnClick, onclick, href));
}

LeftMenuObj.prototype.newSection = function () {
    var self = this;
    self.sections.push([]);
}

LeftMenuObj.prototype.attachToDiv = function(contentDiv) {
    if (contentDiv != null) {
        
        // We will lose "this" scoping within functions, so refer to "self"
        var self = this;
        
        self.contentDiv = contentDiv;
        self.contentDiv.className = "LeftMenuDiv";
        
        self.contentDiv.style.width = self.minWidth + "px";
        
        var spacer = document.createElement('div');
        spacer.style.height = "10px";
        self.contentDiv.appendChild(spacer);
        
        for (var group_pos in self.sections) {
            for (var btn_index in self.sections[group_pos]) {
                var this_btn = self.sections[group_pos][btn_index];
                self.contentDiv.appendChild(this_btn.contentDiv);
                this_btn.iconDiv.style.left = (self.minWidth / 2) + "px";
                this_btn.iconDiv.style.width = self.minWidth + "px";
            }
            if ((group_pos * 1 + 1) < self.sections.length) {
                var vspacer = document.createElement('div');
                vspacer.className = "variableSpacer";
                self.contentDiv.appendChild(vspacer);   
            }
        }
        
        var spacer = document.createElement('div');
        spacer.style.height= "40px";
        self.contentDiv.appendChild(spacer);
        
        // Add some jquery reactivity
        $(self.contentDiv).hover(
            function () {
                self.expand();
            },
            function () {
                self.collapse();
            }
        );
    }
}

LeftMenuObj.prototype.expand = function() {
    var self = this;
    if (! self.expanded) {
        self.animateWidth(self.maxWidth);
        self.expandBtnText();
        self.expanded = true;
    }

}

LeftMenuObj.prototype.collapse = function() {
    var self = this;
    if (self.expanded) {
        self.animateWidth(self.minWidth);
        self.collapseBtnText();
        self.expanded = false;
    }
}

LeftMenuObj.prototype.animateWidth = function(requested_width) {
    $(this.contentDiv).stop(true);
    $(this.contentDiv).animate(
        {width: requested_width},
        500
    );
}

LeftMenuObj.prototype.expandBtnText = function() {
    var delay = 0;
    $('.LeftMenuDiv .MenuBtn .TextDiv').each(
        function() {
            $(this).stop(true);
            $(this).delay(delay).animate(
                {"left": 20, opacity: 1},
                500
            );
            delay += 50;
        }
        
    );
};

LeftMenuObj.prototype.collapseBtnText = function() {
    $('.LeftMenuDiv .MenuBtn .TextDiv').each(
        function() {
            $(this).stop(true);
            $(this).animate(
                {"left": 50, opacity: 0},
                500
            )
        }
    );
};

LeftMenuObj.prototype.resizeSpacers = function(menu_height) {
    var used = 50;
    $('.LeftMenuDiv .MenuBtn').each(
        function() {
            used += this.clientHeight;
        }
    );
    if (used > menu_height) {
        used = menu_height;
    }
    var var_spacers = $('.LeftMenuDiv .variableSpacer').length;
        $('.LeftMenuDiv .variableSpacer').each(
        function() {
            $(this).css('height', (menu_height - used)/var_spacers);
        }
    );  
}
