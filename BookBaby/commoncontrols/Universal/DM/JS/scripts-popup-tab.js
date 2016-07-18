
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
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString() + "; path=/");
    document.cookie = c_name + "=" + c_value;
}   // setCookie()

function deleteCookie(c_name) {
    document.cookie = c_name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}   // deleteCookie()

function wasPopupClosed() {
    var PopupClosed = getCookie("PopupClosed");
    return (PopupClosed != null && PopupClosed != "") ? true : false;
}   // wasPopupClosed()


//  ====================================================================================================
//  Tab Functions
//  ====================================================================================================

function OpenPageTab() {
    // expire the contact cookie...
    deleteCookie("PopupClosed");
    // open the contact tab
    $("#popup-tab #open-page-tab").hide();
    $("#popup-tab #popup-link").show();
    $("#popup-tab").animate({ right: "16px" }, 500, "easeOutBack");
    return false;
}   // ClosePageTab()

function ClosePageTab() {
    // set the single day cookie to stop the contact tab from displaying open...
    setCookie("PopupClosed", "true", 1);
    // hide the contact tab
    $("#popup-tab").animate({ right: "-255px" }, 500, "easeInBack", function () {
        $("#popup-tab #open-page-tab").show();
        $("#popup-tab").animate({ right: "-175px" }, 500, "easeOutBack");
    });
    return false;
}   // ClosePageTab()

//  ====================================================================================================
//  Init Functions
//  ====================================================================================================

function ShowOpenTab() {
    // slide the contact tab into the page from the right side
    $("#popup-tab").animate({ right: "16px" }, 500, "easeOutBack");
    
}   // ShowOpenTab()

function ShowClosedTab() {
    // show the contact tab in a clsoed state
    $("#popup-tab #open-page-tab").show();
    $("#popup-tab").css({ right: "-175px" });
}   // ShowClosedTab()

//  ====================================================================================================
//  Ready Function
//  ====================================================================================================

// When the document loads do everything inside here ...
$(document).ready(function () {
    // only show the contact tab if the user has not previously closed it (within a day)
    if (!wasPopupClosed()) {
        setTimeout("ShowOpenTab()", 3000);
    }   // if
    else {
        ShowClosedTab();
    }   // else
});        // ready() 
