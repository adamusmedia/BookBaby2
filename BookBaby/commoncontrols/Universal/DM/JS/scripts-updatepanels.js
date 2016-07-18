
/* TOC

    --- Update Panels ---

    (FUNCTION) beginRequest(sender, args)
    (FUNCTION) pageLoading(sender, args)
    (FUNCTION) endRequest(sender, args)
    (FUNCTION) pageLoaded(sender, args)

    --- Pre Update Functionality ---

    (FUNCTION) SubmitModal(string)

    --- Post Update Functionality ---

    (FUNCTION) CompleteFeedbackProcess()

*/

//  ====================================================================================================
//  (FUNCTION) beginRequest(sender, args)
//  ====================================================================================================

    // Raised before processing of an asynchronous postback starts and the postback request is sent to the server.         
    function beginRequest(sender, args) { }

//  ====================================================================================================
//  (FUNCTION) pageLoading(sender, args)
//  ====================================================================================================

    // Raised after the response from the server to an asynchronous postback is received but before any content on the page is updated.
    function pageLoading(sender, args) { }   // pageLoading(sender, args)

//  ====================================================================================================
//  (FUNCTION) endRequest(sender, args)
//  ====================================================================================================

    // Raised after an asynchronous postback is finished and control has been returned to the browser.                            
    function endRequest(sender, args) { }

//  ====================================================================================================
//  (FUNCTION) pageLoaded(sender, args)
//  ====================================================================================================

    // Raised after all content on the page is refreshed as the result of either a synchronous or an asynchronous postback, and after initial page load.
    function pageLoaded(sender, args) {
        
        // clear the timeout for the session handler since this is a new server update
        clearTimeout(jsTimeoutNotify);
        clearTimeout(jsTimeoutExpire);
        
        // if we executed an async postback without errors...
        if ($(".session-error").text() != "sessionlost") {
            var updatedPanels = args.get_panelsUpdated();

            // initialize the session timeout handler to start with a refresh timer
            // setting the two timeouts will prevent the universal scripts.js function "InitSessionTimeout()" from setting these values again
            if (sessTimeoutExpire > 0) {
                jsTimeoutNotify = setTimeout("TimeoutNotification()", sessTimeoutExpire - 300000);
                jsTimeoutExpire = setTimeout("TimeoutExpiration()", sessTimeoutExpire);
            }   // if
            
            // execute desired action from update
            if (updatedPanels.length > 0) {
                switch ($("#update-action").text()) {
                    case "feedback":
                        // set a timeout for the confirmation checkmark for the updated section
                        var t = setTimeout(CompleteFeedbackProcess, 1000);
                        // reset the update action text holder...
                        $("#update-action").text("");
                        break;
                  
                    case "datatable":
                    	if (typeof startDataTable != 'undefined') {
                            startDataTable();
                    	}
                        // reset the update action text holder...
                    	$("#update-action").text("");
                        break;
                    case "default":
                    	if (typeof updateAction != 'undefined') {
                            updateAction();
                    	}
                        // reset the update action text holder...
                    	$("#update-action").text("");
                        break;
                }   // switch
            }  // if
        }   // if 
        else {
            // if we executed an async postback with errors...session has been lost!
            TimeoutExpiration();
        }   // else

        

    }   // pageLoaded(sender, args)        

//  ====================================================================================================
//  (FUNCTION) CompleteFeedbackProcess()
//  ====================================================================================================

    function SubmitModal(e) {
    	// if the delivery option was chosen to be our location, check if the current delivery address if currently our location.
    	// if it is not our location, we will need to update show the checkmark for the shipping option as well as the delivery address
    	var button = this,
			updateAction = $(button).data('updateaction');
    	// update the hidden label used to determine what triggered the update panel
    	$("#update-action").text(updateAction);
    	// hide the "cancel" button and show the loader screen
    	switch (updateAction) {
            case "feedback":
                $("#feedback-modal .avlModal-close").hide();
                $("#feedback-modal .async-screen").fadeIn();
                button.onclick = null;
                setTimeout(function () { button.click() }); //Added SetTimeout for IE bug - click was not working.

                break;
    	}   // switch

        return true;
    } // SubmitModal()


//  ====================================================================================================
//  (FUNCTION) SubmitModal(string)
//  ====================================================================================================

    function CompleteFeedbackProcess() {
        // reset the modal elements buy showing the cancel button and hiding the update screen
        $("#feedback-modal .avlModal-close").show();
        $("#feedback-modal .async-screen").fadeOut(300, function () {
            $("#feedback-wanted").slideUp();
            $("#feedback-submitted").slideDown();
        });
        InitResponsiveForms($('.feedback-form'));
    }   // CompleteFeedbackProcess()
