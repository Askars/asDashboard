OverlaysObj = function() {
    var self = this;
    self.parent  = null;
    self.contentDiv = null;
    self.overlayDiv = null;
    self.helpOverlayDiv = null;
    self.alertOverlayDiv = null;
};

function createTotalCenterer(parent_div, class_name) {

    var outer = document.createElement("div");
    $(outer).addClass("total_centerer").appendTo($(parent_div));
    if (class_name) {
        $(outer).addClass(class_name);
    }
    return outer;
}


OverlaysObj.prototype.attachToDiv = function(contentDiv) {
    var self = this;
    if (contentDiv != null) {
        self.overlayDiv = document.createElement('div');
        self.helpOverlayDiv = document.createElement('div');
        self.alertOverlayDiv = document.createElement('div');

        self.overlayDiv.className = "OverlayDiv";
        self.helpOverlayDiv.className = "HelpOverlayDiv";
        self.alertOverlayDiv.className = "AlertOverlayDiv";

        contentDiv.appendChild(self.overlayDiv);
        contentDiv.appendChild(self.helpOverlayDiv);
        contentDiv.appendChild(self.alertOverlayDiv);

    }
}

OverlaysObj.prototype.showOverlayDiv = function() {
    this.overlayDiv.style.visibility = 'visible';
}

OverlaysObj.prototype.hideOverlayDiv = function() {
    this.overlayDiv.style.visibility = 'hidden';
}

OverlaysObj.prototype.clearOverlayDiv = function() {
    this.overlayDiv.innerHTML = '';
}

OverlaysObj.prototype.showHelpOverlayDiv = function() {
    this.helpOverlayDiv.style.visibility = 'visible';
}

OverlaysObj.prototype.hideHelpOverlayDiv = function() {
    this.helpOverlayDiv.style.visibility = 'hidden';
}

OverlaysObj.prototype.showAlertOverlayDiv = function() {
    this.alertOverlayDiv.style.visibility = 'visible';
}

OverlaysObj.prototype.hideAlertOverlayDiv = function() {
    this.alertOverlayDiv.style.visibility = 'hidden';
}

OverlaysObj.prototype.clearAlertOverlayDiv = function() {
    this.alertOverlayDiv.innerHTML = '';
}

OverlaysObj.prototype.alertOverlayDivLoading = function() {
    this.alertOverlayDiv.innerHTML = '';
    addSpinnerToDiv(this.alertOverlayDiv);
    this.alertOverlayDiv.style.visibility = 'visible';
}

// Is options = is a options dialog
OverlaysObj.prototype.buildAlertSkeleton = function () {
    var self = this;
    var result = {};

    result.clickCaptureDiv = document.createElement('div');
    $(result.clickCaptureDiv).addClass('ClickCaptureDiv').appendTo($(self.alertOverlayDiv));
    var centeringDiv = createTotalCenterer(result.clickCaptureDiv, null);

    result.modalDiv = centeringDiv;

    result.titleBarDiv = document.createElement('div');
    result.contentDiv = document.createElement('div');

    result.middleDiv = document.createElement('div');
    result.iconDiv = document.createElement('div');
    result.rightDiv = document.createElement('div');

    result.bottomButtonsDiv = document.createElement('div');


    var clearDiv = document.createElement('div');

    $(result.modalDiv).addClass("AlertDialog").appendTo($(centeringDiv));
    $(result.titleBarDiv).addClass("AlertTitleBar").appendTo($(result.modalDiv));
    $(result.contentDiv).addClass("AlertContent").appendTo($(result.modalDiv));
    $(result.middleDiv).addClass("AlertMiddleDiv").appendTo($(result.contentDiv));
    $(result.iconDiv).addClass("AlertIconDiv").appendTo($(result.middleDiv));
    $(result.rightDiv).addClass("AlertRightDiv").appendTo($(result.middleDiv));

    $(result.bottomButtonsDiv).addClass("AlertBottomButtonsDiv").appendTo($(result.contentDiv));

    return result;
}

OverlaysObj.prototype.alert = function(msg, callback) {
    var self = this;

    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();

    skeletonDivs = this.buildAlertSkeleton();
    $(skeletonDivs.rightDiv).html(msg);

    $(skeletonDivs.iconDiv).addClass('AlertIconAlert');
    $(skeletonDivs.titleBarDiv).html("ATTENTION");

    var okDiv = document.createElement('div');

    $(okDiv).addClass("AlertBtn").html("OK").appendTo($(skeletonDivs.bottomButtonsDiv)).click(function () {
        self.hideAlertOverlayDiv();
        self.alertOverlayDiv.innerHTML = "";
        if (callback) {
            callback();
        }
    });

    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.contentDiv));

}



OverlaysObj.prototype.confirm = function(config) {
    var self = this;

    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();

    /* var example = {
        msg: "Example message",
        auto_hide: false,
        ok_callback: function () {},
        cancel_callback: function () {}
    }*/

    skeletonDivs = this.buildAlertSkeleton();

    var msgDiv = document.createElement('div');
    $(msgDiv).html(config.msg).appendTo(skeletonDivs.rightDiv);

    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');
    $(skeletonDivs.titleBarDiv).html("CONFIRMATION REQUIRED");

    var okDiv = document.createElement('div');
    $(okDiv).addClass("AlertBtn").addClass("AlertConfirmBtn").html("OK").appendTo($(skeletonDivs.contentDiv)).click(function () {
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
        if (config.ok_callback) {
            config.ok_callback();
        }
    });

    var cancelDiv = document.createElement('div');
    $(cancelDiv).addClass("AlertBtn").html("Cancel").appendTo($(skeletonDivs.contentDiv)).click(function () {
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
        if (config.cancel_callback) {
            config.cancel_callback();
        }
    });

    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.contentDiv));
}

OverlaysObj.prototype.options = function(config) {

    /* var example = {
        msg: "Example message",
        auto_hide: false,
        show_close: false,
        cancel_callback: function () {}
        buttons: [
            {
                text: "Text",
                callback: function() {}
            }
        ]
    }*/

    var self = this;

    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();

    skeletonDivs = this.buildAlertSkeleton();

    if (config.show_close) {
        $(skeletonDivs.clickCaptureDiv).click(function() {
            if (config.auto_hide) {
                self.hideAlertOverlayDiv();
                self.alertOverlayDiv.innerHTML = "";
            }
            if (config.cancel_callback) {
                config.cancel_callback();
            }
        });
    }

    // Stop the event propagating up the DOM
    $(skeletonDivs.modalDiv).click(function(event) {
        event.stopPropagation();
    });

    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');
    $(skeletonDivs.titleBarDiv).html("CHOICE REQUIRED");

    var msgDiv = document.createElement('div');
    $(msgDiv).html(config.msg).appendTo(skeletonDivs.rightDiv);

    for (var pos in config.buttons) {
        this_button = config.buttons[pos];
        var newDiv = document.createElement('div');
        $(newDiv).addClass("AlertBtn").html(this_button.text).css('float','none').appendTo($(skeletonDivs.rightDiv)).click(
            function (button) {
                return function () {
                    if (config.auto_hide) {
                        self.hideAlertOverlayDiv();
                        self.alertOverlayDiv.innerHTML = "";
                    }
                    button.callback();
                }
            }(this_button)
        );
    }

    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.contentDiv));

}

OverlaysObj.prototype.dropdown = function(config) {

    /* var example = {
        msg: "Example message",
        auto_hide: false,
        show_close: false,
        cancel_callback: function()
        options: [
            {
                text: "Option 1",
                id: 12
                another_key: another_value
            },
            {
                text: "Option 2",
                id: 13
                another_key: another_value
            },
        ]
        ok_callback: function(selected_option_obj) // This is the selected JSON object from the options attr array above.

    }*/

    var self = this;

    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();

    skeletonDivs = this.buildAlertSkeleton();

    var msgDiv = document.createElement('div');
    $(msgDiv).html(config.msg).appendTo(skeletonDivs.rightDiv);

    $(skeletonDivs.titleBarDiv).html("CHOICE REQUIRED");


    var cancel_function = function () {
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
        if (config.cancel_callback) {
            config.cancel_callback();
        }
    }


    if (config.show_close) {
        $(skeletonDivs.clickCaptureDiv).click(function () {cancel_function()});
    }

    // Stop the event propagating up the DOM
    $(skeletonDivs.modalDiv).click(function(event) {
        event.stopPropagation();
    });

    var dropdown = document.createElement('select');

    var default_option = document.createElement('option');
    default_option.text = "Please select...";
    default_option.value = "null";
    dropdown.add(default_option);

    for (var pos in config.options) {
        var this_option = config.options[pos];
        var option = document.createElement('option');
        option.text = this_option.text;
        option.value = pos;
        dropdown.add(option);
    }

    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');

    var okDiv = document.createElement('div');
    $(okDiv).addClass("AlertBtn").addClass("AlertConfirmBtn").html("OK").appendTo($(skeletonDivs.contentDiv)).click(function () {
        if (dropdown.options[dropdown.selectedIndex].value != "null") {
            if (config.auto_hide) {
                self.hideAlertOverlayDiv();
                self.alertOverlayDiv.innerHTML = "";
            }
            if (config.ok_callback) {
                config.ok_callback(config.options[dropdown.options[dropdown.selectedIndex].value]);
            }
        } else {
            cancel_function();
        }
    });

    if (config.show_close) {
        var cancelDiv = document.createElement('div');
        $(cancelDiv).addClass("AlertBtn").html("Cancel").appendTo($(skeletonDivs.contentDiv)).click(function () {cancel_function()});
    }

    $(dropdown).appendTo($(skeletonDivs.rightDiv));

    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.contentDiv));

}

OverlaysObj.prototype.input = function(config) {

    /* var example = {
    *   msg: "Example message",
     *  inputs : [
            {
                name: "input1",
                input_label: "Label for input1",
                value: "Default value 1",
                validation_function: function(input_text),
                validation_failure_msg : "Input1 cannot be null."
            },
            {
                name: "input2",
                input_label: "Label for input2"
                value: "Default value 2",
                validation_function: function(input_text),
                validation_failure_msg : "Input1 cannot be null."
            },
        ]
        auto_hide: false,
        show_close: false,
        cancel_callback: function(),
        ok_callback: function(input_data),

    }*/

    var self = this;

    self.alertOverlayDiv.innerHTML = "";
    self.showAlertOverlayDiv();

    skeletonDivs = this.buildAlertSkeleton();

    var msgDiv = document.createElement('div');
    $(msgDiv).html(config.msg).appendTo(skeletonDivs.rightDiv);

    $(skeletonDivs.titleBarDiv).html("INFORMATION REQUIRED");

    var cancel_function = function () {
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
        if (config.cancel_callback) {
            config.cancel_callback();
        }
    }

    if (config.show_close) {
        $(skeletonDivs.clickCaptureDiv).click(function () {cancel_function()});
    }

    // Stop the event propagating up the DOM
    $(skeletonDivs.modalDiv).click(function(event) {
        event.stopPropagation();
    });

    var inputs = [];

    for (var idx in config.inputs) {
        var input = document.createElement('input');

        if (config.inputs[idx].value == null) {
            config.inputs[idx].value = "";
        }
        $(input).attr('type','text').attr('value', config.inputs[idx].value).appendTo($(skeletonDivs.rightDiv));
        inputs.push(input);
    }

    $(skeletonDivs.iconDiv).addClass('AlertIconQuestion');

    var okDiv = document.createElement('div');
    $(okDiv).addClass("AlertBtn").addClass("AlertConfirmBtn").html("OK").appendTo($(skeletonDivs.contentDiv)).click(function () {
        if (config.auto_hide) {
            self.hideAlertOverlayDiv();
            self.alertOverlayDiv.innerHTML = "";
        }
        if (config.ok_callback) {
            var retObj = {};

            for (var idx in config.inputs) {
                retObj[config.inputs[idx].name] = inputs[idx].value;
            }

            config.ok_callback(retObj);
        }
    });

    var cancelDiv = document.createElement('div');
    $(cancelDiv).addClass("AlertBtn").html("Cancel").appendTo($(skeletonDivs.contentDiv)).click(function () {cancel_function()});

    clearDiv = document.createElement('div');
    $(clearDiv).css("clear", "both").appendTo($(skeletonDivs.contentDiv));

}

OverlaysObj.prototype.buildOverlayEditSpace = function (overlayDiv) {
    var result = {};
    result.info_div = document.createElement('div');
    $(result.info_div).addClass("asEditSpaceContentAlignment asEditSpaceContent").appendTo($(overlayDiv));

    result.title_div = document.createElement('div');
    $(result.title_div).addClass('asEditSpaceContentAlignment asEditSpaceHeader').appendTo($(overlayDiv));

    var buttons = document.createElement('div');
    $(buttons).addClass('asEditSpaceContentAlignment asEditSpaceButtons').appendTo($(overlayDiv));

    result.cancel_btn = document.createElement('div');
    $(result.cancel_btn).addClass('asEditSpaceButton').html('cancel').appendTo($(buttons));
    result.done_btn = document.createElement('div');
    $(result.done_btn).addClass('asEditSpaceButton').html('done').appendTo($(buttons));

    return result;
}
