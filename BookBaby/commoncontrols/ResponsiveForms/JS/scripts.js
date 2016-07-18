/*
    Document.Ready              (page load binding)

    InitAutoFillCatches         (autofill catch functionality)
    InitResponsiveForms         (parent function)
    InitFormWarningContainers   (create the fieldset warning containers)
    InitFormMasks               (bind the form masks)
    InitFormInputs              (bind the form inputs)
    InitFormStatusIcons         (create the form statuses for each of the inputs)
    InitFormLabels              (init the states of the inputs depending on whether there is a prepopulated value)
    InitFormInstantValidation   (bind the instant validation)
    InitAddressInputs           (bind the address inputs)
    InitAddressModal            (bind the address modal links)
    InitFormButtons             (bind the form's buttons)
    InitAlertBoxIcons           (add appropriate icons to the alert boxes)

    ProcessInputChange          (update input value, validation display, and local storage)
    ShowValidationMessage       (display instant validation message for input)
    SetFocusToCorrectInput      (give focus to one of three input groups)
    PopulateCountryStateByIP    (set the country and state drop down values according to the user's ip address)
    ReleaseLocalStorage         (clear any locally stored for data for an ajax call - allows for rebinding of localstorage)
    ClearLocalStorage           (clear any locally stored form data)
    DisposeOfAutoCompletes      (dispose of any autocomplete containers)
    CapitalizeFirstLetter       (capitalizes first letter of any word passed in)
*/

/* 	==========================================================================
    Gloabl Variables
    ========================================================================== */

    var newFormContent = true,
        bypassPhoneCountryCode = false,
        useSisyphus = (typeof bypassLocalStorage === 'undefined' || (typeof bypassLocalStorage !== 'undefined' && !bypassLocalStorage)); 

/* 	==========================================================================
    Page Load Binding
    ========================================================================== */

    $(document).ready(function () {

        var $form = $(".responsive-form");
        
        InitResponsiveForms($form);
        InitAutoFillCatches($form);

    }); // ready

/* 	==========================================================================
    Functions
    ========================================================================== */

    // autofill catch functionality
    function InitAutoFillCatches($form) {
        // catch any initial autofills from browser
        setTimeout(function () { InitFormLabels($form) }, 100);
    }   // InitAutoFillCatches   

    // parent function
    function InitResponsiveForms($form) {

        InitSisyphus($form);
        InitFormWarningContainers($form);
        InitFormMasks($form);
        InitFormStatusIcons($form);
        InitFormInputs($form);
        InitFormInstantValidation($form);
        InitUSPhoneInputs($form);
        InitAddressInputs($form);
        InitAddressModal();
        InitFormLabels($form);
        InitFormButtons($form);
        InitAlertBoxIcons();

        // temp solution until country list is imported and used.
        $(".txt-state").find(".textbox").attr("maxlength", "30");

    }   // InitFormMasks

    // init input values for local storage
    function InitSisyphus($form) {
        // make sure a bypass is not being used on current page
        if (useSisyphus) {

            // add a hidden checkbox to be used for updating the address fields... very hacky!
            if ($("#phustrigger").size() == 0) {
                $("#address-container").append("<input id='phustrigger' type='checkbox' style='display:none;' />");
            }   // if

            // determine if the container being passed in is the fieldset
            if ($form.is("fieldset")) {
                $form.sisyphus({ excludeFields: $(".no-sisy, input[type=hidden], .no-sisy input[type=radio], .no-sisy input[type=checkbox]"), includeFields:$('input.has-sisy'), customKeySuffix: document.domain + window.location.pathname.replace(/\//g, "_") + "_" });
            }   // if
            else {
                // local storage
                $form.find("fieldset").each(function () {
                    $(this).sisyphus({ excludeFields: $(".no-sisy, input[type=hidden], .no-sisy input[type=radio], .no-sisy input[type=checkbox]"), includeFields: $('input.has-sisy'), customKeySuffix: document.domain + window.location.pathname.replace(/\//g, "_") + "_" });
                });
            }   // else
        }// if

    }   // InitSisyphus

    // create the fieldset warning containers
    function InitFormWarningContainers($form) {

        // identify the form fieldsets
        var $formFieldsets = $form.is("fieldset") ? $form : $form.find("fieldset");

        // add a warning container for each of the fieldsets for validation output
        $formFieldsets.each(function () {

            var $this = $(this),
                warningDiv = "<div class='warning-messages'></div>";
            if (!$this.find('div.warning-messages').size()) {
            	// add a warning container for each of the fieldsets for validation output
            	if ($this.find("legend").size() == 0) {
            		// there is no legend for this fieldset, add before the first <ul>
            		$this.find("ul:first").before(warningDiv);
            	}   // if
            	else {
            		// there is a legend for this fieldset, add after the legend
            		$this.find("legend").after(warningDiv);
            	}   // else
            }
        }); // each

        // bind the bypass links in the warning messages
        $(".bypass-field-link").live("click", function () {

            // add a temp element to the page to hold bypassed validation for elements
            var bypassedPlaceholderID = "bypassed-" + $(this).attr("data-element-id");

            // only add the placeholder if it does not already exist
            if ($("#" + bypassedPlaceholderID).size() == 0) {
                $("body").append("<div id='" + bypassedPlaceholderID + "'></div>")
            }   // if

            // re-validate the input with the bypassed attribute
            ValidateInput($("#" + $(this).attr("data-element-id")));

            // prevent click
            return false;
        }); // click

    }   // InitFormWarningContainers

    // bind the form masks
    function InitFormMasks($form) {

        // identify the masks
        var $formMasks = $form.find("ul li p");

        // when the masks are clicked on, set focus to the child input
        $formMasks.on("click", function () {
            if (!$(this).hasClass("focused")) {
                $(this).find(".textbox, .textarea, .dropdown").focus();
            };
        });

    }   // InitFormMasks

    // bind the form inputs
    function InitFormInputs($form) {

        // identify the masks
    	var $formMasks = $form.find("ul li p"),
			$formDropDowns = $formMasks.find("select");

		//Set up DropDowns
	    // style the custom select inputs
    	$formDropDowns.customSelect();

        // init the inline label logic for all input's focus and blur events
        $formMasks.find(".textbox, .dropdown, .textarea").not(":disabled")
            .on("focus", function () {

                if (!$(this).closest("p").hasClass("focused")) {

                    var $this = $(this),
                        $parent = $this.closest("p"),
                        $label = $parent.find("label"),
                        $focusElem = $this;

                    // add the blue glow from the input's parent p after removing the focused class from any other input
                    $(".focused").removeClass("focused");
                    $parent.addClass('focused');

                    // set the edit classes corrected
                    if ($this.val() != null && $this.val().length > 0) {
                        if ($label.hasClass("inputted")) {
                            $label.addClass("inputting-notrans");
                        }   // if
                        else {
                            $label.addClass("inputting");
                        }   // else
                    }   // if

                    // save the current input that has focus, in case something bad happens we can reboot back to that input
                    localStorage["focus"] = $this.not('.no-focus').attr("id");
                }   // if
            })
            .on("blur", function () {

                var $this = $(this),
                $parent = $this.closest("p"),
                $label = $parent.find("label");

                if ($parent.hasClass("focused")) {

                    // remove the blue glow from the input's parent p
                    $parent.removeClass('focused');

                    // check the form labels...
                    InitFormLabels($form);
                }   // if

                // set the editable classes
                if ($this.val() != null && $this.val().length == 0 || $this.val() == null) {
                    $label.removeClass("inputting inputted inputting-notrans");
                }   // if
                else {
                    $label.removeClass("inputting inputting-notrans").addClass("inputted");
                }   // else
            });

        // init the inline label logic for textarea's focus and blur events
        $formMasks.find(".textarea").not(":disabled")
            .on("focus", function () {
                $(this).closest("li").find("label.outter-label").addClass("focused")
            })
            .on("blur", function () {
                $(this).closest("li").find("label.outter-label").removeClass("focused")
            });

        // init the inline label logic for all textbox keyup and keydown events
        $formMasks.find(".textbox, .textarea")
            .on("keydown", function () {
                var $label = $(this).parent().find("label");
                if (!$label.hasClass("inputting-notrans")) {
                    $label.addClass("inputting");
                }   // if
            })  // keydown
            .on("keyup", function () {
                var $this = $(this),
                    $label = $(this).parent().find("label");
                if ($this.val().length == 0) {
                    $label.removeClass("inputted inputting inputting-notrans");
                }   // if
                else if (!$label.hasClass("inputting-notrans")) {
                        $label.addClass("inputting");
                }   // else if

                // check the form labels...
                InitFormLabels($form);
            }); // keyup

        // make sure any select inputs not marked "no-reset" are displayed without a value
        $formMasks.find("select").not(".no-reset")
            .each(function () {
            	var $this = $(this),
                    $label = $this.parent().find("label"),
                    index = $this.parent().find(".dropdown option:selected").index();

            	// display with no starting value
            	if (index == -1 || $this.val() == "") {
            		$label.removeClass("inputted");
            	}   // if
            })
			.on('change', function () {
				var $this = $(this),
					$label = $(this).parent().find("label");
				if ($this.val() != null && $this.val().length == 0) {
					$label.removeClass("inputted inputting inputting-notrans");
				}   // if
				else {
				    $label.addClass("inputted");
				}   // else
			});

        SetFocusToCorrectInput($form);

    }   // InitFormInputs

    // create the form statuses for each of the inputs
    function InitFormStatusIcons($form) {

        // identify the masks
        var $formMasks = $form.find("ul li");

        // append the warning status element to each input's parent mask
        $formMasks.find(".textbox, .textarea, .dropdown")
            .each(function () {
                var $parent = $(this).closest("p"),
                    $errorMessage = $parent.prop("title");
                if (!$parent.find('i.input-warning').size()) {
                	$parent.append("<i class='input-status input-warning icon-attention' title='" + $errorMessage + "' onclick='return ShowValidationMessage(event, $(this));'></i>");
                }
            });
        $formMasks.find(".radiobutton, .checkbox")
            .each(function () {
            	var $parent = $(this).closest(".radio-mask, .checkbox-mask"),
                    $errorMessage = $parent.prop("title");
            	if (!$parent.find('i.input-warning').size()) {
            		$parent.find("label:first").append("<i class='input-status input-warning icon-attention' title='" + $errorMessage + "' onclick='return ShowValidationMessage(event, $(this));'></i>");
            	}
            });

        // append the loading image for inputs with the following attribute: data-loader="true"
        $formMasks.find("[data-loader=true]")
            .each(function () {
                var $parent = $(this).closest("p");
                $parent.append("<img class='input-loading' src='/CommonControls/ResponsiveForms/IMG/async-loader-1.gif' alt='Loading' />");
            });

    }   // InitFormStatusIcons

    // init the states of the inputs depending on whether there is a prepopulated value
    function InitFormLabels($form) {

        // identify the masks
        var $formMasks = $form.find("ul li p");

        // set the label states for the test inputs
        $formMasks.find(".textbox, .textarea")
            .each(function () {

                var $this = $(this),
                $label = $this.parent().find("label");

                if ($this.val().length == 0) {
                    $label.removeClass("inputting inputted");
                }   // if
                else {
                    $label.addClass("inputted");
                }   // else
            });

        // set the label states for the drop downs
        $formMasks.find("select")
            .each(function () {
                var $this = $(this),
                    $label = $this.parent().find("label"),
                    selectedIndex = $this.prop("selectedIndex");

                // set the edit classes corrected
                if (selectedIndex  == -1 || $this.val() == '') {
                    $label.removeClass("inputting inputted");
                }   // if
                else {
                    $label.addClass("inputted");
                }   // else
            });

    }   // InitFormLabels

    // bind the instant validation
    function InitFormInstantValidation($form) {

        // identify the masks
        var $formMasks = $form.find("ul li p");

        // DEBUG: displays all binded masks by parent form
        //$formMasks.each(function () {
        //    console.log("[" + $(this).closest(".responsive-form").attr("class") + "] " + $(this).attr("class"));
        //}); // each

        // validate the input
    	$formMasks.find("input.textbox, textarea.textarea, select.dropdown, input.checkbox, input.radiobutton, .radiobutton input, .checkbox input")
            .on("change", function () {
                var $this = $(this)
            	// validate the input
            	ValidateInput($this);
            });

        $form.find("input.radiobutton, .radiobutton input")
		   .on("click", function () {
		   	    var $this = $(this).closest('.radiobutton');
		   	    // validate the input
		   	    ValidateInput($this);
		   });

    }   // InitFormInstantValidation

    // bind the address inputs
    function InitAddressInputs($form) {

        // 1. show/hide the appropriate state input depending on the country drop down value
        // 2. set the phone number input label's format text depending on the country drop down value
        // 3. set the state
        var countryCode = ($form.find(".dd-country .dropdown").size() > 0 && typeof $form.find(".dd-country .dropdown option[selected='selected']").val() != "undefined") ? $form.find(".dd-country .dropdown option[selected='selected']").val().toLowerCase() : "";

        // set the state of the country related inputs and thier labels
        SetCountryRelatedInputStates($form, countryCode, false);

        // if the country is non-US, prefix the phone number inputs with the country code
        PrefixPhoneWithCountryCode($form, countryCode, newFormContent, bypassPhoneCountryCode);

        // assign the change event for the country drop down
        $form.find(".dd-country .dropdown").live("change", function () {
            $("#update-action").text("country-updated");
        }); // change

        $form.find(".txt-address1 .textbox").each(function () {
            // get the parent form
            var $parentForm = $(this).closest(".responsive-form");

            $(this)
            // don't navigate away from the field on tab when selecting an item
            .bind("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).data("ui-autocomplete").menu.active) {
                    event.preventDefault();
                }
            })

            .autocomplete({
                position: { my: "left top", at: "left bottom-1", of: $parentForm.find(".txt-address1") },
                delay:      0,
                source:     function (request, response) {

                    // grab the street address textbox
                    var $this = $parentForm.find(".txt-address1 .textbox"), thisValue = $.trim($this.val());
                    // get the values for the current zip code and country code
                    var countryCode = $parentForm.find(".dd-country .dropdown").val();

                    // only proceed if we have a value and the country is either US or PR
                    if (thisValue != "" && thisValue.length > 1 && countryCode == "US") {

                        // build the json request
                        var jsonData = { testing: false, companyname: $parentForm.find(".txt-company .textbox").val(), addressline1: $parentForm.find(".txt-address1 .textbox").val(), addressline2: $parentForm.find(".txt-address2 .textbox").val(), addressline3: $parentForm.find(".txt-address3 .textbox").val(), city: $parentForm.find(".txt-city .textbox").val(), state: $parentForm.find(".dd-states .dropdown").val(), zipCode: $parentForm.find(".txt-zipcode .textbox").val(), country: $parentForm.find(".dd-country .dropdown").val() };

                        $.ajax({
                            url: "/MyAccount/CommonControls/ResponsiveForms/Handlers/UPSAddressValidationStreetLevel.ashx",
                            type: 'POST',
                            data: JSON.stringify(jsonData),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {

                                // assign the response objects
                                var dataResponse = data.Response,
                                    dataAddressClassification = data.AddressClassification,
                                    dataAddressKeyFormats = data.AddressKeyFormats,
                                    dataAddressIndicator = data.AddressIndicator;

                                // make sure there is at least one address returned by UPS web api...
                                if (dataAddressKeyFormats.length > 0) {

                                    var fullAddresses = [],
                                        tempAddresses = [],
                                        distinctAddress = [];

                                    // DEBUG OUTPUT
                                    if (showJSONAddressData) {
                                        console.log(dataAddressKeyFormats);
                                    }

                                    // construct the address values and push into a temp array
                                    $.each(dataAddressKeyFormats, function (index, value) {
                                        fullAddresses.push(CapitalizeFirstLetter(dataAddressKeyFormats[index].AddressLine1) + ", " + CapitalizeFirstLetter(dataAddressKeyFormats[index].PoliticalDivision2) + " " + dataAddressKeyFormats[index].PoliticalDivision1 + " " + CapitalizeFirstLetter(dataAddressKeyFormats[index].PostcodePrimaryLow));
                                    }); // each

                                    // make sure we have unique addresses, because there could be street number/apt number groups
                                    $.each(fullAddresses, function (i, el) {
                                        if ($.inArray(el, tempAddresses) === -1) {
                                            tempAddresses.push(el);
                                            distinctAddress.push(dataAddressKeyFormats[i]);
                                        }   // if
                                    }); // each

                                    // map the address to the response
                                    response($.map(distinctAddress, function (item) {
                                        return {
                                            data: { address1: CapitalizeFirstLetter(item.AddressLine1), city: CapitalizeFirstLetter(item.PoliticalDivision2), state: item.PoliticalDivision1, zip: item.PostcodePrimaryLow },
                                            value: CapitalizeFirstLetter(item.AddressLine1),
                                            label: CapitalizeFirstLetter(item.AddressLine1) + ", " + CapitalizeFirstLetter(item.PoliticalDivision2) + " " + item.PoliticalDivision1 + " " + item.PostcodePrimaryLow
                                        }   
                                    }));    // response

                                }   // if
                            }   // success
                        }); // ajax
                    }   // if
                },
                minLength:  2,
                select: function (event, ui) {

                    // auto populate the other address fields
                    ProcessInputChange($parentForm.find(".txt-address1"), $parentForm.find(".txt-address1 .textbox"), ui.item.data.address1, true);
                    ProcessInputChange($parentForm.find(".txt-zipcode"), $parentForm.find(".txt-zipcode .textbox"), ui.item.data.zip, true);
                    ProcessInputChange($parentForm.find(".txt-city"), $parentForm.find(".txt-city .textbox"), ui.item.data.city, true);

                    // update the validation display for the address since we are blocking instant validation for this field
                    DisplayValidationResult($parentForm.find(".txt-address1"), $parentForm.find(".txt-address1 .textbox"), false, false);

                    // update the state dropdown and trigger an update to the custom style handler
                    $parentForm.find(".dd-states .dropdown").focus().val(ui.item.data.state).blur().trigger("update");

                    // check to see if there should be an apartment number
                    var inAddress1 = $parentForm.find(".txt-address1 .textbox").val(),
                        inAddress2 = $parentForm.find(".txt-address2 .textbox").val(),
                        inCity = $parentForm.find(".txt-city .textbox").val(),
                        inState = $parentForm.find(".dd-states .dropdown").val(),
                        inZip = $parentForm.find(".txt-zipcode .textbox").val();

                    // make sure we have a complete address so we can validate the address2 line
                    if (inAddress1 != "" && inCity != "" && inState != "" && inZip != "") {

                        var addressXML = "<address><addressline1>" + inAddress1 + "</addressline1><addressline2>" + inAddress2 + "</addressline2><city>" + inCity + "</city><state>" + inState + "</state><zip>" + inZip + "</zip></address>",
                            isMissingApartment = false;

                        // call the satori web service
                        $.ajax({
                            type: "POST",
                            url: "/AVLUtilities/AddressVerification.aspx",
                            contentType: "text/xml",
                            dataType: "text",
                            data: addressXML,
                            success: function (msg) {
                                // parse the ml response
                                var xmlDoc = $.parseXML(msg),
                                    $xml = $(xmlDoc),
                                    missingApt = $xml.find("ismissingaptnumber");
                                // assign the return value for the missing apartment number
                                if (missingApt != null && missingApt != "") {
                                    // determine if the address is missing an apartment number
                                    isMissingApartment = missingApt.text().toLowerCase() === "true";
                                    // if the missing apratment is true, flag so we let this go next time around
                                    if (isMissingApartment) {
                                        // give focus to the address2 input
                                        $parentForm.find(".txt-address2").attr("title", "Please enter your Apt, Suite, Bldg. (required).");
                                        $parentForm.find(".txt-address2 .textbox").focus();
                                        // toggle the label of the address2
                                        $parentForm.find(".txt-address2 label em").text("(required)");
                                    }   // if
                                    else {
                                        $parentForm.find(".txt-address2").attr("title", "Please enter your Apt, Suite, Bldg. (if applicable).")
                                        // toggle the label of the address2
                                        $parentForm.find(".txt-address2 label em").text("(if applicable)");
                                        // give focus to the next focusable input after the address fields that is empty
                                        FocusNextFocusableEmptyInput($parentForm, $parentForm.find(".dd-states .dropdown"))
                                    }   // else
                                }   // if
                                else {
                                    // toggle the label of the address2
                                    $parentForm.find(".txt-address2 label em").text("(if applicable)");
                                    // give focus to the next focusable input after the address fields that is empty
                                    FocusNextFocusableEmptyInput($parentForm, $parentForm.find(".dd-states .dropdown"))
                                }
                            },   // success
                            fail: function (msg) {
                                // toggle the label of the address2
                                $parentForm.find(".txt-address2 label em").text("(if applicable)");
                                // give focus to the address2 input
                                $parentForm.find(".txt-address2 .textbox").focus();
                            }   // fail
                        });
                    }   // if
                },
                open:       function () {
                    $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
                },
                close:      function () {
                    $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
                    // trigger the local storage save...
                    $parentForm.find(".txt-address1 .textbox").trigger("change");
                }

            }); // autocomplete
        }); // each

    }   // InitFormInputs

    // format any pre-populated US phone number fields
    function InitUSPhoneInputs() {
        if ($("input[data-validation='req-phone-us']").size() > 0) {
            // init the phone number to the correct format
            FormatUSPhoneNumber($("input[data-validation='req-phone-us']"), $("input[data-validation='req-phone-us']").val(), true);
            // bind the change event for the phone number (formatting)
            $("input[data-validation='req-phone-us']").bind("change", function () {
                var $this = $(this);
                FormatUSPhoneNumber($this, $this.val(), true);
            }); // change
        }   // if
        if ($("input[data-validation='opt-phone-us']").size() > 0) {
            // init the phone number to the correct format
            FormatUSPhoneNumber($("input[data-validation='opt-phone-us']"), $("input[data-validation='opt-phone-us']").val(), true);
            // bind the change event for the phone number (formatting)
            $("input[data-validation='opt-phone-us']").bind("change", function () {
                var $this = $(this);
                FormatUSPhoneNumber($this, $this.val(), true);
            }); // change
        }   // if
    }   // InitPhoneInput

    // bind the address modal links
    function InitAddressModal() {

        // link options that appear in the address results modal when there is either no matching address, or more than one address...

        // "changed the address" option
        $("#address-results").find("#ar-change").live("click", function () {
            // get the address line 1 element by picking off the ID from the clicked link (added in validation script "BuildAddressResultsModal")
            var address1_ID = "#" + $(this).attr("data-address1ID");
            // get the parent form
            var $form = $(address1_ID).closest(".responsive-form");
            // give focus to the address1 textbox
            $form.find(".txt-address1 .textbox").focus();

            if ($(this).attr("data-showDeliveryModal") == "true") {
            }   // if

            // close the modal
            return $.closeModal({ target: "#address-results" });
        }); // click

        // "certify the address is correct" option
        $("#address-results").find("#ar-certify").live("click", function () {
            // get the address line 1 element by picking off the ID from the clicked link (added in validation script "BuildAddressResultsModal")
            var address1_ID = "#" + $(this).attr("data-address1ID");
            // get the parent form
            var $form = $(address1_ID).closest(".responsive-form");
            // toggle the flag, so now validation will get bypassed for this address 
            $("#address-results").find("#addressCertified").val('true');
            addressCertified = true;
            // close the modal
            $form.find(".txt-address1 .textbox").trigger("change");
            return $.closeModal({ target: "#address-results" });
        }); // click

        // "verified address choice" option
        $("#address-results").find(".ar-choice").live("click", function () {
            // get the address line 1 element by picking off the ID from the clicked link (added in validation script "BuildAddressResultsModal")
            var address1_ID = "#" + $(this).attr("data-address1ID");
            // get the parent form
            var $form = $(address1_ID).closest(".responsive-form"),
                addresses = $("#address-results").data("addresses"),
                addressIndex = $(this).prop("rel");

            // make sure we have everything we need to populate the address with the user's choice
            if (addresses != null && addresses.length > 0) {

                ProcessInputChange($form.find(".txt-address1"), $form.find(".txt-address1 .textbox"), CapitalizeFirstLetter(addresses[addressIndex].AddressLine1), true);
                ProcessInputChange($form.find(".txt-address2"), $form.find(".txt-address2 .textbox"), CapitalizeFirstLetter(addresses[addressIndex].AddressLine2), true);
                ProcessInputChange($form.find(".txt-city"), $form.find(".txt-city .textbox"), CapitalizeFirstLetter(addresses[addressIndex].PoliticalDivision2), true);
                ProcessInputChange($form.find(".dd-states"), $form.find(".dd-states .dropdown"), addresses[addressIndex].PoliticalDivision1, true);
                ProcessInputChange($form.find(".txt-zipcode"), $form.find(".txt-zipcode .textbox"), addresses[addressIndex].PostcodePrimaryLow, true);

                // update the validation display for the address since we are blocking instant validation for this field
                DisplayValidationResult($form.find(".txt-address1"), $form.find(".txt-address1 .textbox"), false, false);

            }   // if
            
            // close the modal window
            return $.closeModal({ target: "#address-results" });
        });

    }   //InitAddressModal

    // bind the form's buttons
    function InitFormButtons($form) {

        $form.find(".button-container .clear-button").on("click", function () {

            //clear any local storage associated with this form
            ClearLocalStorage($form);

            // iterate over all of the inputs for the form
            $(':input', $form).each(function () {
                // make sure this input does not have a ".no-reset" class (ie. preselected checkboxes)
                if (!($(this).hasClass("no-reset") || $(this).parent().hasClass("no-reset"))) {

                    var type = this.type;
                    var tag = this.tagName.toLowerCase(); // normalize case
                    // it's ok to reset the value attr of text inputs, password inputs, and textareas
                    if (type == 'text' || type == 'password' || tag == 'textarea') {
                        this.value = "";
                        // checkboxes and radios need to have their checked state cleared
                        // but should *not* have their 'value' changed
                    } else if (type == 'checkbox' || type == 'radio') {
                        this.checked = false;
                    // select elements need to have their 'selectedIndex' property set to -1
                    // (this works for both single and multiple select elements)
                    } else if (tag == 'select') {
                        this.selectedIndex = 0;
                        // make sure the custom select gets updated with the empty value
                        $(this).trigger("update");
                    }   // else if
                }   // if
            });

            // run back through the inputs and reset any labels that are in the inputted state
            InitFormLabels($form);

            return false;
        }); // click

    }   // InitFormButtons

    // add icons to the alert boxes
    function InitAlertBoxIcons() {
        $(".success-message").each(function () { AddAlertBoxIcon($(this), "icon-ok-circled"); }); // each
    }   // InitAlertBoxIcons


//  ====================================================================================================
//  Utilities
//  ====================================================================================================

    function AddAlertBoxIcon($alertBox, iconClass) {

        var hasIcon = $alertBox.find("i." + iconClass).size() > 0,
            iconElem = "<i class='" + iconClass + "'></i>";

        // if this alert message does not have an icon, add it
        if (!hasIcon) {
            $alertBox.prepend(iconElem);
        }   // if
    }   // AddAlertBoxIcon

    function FocusNextFocusableEmptyInput($form, $input) {

        var $focusables = $form.find(":focusable"),
            $emptyFocusables = $focusables.filter(function () { return $(this).val() == ""; }),
            found = false;

        // loop through the empty focusable elements in the form
        $emptyFocusables.each(function () {
            // if the element has not been found and it is after the element that was passed in
            if (!found && $focusables.index($(this)) > $focusables.index($input)) {
                // give focus to this input
                $(this).focus();
                // toggle the flag
                found = true;
            }   // if
        });   // each

    }   // NextFocusableEmptyInput

    function ProcessInputChange($mask, $input, value, validate) {

        // grab the initial input value before we update to determine if the change event needs to be fired
        var initialInputValue = $input.val(),
            newInputValue = value;

        // update the value of the input
        $input.val(newInputValue);

        // fire the change event for instant validation and local storage
        if (validate && initialInputValue != newInputValue) {
            $input.trigger("change");
        }   // if

        // toggle the label state occordingly...
        if (newInputValue == "") {
            $mask.find("label").removeClass("inputted");
        }   // if
        else {
            $mask.find("label").addClass("inputted");
        }   // else

    }   // SetIinputValue

    function ShowValidationMessage(e, $warning) {
    	e.preventDefault? e.preventDefault() : e.returnValue = false;
    	e.stopPropagation ? e.stopPropagation(): null;
        // if the form message modal does not exist, create it...
        if ($("#responsive-form-message").size() == 0) {
            // create the modal structure
            var formMessageModal = "<div id='responsive-form-message' class='avlModal-container'><div class='avlModal-wrapper'><div class='avlModal-content'><p class='warning-message'></p></div></div></div>";
            // add the new form message modal to the body
            if ($("form").size() == 1) {
            	$("form").append(formMessageModal);
            }
            else {
            	$("body").append(formMessageModal);
            }
        }

        // populate the modal content...
        $("#responsive-form-message").find(".avlModal-content p.warning-message").text($warning.attr("title"));
    	
        // show the modal
        $.openModal({ target: "#responsive-form-message", width:"300px" });
    	// blank the return

    	//remove focus
        setTimeout(function () {
        	$(':focus').blur();
        });
        return false;
    }   // ShowValidationMessage
    
    function SetFocusToCorrectInput($form) {

        // init the focus elements
        var $focusElem,
            debugFocusElement = false;

        // first, try to focus a localstorage input
        // next, try to focus the ".focus" input
        // next if there is a visible modal, try to place focus to the first form element
        // if not present give focus to the first form element
        if (localStorage["focus"] != null && localStorage["focus"].length > 0) {
            $focusElem = $("#" + localStorage["focus"]);
            if (debugFocusElement) { console.log("focus to: localStorage"); }
        }
        else if ($form.find(".focus").size() > 0) {
            $focusElem = $form.find(".focus");
            if (debugFocusElement) { console.log("focus to: .focus"); }
        }
        else if ($(".avlModal").is(":visible")) {
            $focusElem = $(".avlModal:visible").find("fieldset ul li p:first").find(".textbox, .textarea, .dropdown");
            if (debugFocusElement) { console.log("focus to: visible modal"); }
        }   // else
        else {
            $focusElem = $form.find(".responsive-form fieldset ul li p").first().find(".textbox, .textarea, .dropdown").not('.no-focus');
            if (debugFocusElement) { console.log("focus to: first input"); }
        }   // else

        // give focus to this input... and make sure if there is text to not select it all, but place the cursor at the end of the text...
        setTimeout(function () { $focusElem.focus().val($focusElem.val()); }, 10);

    }   // SetFocusToCorrectInput

    function PopulateCountryStateByIP() {

        // attempt to populate the address by the current IP
        $.ajax({
            url: '/MyAccount/CommonControls/ResponsiveForms/Handlers/IPLocation.ashx',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null && data.status == "success") {
                    $(".dd-country .dropdown").focus().val(data.countryCode).blur().trigger("update");
                    //$(".dd-states .dropdown").focus().val(data.region).blur().trigger("update");
                    //$(".txt-zipcode .textbox").focus().val(data.zip);
                    //$(".txt-city .textbox").focus().val(data.city);
                }   // if
            }
        });

    }   // PopulateCountryStateByIP

    function PrefixPhoneWithCountryCode($form, country, isInitialPageLoad, bypass) {

        // NOTE: optional paramter "bypass" used on checkout when loading/verifying a delivery address so the phone number does not get overwritten

        // maker sure we have a valid country code
        if (country != "" && !bypass) {

            var phoneCode = "";

            $.ajax({
                type: "GET",
                url: "/MyAccount/CommonControls/ResponsiveForms/XML/country-codes.xml",
                dataType: "xml",
                success: function (xml) {
                    $(xml).find('country').each(function () {

                        // grab the country code and phone code from the xml
                        var code = $(this).attr('code'),
                            phoneCode = $(this).attr('phoneCode');

                        // if this entry is our country...
                        if (country.toUpperCase() == code) {

                            // make sure this country does not use a "1" as the phone code
                            var updatedPhone = (phoneCode == "1") ? "" : ("+" + phoneCode + " " + $form.find(".txt-phone").val());

                            // set a data attribute for optional validation later
                            $form.find(".txt-phone .textbox").data('phonecode', phoneCode);

                            if (!isInitialPageLoad) {
                                ProcessInputChange($form.find(".txt-phone"), $form.find(".txt-phone .textbox"), updatedPhone, false);
                            }   // if

                            UpdateAddressLocalStorage();

                            return false;
                        }   // if

                    }); // each
                }
            });
        }   // if

        // toggle the flag var used for the location based population of the country/state dropdown
        newFormContent = false;
        // reset the country code in the phone number logic
        bypassPhoneCountryCode = false;

    }   // PrefixPhoneNumberWithCountryCode

    function SetCountryRelatedInputStates($form, countryCode, forceRefresh) {

        // the form needs an async postback 
        if (forceRefresh) {
            $form.find(".dropdown").trigger("change");
        }   // if
        else {

            // set the country code to all lowercase
            countryCode = countryCode.toLowerCase();

            // preset the controls, to be overwritten by the following logic
            $form.find(".dd-states").hide();
            $form.find(".txt-state").show();
            $form.find(".txt-state label").text("State / Province / Region");
            $form.find(".txt-city label").text("City / Town");
            $form.find(".txt-zipcode label").text("ZIP / Postal Code");

            $form.find(".txt-phone").find("[data-validation^='req-phone']").attr("title", "Please enter your phone number.");
            $form.find(".txt-phone").find("[data-validation^='opt-phone']").attr("title", "Please enter an alternate phone number (optional).");
            $form.find(".phone-format").text("");

            // overwrite any of the presets for the specific country needs
            if (countryCode == "us" || countryCode == "usa") {
                $form.find(".dd-states").show();
                $form.find(".txt-state").hide();
                $form.find(".txt-zipcode label").text("ZIP Code");
                // set the the required phone attributes and format for US 
                $form.find(".txt-phone").find("[data-validation^='req-phone']").each(function () {
                    var $this = $(this);
                    $this.attr("title", "Please enter your phone number with area code.");
                    if ($this.val() != "") {
                        FormatUSPhoneNumber($this, $this.val(), true);
                    }   // if
                }); // each
                // set the the optional phone attributes and format for US 
                $form.find(".txt-phone").find("[data-validation^='opt-phone']").each(function () {
                    var $this = $(this);
                    $this.attr("title", "Please enter an alternate phone number (optional).");
                    if ($this.val() != "") {
                        FormatUSPhoneNumber($this, $this.val(), true);
                    }   // if
                }); // each

                $form.find(".phone-format").text("(xxx) xxx-xxxx");

            }   // if
            else if (countryCode == "au") {
                $form.find(".dd-states").show();
                $form.find(".txt-state").hide();
                $form.find(".dd-states label").text("State/Territory");
                $form.find(".txt-zipcode label").text("Postal Code");
            }
            else {
                // if this country has any states in the state drop down, show the dropdown and hide the textbox
                if ($form.find(".dd-states option").size() > 0) {
                    $form.find(".dd-states").show();
                    $form.find(".txt-state").hide();
                }   // if
            }   // else

        }   // else

    }   // SetCountryRelatedInputStates

    function ReleaseLocalStorage($form) {

        if (useSisyphus) {
            // determine if the container being passed in is the fieldset
            if ($form.is("fieldset")) {
                $form.sisyphus().manuallyReleaseData();
            }   // if
            else {
                // local storage
                $form.find("fieldset").each(function () {
                    $(this).sisyphus().manuallyReleaseData();
                });
            }   // else
        }   // if

    }   // ReleaseLocalStorage

    function ClearLocalStorage($form) {

        if (useSisyphus) {
            // clear all local storage form data
            $form.find("fieldset").each(function () {
                $(this).sisyphus().manuallyReleaseData();
            });
        }   // if
        // clear the focused input local storage
        localStorage.removeItem("focus");
        // reset focus to the form
        SetFocusToCorrectInput($form);
        // remove any failed validation elements from the screen
        HideAllValidationResults($form);

    }   // ClearLocalStorage

    function CapitalizeFirstLetter(string) {

        var returnValue = string.toLowerCase();
        var split = returnValue.split(' ');

        for (var i = 0, len = split.length; i < len; i++) {
            split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
        }

        returnValue = split.join(' ');

        return returnValue;
    }   // CapitalizeFirstLetter

    function UpdateAddressLocalStorage() {
        // hidden checkbox to trigger save of the address number fields without validation
        $("#phustrigger").attr("checked", !$("#phustrigger").attr("checked")).trigger("change");
    }   // UpdateAddressLocalStorage

    // to udpate the local storage values for content that was refreshed asynchronously, call a change event on one of the inputs that was refreshed after it has been updated
    (function ($) {

        $.fn.sisyphus = function (options) {
            var identifier = $.map(this, function (obj, i) {
                return $(obj).attr("id") + $(obj).attr("name")
            }).join();

            var sisyphus = Sisyphus.getInstance(identifier);
            if (options !== undefined) {
            	sisyphus.protect(this, options);
            }
            return sisyphus;
        };

      
        var browserStorage = {};

        /**
         * Check if local storage or other browser storage is available
         *
         * @return Boolean
         */
        browserStorage.isAvailable = function () {
            if (typeof $.jStorage === "object") {
                return true;
            }
            try {
                return localStorage.getItem;
            } catch (e) {
                return false;
            }
        };

        /**
         * Set data to browser storage
         *
         * @param [String] key
         * @param [String] value
         *
         * @return Boolean
         */
        browserStorage.set = function (key, value) {
            if (typeof $.jStorage === "object") {
                $.jStorage.set(key, value + "");
            } else {
                try {
                    localStorage.setItem(key, value + "");
                } catch (e) {
                    //QUOTA_EXCEEDED_ERR
                }
            }
        };

        /**
         * Get data from browser storage by specified key
         *
         * @param [String] key
         *
         * @return string
         */
        browserStorage.get = function (key) {
            if (typeof $.jStorage === "object") {
                var result = $.jStorage.get(key);
                return result ? result.toString() : result;
            } else {
                return localStorage.getItem(key);
            }
        };

        /**
         * Delete data from browser storage by specified key
         *
         * @param [String] key
         *
         * @return void
         */
        browserStorage.remove = function (key) {
            if (typeof $.jStorage === "object") {
                $.jStorage.deleteKey(key);
            } else {
                localStorage.removeItem(key);
            }
        };

        Sisyphus = (function () {
            var params = {
                instantiated: [],
                started: []
            };

            function init() {

                return {
                    setInstanceIdentifier: function (identifier) {
                        this.identifier = identifier
                    },

                    getInstanceIdentifier: function () {
                        return this.identifier;
                    },

                    /**
                     * Set plugin initial options
                     *
                     * @param [Object] options
                     *
                     * @return void
                     */
                    setInitialOptions: function (options) {
                        var defaults = {
                            excludeFields: [],
                            includeFields:[],
                            customKeySuffix: "",
                            locationBased: false,
                            timeout: 0,
                            autoRelease: true,
                            onSave: function () { },
                            onBeforeRestore: function () { },
                            onRestore: function () { },
                            onRelease: function () { }
                        };
                        this.options = this.options || $.extend(defaults, options);
                        this.browserStorage = browserStorage;
                    },

                    /**
                     * Set plugin options
                     *
                     * @param [Object] options
                     *
                     * @return void
                     */
                    setOptions: function (options) {
                        this.options = this.options || this.setInitialOptions(options);
                        this.options = $.extend(this.options, options);
                    },

                    /**
                     * Protect specified forms, store it's fields data to local storage and restore them on page load
                     *
                     * @param [Object] targets		forms object(s), result of jQuery selector
                     * @param Object options			plugin options
                     *
                     * @return void
                     */
                    protect: function (targets, options) {
                        this.setOptions(options);
                        targets = targets || {};
                        var self = this;
                        this.targets = this.targets || [];
                        this.href = location.hostname + location.pathname + location.search + location.hash;
                        this.targets = $.merge(this.targets, targets);
                        this.targets = $.unique(this.targets);
                        this.targets = $(this.targets);
                        if (!this.browserStorage.isAvailable()) {
                            return false;
                        }

                        var callback_result = self.options.onBeforeRestore.call(self);
                        if (callback_result === undefined || callback_result) {
                            self.restoreAllData();
                        }

                        if (this.options.autoRelease) {
                            self.bindReleaseData();
                        }

                        if (!params.started[this.getInstanceIdentifier()]) {
                            if (self.isCKEditorPresent()) {
                                var intervalId = setInterval(function () {
                                    if (CKEDITOR.isLoaded) {
                                        clearInterval(intervalId);
                                        self.bindSaveData();
                                        params.started[self.getInstanceIdentifier()] = true;
                                    }
                                }, 100);
                            } else {
                                self.bindSaveData();
                                params.started[self.getInstanceIdentifier()] = true;
                            }
                        }
                    },

                    isCKEditorPresent: function () {
                        if (this.isCKEditorExists()) {
                            CKEDITOR.isLoaded = false;
                            CKEDITOR.on('instanceReady', function () {
                                CKEDITOR.isLoaded = true;
                            });
                            return true;
                        } else {
                            return false;
                        }
                    },

                    isCKEditorExists: function () {
                        return typeof CKEDITOR != "undefined";
                    },

                    findFieldsToProtect: function (target) {
                        return target.find(":input").not(":submit").not(":reset").not(":button").not(":file").not(":password").not(":disabled").not("[readonly]");
                    },

                    /**
                     * Bind saving data
                     *
                     * @return void
                     */
                    bindSaveData: function () {
                        var self = this;

                        if (self.options.timeout) {
                            self.saveDataByTimeout();
                        }

                        self.targets.each(function () {
                            var targetFormIdAndName = $(this).attr("id") + $(this).attr("name");
                            self.findFieldsToProtect($(this)).each(function () {
                                if ($.inArray(this, self.options.excludeFields) !== -1 && $.inArray(this, self.options.includeFields) === -1) {
                                    // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                                    return true;
                                }
                                var field = $(this);
                                var prefix = self.options.customKeySuffix + field.attr("name");
                                if (field.is(":text") || field.is("textarea")) {
                                    if (!self.options.timeout) {
                                        self.bindSaveDataImmediately(field, prefix);
                                    }
                                }
                                self.bindSaveDataOnChange(field);
                            });
                        });
                    },

                    /**
                     * Save all protected forms data to Local Storage.
                     * Common method, necessary to not lead astray user firing 'data is saved' when select/checkbox/radio
                     * is changed and saved, while text field data is saved only by timeout
                     *
                     * @return void
                     */
                    saveAllData: function () {
                        var self = this;
                        self.targets.each(function () {
                            var targetFormIdAndName = $(this).attr("id") + $(this).attr("name");
                            var multiCheckboxCache = {};

                            self.findFieldsToProtect($(this)).each(function () {
                                var field = $(this);
                                if (($.inArray(this, self.options.excludeFields) !== -1 && $.inArray(this, self.options.includeFields) === -1 )|| field.attr("name") === undefined) {
                                    // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                                    return true;
                                }
                                var prefix = self.options.customKeySuffix + field.attr("name");
                                var value = field.val();

                                if (field.is(":checkbox")) {
                                    if (field.attr("name").indexOf("[") !== -1) {
                                        if (multiCheckboxCache[field.attr("name")] === true) {
                                            return;
                                        }
                                        value = [];
                                        $("[name='" + field.attr("name") + "']:checked").each(function () {
                                            value.push($(this).val());
                                        });
                                        multiCheckboxCache[field.attr("name")] = true;
                                    } else {
                                        value = field.is(":checked");
                                    }
                                    self.saveToBrowserStorage(prefix, value, false);
                                } else if (field.is(":radio")) {
                                    if (field.is(":checked")) {
                                        value = field.val();
                                        self.saveToBrowserStorage(prefix, value, false);
                                    }
                                } else {
                                    if (self.isCKEditorExists()) {
                                        var editor;
                                        if (editor = CKEDITOR.instances[field.attr("name")] || CKEDITOR.instances[field.attr("id")]) {
                                            editor.updateElement();
                                            self.saveToBrowserStorage(prefix, field.val(), false);
                                        } else {
                                            self.saveToBrowserStorage(prefix, value, false);
                                        }
                                    } else {
                                        self.saveToBrowserStorage(prefix, value, false);
                                    }
                                }
                            });
                        });
                        self.options.onSave.call(self);
                    },

                    /**
                     * Restore forms data from Local Storage
                     *
                     * @return void
                     */
                    restoreAllData: function () {
                        var self = this;
                        var restored = false;

                        self.targets.each(function () {
                            var target = $(this);
                            var targetFormIdAndName = $(this).attr("id") + $(this).attr("name");

                            self.findFieldsToProtect(target).each(function () {
                                if ($.inArray(this, self.options.excludeFields) !== -1 && $.inArray(this, self.options.includeFields) === -1) {
                                    // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                                    return true;
                                }
                                var field = $(this);
                                var prefix = self.options.customKeySuffix + field.attr("name");
                                var resque = self.browserStorage.get(prefix);
                                if (resque !== null) {
                                    self.restoreFieldsData(field, resque);
                                    restored = true;
                                }
                            });
                        });

                        if (restored) {
                            self.options.onRestore.call(self);
                        }
                    },

                    /**
                     * Restore form field data from local storage
                     *
                     * @param Object field		jQuery form element object
                     * @param String resque	 previously stored fields data
                     *
                     * @return void
                     */
                    restoreFieldsData: function (field, resque) {

                        if (field.attr("name") === undefined) {
                            return false;
                        }
                        if (field.is(":checkbox") && resque !== "false" && field.attr("name").indexOf("[") === -1) {
                            field.attr("checked", "checked");
                        }
                        else if (field.is(":checkbox") && resque === "false" && field.attr("name").indexOf("[") === -1) {
                            field.removeAttr("checked");
                        }
                        else if (field.is(":radio")) {
                            if (field.val() === resque) {
                                field.attr("checked", "checked");
                            }
                        }
                        else if (field.attr("name").indexOf("[") === -1) {
                            // make sure there is no initial value being populated from the server, before overwriting the form input
                            // override this action by adding the "data-override-server" attribute
                            if (field.val() == "" || field.attr("data-override-server") == "true") { field.val(resque); }
                        }
                        else {
                            resque = resque.split(",");
                            field.val(resque);
                        }
                    },

                    /**
                     * Bind immediate saving (on typing/checking/changing) field data to local storage when user fills it
                     *
                     * @param Object field		jQuery form element object
                     * @param String prefix	 prefix used as key to store data in local storage
                     *
                     * @return void
                     */
                    bindSaveDataImmediately: function (field, prefix) {
                        var self = this;
                        if ('onpropertychange' in field) {
                            field.get(0).onpropertychange = function () {
                                self.saveToBrowserStorage(prefix, field.val());
                            };
                        } else {
                            field.get(0).oninput = function () {
                                self.saveToBrowserStorage(prefix, field.val());
                            };
                        }
                        if (this.isCKEditorExists()) {
                            var editor;
                            if (editor = CKEDITOR.instances[field.attr("name")] || CKEDITOR.instances[field.attr("id")]) {
                                editor.document.on('keyup', function () {
                                    editor.updateElement();
                                    self.saveToBrowserStorage(prefix, field.val());
                                });
                            }
                        }
                    },

                    /**
                     * Save data to Local Storage and fire callback if defined
                     *
                     * @param String key
                     * @param String value
                     * @param Boolean [true] fireCallback
                     *
                     * @return void
                     */
                    saveToBrowserStorage: function (key, value, fireCallback) {
                        // if fireCallback is undefined it should be true
                        fireCallback = fireCallback === undefined ? true : fireCallback;
                        this.browserStorage.set(key, value);
                        if (fireCallback && value !== "") {
                            this.options.onSave.call(this);
                        }
                    },

                    /**
                     * Bind saving field data on change
                     *
                     * @param Object field		jQuery form element object
                     *
                     * @return void
                     */
                    bindSaveDataOnChange: function (field) {
                        var self = this;
                        field.change(function () {
                            self.saveAllData();
                            //console.log('saved' + field.attr('id'));
                        });
                    },

                    /**
                     * Saving (by timeout) field data to local storage when user fills it
                     *
                     * @return void
                     */
                    saveDataByTimeout: function () {
                        var self = this;
                        var targetForms = self.targets;
                        setTimeout((function () {
                            function timeout() {
                                self.saveAllData();
                                setTimeout(timeout, self.options.timeout * 1000);
                            }
                            return timeout;
                        })(targetForms), self.options.timeout * 1000);
                    },

                    /**
                     * Bind release form fields data from local storage on submit/reset form
                     *
                     * @return void
                     */
                    bindReleaseData: function () {
                        var self = this;
                        self.targets.each(function () {
                            var target = $(this);
                            var formIdAndName = target.attr("id") + target.attr("name");
                            $(this).bind("submit reset", function () {
                                self.releaseData(formIdAndName, self.findFieldsToProtect(target));
                            });
                        });
                    },

                    /**
                     * Manually release form fields
                     *
                     * @return void
                     */
                    manuallyReleaseData: function () {
                    	var self = this;
                    	if (!!self.targets) {
                    		self.targets.each(function () {
                    			var target = $(this);
                    			var formIdAndName = target.attr("id") + target.attr("name");
                    			self.releaseData(formIdAndName, self.findFieldsToProtect(target));
                    		});
                    	}
                    },

                    /**
                     * Bind release form fields data from local storage on submit/resett form
                     *
                     * @param String targetFormIdAndName	a form identifier consists of its id and name glued
                     * @param Object fieldsToProtect		jQuery object contains form fields to protect
                     *
                     * @return void
                     */
                    releaseData: function (targetFormIdAndName, fieldsToProtect) {
                        var released = false;
                        var self = this;

                        // Released form, are not started anymore. Fix for ajax loaded forms.
                        params.started[self.getInstanceIdentifier()] = false;

                        fieldsToProtect.each(function () {
                            if ($.inArray(this, self.options.excludeFields) !== -1 && $.inArray(this, self.options.includeFields) === -1) {
                                // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                                return true;
                            }
                            var field = $(this);
                            var prefix = self.options.customKeySuffix + field.attr("name");
                            self.browserStorage.remove(prefix);
                            released = true;
                        });

                        if (released) {
                            self.options.onRelease.call(self);
                        }
                    }

                };
            }

            return {
                getInstance: function (identifier) {
                    if (!params.instantiated[identifier]) {
                        params.instantiated[identifier] = init();
                        params.instantiated[identifier].setInstanceIdentifier(identifier);
                        params.instantiated[identifier].setInitialOptions();
                    }
                    if (identifier) {
                        return params.instantiated[identifier];
                    }
                    return params.instantiated[identifier];
                },

                free: function () {
                    params = {
                        instantiated: [],
                        started: []
                    };
                    return null;
                },
                version: '1.1.107'
            };
        })();
    })(jQuery);

