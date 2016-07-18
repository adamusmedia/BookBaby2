
// page is ready...
$(document).ready(function () {
    PageBind();

    BindLinkSwitcher();

});

function PageBind() {

    // give focus to the appropriate input field
    $(".focus-input").focus();

    // Textbox hint handlers
    BindTextboxHints();
     
    // Bind input focus
    BindInputLabelHighlight();

    // Bind table events
    BindTableEvents();

    // Bind date filter events
    BindFilterEvents();

    // Bind CC Check Boxes
    BindCCBoxes();

    // Bind Price Point selects
    BindPricePointDDs();

    // Bind the Service Cover Design page
    BindCoverServices();

    // Bind the custom checkboxes and radio buttons
    StyleCustomInputs();

}

function BindCoverServices() {
    $('.mockup-choice input').change(function () {
        if ($(this).val() == "No") {
            $(".mockup-upload-container").addClass("hide-swf");
        } else {
            // make sure that Flash is installed; otherwise display modal with link to player...
            if (!FlashDetect.installed) {
                $.openModal({ target: '#flash-info' });
            } else {
                $(".mockup-upload-container").removeClass("hide-swf");
            }   // else
        }   // else
    });
    $('.imagery-choice input').change(function () {
        if ($(this).val() == "No") {
            $(".imagery-yes-container").addClass("hide-swf");
            $(".imagery-no-container").removeClass("hide-swf");
            $(".txt-imagery-yes").removeClass("req-field");
            $(".txt-imagery-no").addClass("req-field");
        } else {
            // make sure that Flash is installed; otherwise display modal with link to player...
            if (!FlashDetect.installed) {
                $.openModal({ target: '#flash-info' });
            } else {
                $(".imagery-no-container").addClass("hide-swf");
                $(".imagery-yes-container").removeClass("hide-swf");
                $(".txt-imagery-no").removeClass("req-field");
                $(".txt-imagery-yes").addClass("req-field");
            }   // else
        }   // else
    });

    // make sure that the correct textarea has the required field class on it...
    if ($('.imagery-choice input:checked').val() == "No") {
        $(".txt-imagery-yes").removeClass("req-field");
        $(".txt-imagery-no").addClass("req-field");
    } else {
        $(".txt-imagery-no").removeClass("req-field");
        $(".txt-imagery-yes").addClass("req-field");
    }   // else

}   // BindCoverServices()

function BindPricePointDDs() {
	
	//Fade all out
	$('.book-tier-free').fadeOut(0);
	$('.book-tier-99').fadeOut(0);
	$('.book-tier-1299').fadeOut(0);

	// check initial value for message
	var price = $('.book-tier-dd').val();
	if (price == 00) {
		$('.book-tier-free').fadeIn(200);
	}
	else if (price < 1.99) {
		$('.book-tier-99').fadeIn(200);
	}
	else if (price > 12.99) {
		$('.book-tier-1299').fadeIn(200);
	}

	$('.book-tier-dd').change(function () {
		//attach the same code to the change event on the dropdown
		
		//Fade all out
		$('.book-tier-free').fadeOut(0);
		$('.book-tier-99').fadeOut(0);
		$('.book-tier-1299').fadeOut(0);

		// check initial value for message
		var price = $('.book-tier-dd').val();
		if (price == 00) {
			$('.book-tier-free').fadeIn(200);
		}
		else if (price < 1.99) {
			$('.book-tier-99').fadeIn(200);
		}
		else if (price > 12.99) {
			$('.book-tier-1299').fadeIn(200);
		}
	});

}   // BindPricePointDDs()

function BindLinkSwitcher() {
    $("#switch-views").click(function () {
        if ($(this).text() === "view sales by partner") {
            $("#author-container").fadeOut("300", function () {
                $("#partner-container").fadeIn("300", function () {
                    $("#switch-views").text("view sales by author");
                    $("#switch-views").parent().find("span").eq(0).text("Sales by Partner");
                });
            });
        } else {
            $("#partner-container").fadeOut("300", function () {
                $("#author-container").fadeIn("300", function () {
                    $("#switch-views").text("view sales by partner");
                    $("#switch-views").parent().find("span").eq(0).text("Sales by Author");
                });
            });
        }   // else
    });
}   // BindLinkSwitcher

function BindTextboxHints() {
    
}   // BindTextboxHints()

function BindInputLabelHighlight() {
}   // BindInputLabelHighlight()

function BindTableEvents() {
    $(".data-table tbody tr").not("#total-row, .no-hover, .paid-book, .partners, .deposit-row").hover(
        function () {
            if ($(this).find(".warning-image").length > 0) {
                $(this).addClass("highlighted-error-row");
            } else {
                $(this).addClass("highlighted-row");
            }   // else
        },
        function () {
            if ($(this).find(".warning-image").length > 0) {
                $(this).removeClass("highlighted-error-row");
            } else {
                $(this).removeClass("highlighted-row");
            }   // else
        }
    );
    $(".data-table tbody tr.paid-book").hover(
        function () {
            $(this).addClass("highlighted-row");
            $(this).next().addClass("highlighted-row");
        },
        function () {
            $(this).removeClass("highlighted-row");
            $(this).next().removeClass("highlighted-row");
        }
    );
    $(".data-table tbody tr.partners").hover(
        function () {
            $(this).addClass("highlighted-row");
            $(this).prev().addClass("highlighted-row");
        },
        function () {
            $(this).removeClass("highlighted-row");
            $(this).prev().removeClass("highlighted-row");
        }
    );
}   // BindTableEvents()

function BindFilterEvents() {
    $('.filter-by').click(function () {
        if ($(".datefilter").css("display") == "block") {
            $(".datefilter").slideUp("300", function () {
            });
            $(".filter-by").removeClass("filter-by-clicked");
            $(".filter-by").text("filter by date");
            $(".datefilter .input-error").css("display", "none");
        } else {
            $(".datefilter").slideDown("300", function () {
            });
            $(".filter-by").addClass("filter-by-clicked");
            $(".filter-by").text("cancel");
        }   // else
        return false;
    });

    $('.cancel-filter').click(function () {
        $(".datefilter").slideUp("300", function () {
            $(".filter-by").removeClass("filter-by-clicked");
        });

        return false;
    });

    $("#from").change(function () {
        $(".txtFilterStart").val($(this).val());
    });

    $("#to").change(function () {
        $(".txtFilterEnd").val($(this).val());
    });

    
}   // BindCCBoxes()

function BindCCBoxes() {
    $('.card-boxes input').change(function () {
        if ($(".card-boxes input:checked").size() > 0) {
            //$(".use-saved-button").css("display", "block");
            $(".card-boxes input:checked").not(this).attr('checked', false);
        } else {
            //$(".use-saved-button").css("display", "none");
        }   // else
    });
}   // BindCCBoxes()


function StyleCustomInputs() {

    $(".checkbox, .checkbox input, .radio, .radio input, .radio-button-list input").each(function (i) {
        if ($(this).is('[type=checkbox],[type=radio]')) {

            var inputElement = $(this);

            // get the associated label using the input's id
            var label = $("label[for='" + inputElement.attr('id') + "']");

            //get type, for classname suffix 
            var inputType = (inputElement.is('[type=checkbox]')) ? 'checkbox' : 'radio';

            // wrap the input + label in a div 
            $('<div class="custom-' + inputType + '"></div>').insertBefore(inputElement).append(inputElement, label);

            // find all inputs in this set using the shared name attribute
            var allInputs = $("input[name='" + inputElement.attr('name') + "']");

            // necessary for browsers that don't support the :hover pseudo class on labels
            label.hover(
			        function () {
			            $(this).addClass('hover');
			            if (inputType == 'checkbox' && inputElement.is(':checked')) {
			                $(this).addClass('checkedHover');
			            }
			        },
			        function () { $(this).removeClass('hover checkedHover'); }
		        );

            //bind custom event, trigger it, bind click,focus,blur events					
            inputElement.bind('updateState', function () {

                if (inputElement.is(':checked')) {
                    if (inputElement.is(':radio')) {
                        allInputs.each(function () {
                            $('label[for=' + $(this).attr('id') + ']').removeClass('checked');
                        });
                    };
                    label.addClass('checked');
                }
                else {
                    label.removeClass('checked checkedHover checkedFocus');
                }

            })
		    .trigger('updateState')
		    .click(function () {
		        $(this).trigger('updateState');
		    })
		    .focus(function () {
		        label.addClass('focus');
		        if (inputType == 'checkbox' && inputElement.is(':checked')) {
		            $(this).addClass('checkedFocus');
		        }
		    })
		    .blur(function () { label.removeClass('focus checkedFocus'); });

            inputElement.animate({ opacity: 0 }, 1000, function () {
                $(this).fadeIn(500);
            });

        }
    });
}

// Validation functions...

function verifyUpdatesReq() {
    var returnValue = true;
    var emailVal = jQuery.trim($(".txt-signup").val());
    var isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(emailVal);
    var inputContainer = $(".footer-input");
    if (emailVal == "" || emailVal == "Email Address" || !isEmail) {
        returnValue = false;
        if (inputContainer.hasClass('error')) {
            inputContainer.css("border", "7px solid #838179")
            setTimeout(function () {
                inputContainer.css("border", "7px solid #D86969");
            }, 500);
        } else {
            inputContainer.addClass('error');
        }
        inputContainer.find(".footer-input-error").slideDown();
    }   // if
    else {
        inputContainer.removeClass('error');
        inputContainer.find(".footer-input-error").slideUp();
        $("#newsletter-error").slideUp();
    }   // else
    return returnValue;
}   // verifyUpdatesReq()





// Contact Us ("Questions? Contact us now.") widget functions

//  ====================================================================================================
//  Cookie Functions
//  ====================================================================================================

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }   // if
    }   // for
}   // getCookie()

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}   // setCookie()

function deleteCookie(c_name) {
    document.cookie = c_name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}   // deleteCookie()

function wasContactClosed() {
    var ContactClosed = getCookie("ContactClosed");
    return (ContactClosed != null && ContactClosed != "") ? true : false;
}   // wasContactClosed()

//  ====================================================================================================
//  Modal Functions
//  ====================================================================================================

function ShowContactModal() {
    // make sure the confirmation screen is not showing
    $("#contact-wanted").show();
    $("#contact-submitted").hide();
    // hide any previously shown errors...
    $(".highlighted-container").removeClass("highlighted-container");
    $(".input-error:visible").hide();

    $('.dd-contact-type option:eq(0)').attr('selected', 'selected');
    // open the modal
    $.openContactModal({
        target: '#contact-modal',
        height: '580px',
        overlayShowSpeed: 60,
        modalShowSpeed: 0,
        onComplete: function () {
            var tContact = setTimeout(function () { $('#contact-modal').find(".contact-focus").focus() }, 1000);
        }
    });
    return false;
} // ShowContactModal()

function ValidateSubmitAndCloseContactModal() {
    var isValid = checkRequiredFields($('.contact-form'), 'contact');
    if (isValid) {
        CompleteContactProcess(); // was: $.closeContactModal({ target: '#contact-modal' });
        return true;
    } else {
        return false;
    }
}

//  ====================================================================================================
//  Tab Functions
//  ====================================================================================================

function OpenPageTab() {
    // expire the contact cookie...
    deleteCookie("ContactClosed");
    // open the contact tab
    $("#contact-tab #open-page-tab").hide();
    $("#contact-tab #contact-link").show();
    if ($.browser.mozilla) {
        // FF doesn't animate properly, so just position it
        $("#contact-tab").css("position", "absolute");
        $("#contact-tab").hide();
        $("#contact-tab").css("right", "0px");
        // flip to-from absolute/fixed position to force proper positioning in FF
        setTimeout(function () { $("#contact-tab").css("position", "fixed"); $("#contact-tab").show(); }, 100);
    } else {
        $("#contact-tab").animate({ right: "0px" }, 500, "easeOutBack");
    }
    return false;
}   // ClosePageTab()

function ClosePageTab() {
    // set the single day cookie to stop the contact tab from displaying open...
    setCookie("ContactClosed", "true", 1);
    // hide the contact tab
    $("#contact-tab #open-page-tab").show();
    if ($.browser.mozilla) {
        $("#contact-tab").css("right", "-153px"); // FF doesn't animate properly, so just snap to position
    } else {
        $("#contact-tab").animate({ right: "-205px" }, 500, "easeInBack", function () {
            $("#contact-tab").animate({ right: "-153px" }, 500, "easeOutBack");
        });
    }
    return false;
}   // ClosePageTab()

//  ====================================================================================================
//  Init Functions
//  ====================================================================================================

function ShowOpenTab() {
    // slide the contact tab into the page from the right side 
//    $("#contact-tab").animate({ right: "0px" }, 500, "easeOutBack");
    OpenPageTab();
}   // ShowOpenTab()

function ShowClosedTab() {
    // show the contact tab in a closed state
    /*
    $("#contact-tab #open-page-tab").show();
    $("#contact-tab").css({ right: "-153px" });
    */
    ClosePageTab();
}   // ShowClosedTab()

//  ====================================================================================================
//  (FUNCTION) SubmitModal(string)
//  ====================================================================================================

function SubmitModal(updatedElem) {
    // update the hidden label used to determine what triggered the update panel
    $("#update-action").text(updatedElem);
    // hide the "cancel" button and show the loader screen
    switch ($("#update-action").text()) {
        case "contact":
            $("#contact-modal .avlContactModal-close").hide();
            $("#contact-modal .async-screen").fadeIn();
            break;
    }   // switch
    return true;
} // SubmitModal()

//  ====================================================================================================
//  (FUNCTION) contactLoaded(sender, args)
//  ====================================================================================================

// Raised after all content on the page is refreshed as the result of either a synchronous or an asynchronous postback, and after initial page load.
function contactLoaded(sender, args) {
    var updatedPanels = args.get_panelsUpdated();
    // execute desired action from update
    if (updatedPanels.length > 0) {
        switch ($("#update-action").text()) {
            case "contact":
                // set a timeout for the confirmation checkmark for the updated section
                var t = setTimeout(CompleteContactProcess, 1000);
                break;
        }   // switch
    }  // if

    // reset the update action text holder...
    $("#update-action").text("");

}   // contactLoaded(sender, args)        

//  ====================================================================================================
//  (FUNCTION) CompleteContactProcess()
//  ====================================================================================================

function CompleteContactProcess() {
    // reset the modal elements buy showing the cancel button and hiding the update screen
    $("#contact-modal .avlContactModal-close").show();
    $("#contact-modal .async-screen").fadeOut(300, function () {
        $("#contact-wanted").slideUp();
        $("#contact-submitted").slideDown();
    });
}   // CompleteContactProcess()

//  ====================================================================================================
//  Ready Function
//  ====================================================================================================

// When the document loads do everything inside here ...
$(document).ready(function () {
    // only show the contact tab if the user has not previously closed it (within a day)
    if (!wasContactClosed()) {
        window.setTimeout(function () { ShowOpenTab(); }, 3000);
    }   // if
    else {
        ShowClosedTab();
    }   // else

}); // ready() 
