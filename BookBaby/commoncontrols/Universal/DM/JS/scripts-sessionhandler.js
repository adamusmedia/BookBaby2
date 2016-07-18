
/* TOC

(GLOBAL) Variables
(FUNCTION) TimeoutNotification()
(FUNCTION) TimeoutNotificationYes()
(FUNCTION) TimeoutExpiration()
(FUNCTION) SessionRefresh()

*/

/* 	==========================================================================
    (TESTING) Execution Time
    ========================================================================== */

    var start;
    // used for execution times...
    // start timer : Timer(true)
    // stop timer : Timer(false)
    function Timer(startTimer) {
        if (startTimer) { start = new Date().getTime(); }
        else {
            var end = new Date().getTime();
            var time = end - start;
            console.log('Execution time: ' + time + "ms");
        }   // else
    }   // StopTimer

//  ====================================================================================================
//  (GLOBAL) Variables
//  ====================================================================================================

// vars used for timeout calls to the session warning and expiration
var jsTimeoutNotify = null,
    jsTimeoutExpire = null,
    expiredSessionModalShown = false,
    sessExists = true;

//  ====================================================================================================
//  (FUNCTION) TimeoutNotification()
//  ====================================================================================================

// Displays the timeout notification overlay and prompts for extension choice
function TimeoutNotification() {

    if (typeof sessTimeoutExtend != "undefined" && sessTimeoutExtend > 0) {
        SessionRefresh();
    } else {

        // show the timeout notification to the user
        $.openModal({
            target: '#session-warning',
            showCloseButton: false,
            width: '500px'
        });
    }
}   // TimeoutNotification()   

//  ====================================================================================================
//  (FUNCTION) TimeoutNotificationYes()
//  ====================================================================================================

// Called when user chooses "Yes" to extend their session
// Calls the session refresh function and hides the timeout notification overlay
function TimeoutNotificationYes() {
    // the user has requested an extension of their session... refresh it and forget it kid!
    SessionRefresh();
    // close the session warning modal
    $.closeModal({ target: '#session-warning' })
    // stop the link click from returning
    return false;
}   // TimeoutNotificationYes()

//  ====================================================================================================
//  (FUNCTION) TimeoutExpiration()
//  ====================================================================================================

// Make an ajax call to a page that will end the session in case it still exists?
// Displays the session expiration notifying the user that their session has expired
function TimeoutExpiration() {
    // toggle the bool to prevent a duplicate call to this function if there is an update panel on the page
    // if there is an update panel on the page, and session has been lost, this function will be called from the pageLoaded() function in the universal scripts-updatepanels.js file
    // if there is no update panel on the page, and session has been lost, this function will be called from the InitSessionTimeout() function in the universal scripts.js file
    expiredSessionModalShown = true;
    // open the session expiration modal
    $.openModal({
        target: '#session-expiration',
        showCloseButton: false,
        width: '500px',
        overlayOpacity: "0.9",
        onShow: function () { $.post("CommonControls/SessionHandler/SessionEnd.aspx"); }
    });
}   // TimeoutExpiration()

//  ====================================================================================================
//  (FUNCTION) SessionRefresh()
//  ====================================================================================================

// Refreshes the session of the user by calling a page, by ajax, that makes a server call
// If the ajax call returns no data, the session expiration function is called
function SessionRefresh() {
    // session will be refreshed, clear the timeouts to show the modals
    clearTimeout(jsTimeoutNotify);
    clearTimeout(jsTimeoutExpire);
    // refresh the session by posting to a page that just executes a response.write from code-behind
    $.when($.post("CommonControls/SessionHandler/SessionRefresh.aspx")).then(function (data) {
        if (data == "refreshed") {
            jsTimeoutNotify = setTimeout("TimeoutNotification()", sessTimeoutExpire - 300000);
            jsTimeoutExpire = setTimeout("TimeoutExpiration()", sessTimeoutExpire);
        }   // if
        else {
            TimeoutExpiration();
        }    // else
    });

}   // SessionRefresh()
