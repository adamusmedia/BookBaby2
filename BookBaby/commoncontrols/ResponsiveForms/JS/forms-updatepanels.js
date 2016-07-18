
/* 	==========================================================================
    Address: Country Drop Down Change
    ========================================================================== */

    function CountryUpdated(sender, args) {

        var updatedPanels = args.get_panelsUpdated();

        // execute desired action from update
        if (updatedPanels.length > 0) {
            switch ($("#update-action").text()) {
                case "country-updated":

                    // release any localstorage data for the update panel
                    ReleaseLocalStorage($("#address-container"));

                    // call the init functions for the address fieldset to rebind elements
                    InitResponsiveForms($("#address-container"));
                    // reset the update action text holder...
                    $("#update-action").text("");
                    break;
            	case "update-form":
            		// release any localstorage data for the update panel
            		ReleaseLocalStorage($(".update-form"));

            		// call the init functions for the updated fieldset to rebind elements
            		InitResponsiveForms($(".update-form"));
            	    // reset the update action text holder...
            		$("#update-action").text("");
            		break;
                default:
                    // make sure if the country update panel is not the caller, to fallback to universal pageLoaded method...
                    pageLoaded(sender, args);
                    break;
            }   // switch

            // update any alert message boxes with appropriate icons
            InitAlertBoxIcons();

        }  // if

        
    }   // countryUpdated()

    function UpdateResponsiveForm(sender, args) {
        // grab the updated update panels
        var updatedPanels = args.get_panelsUpdated();
        // iterate through each updated panel
        $(updatedPanels).find(".update-form").each(function () {
            // grab the current update panel form
            var $form = $(this);
            // release any localstorage data for the update panel form
            ClearLocalStorage($form);
            // call the init functions for the updated fieldset to rebind elements
            InitResponsiveForms($form);
        }); // each
    }   // UpdateResponsiveForm

