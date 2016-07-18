//  ====================================================================================================
//  Responsive Form Validation Library 
//  ====================================================================================================

/*
    req-field
    req-selection
    req-checked
    req-checked-list
    req-price
    req-number
    opt-number
    req-upc
    req-isbn
    req-phone
    opt-phone
    req-phone-us
    opt-phone-us
    req-phone-bycountry
    opt-phone-bycountry
    req-address1
    opt-address2
    req-zipcode
    req-cvv
    req-creditcard
    req-email
    opt-email
    req-multi-email
    opt-multi-email
    req-email-newaccount
    req-ssn
    req-url
    req-date
    req-date-mm-dd-yy
    req-expyear
    req-dateddl-gt
    req-email1
    req-email2
    req-password1
    req-password2
    req-search

*/

//  ====================================================================================================
//  Global
//  ====================================================================================================

    // Debugging
    var instantValidationDebug = false,
        submitValidationDebug = false,
        showJSONAddressData = false;

    // address flags
    var addressCertified = false;
    var jsonCertifiedAddress = { addressline1: "", city: "", state: "", zipCode: "", country: "" };

    // catch browsers that don't support the console object
    if (!window.console) console = { log: function () { } };

//  ====================================================================================================
//  Input Validation Algorithms
//  ====================================================================================================

    function CheckInputValue($mask, $input, value, validationType, def, isFormSubmit) {

        var $parentForm = $input.closest(".responsive-form");

        // validate
        switch (validationType) {
            //  =======================================================
            //  === VAL TYPE: Required field
            //  === REQUIRMENTS: not null
            //  === Data-Validation(s): "req-field"
            //  =======================================================

            case "req-field":
                def.resolve(!IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Required Drop Down Selection
                //  === REQUIRMENTS: not null or not zero
                //  === SUPPORTED Data-Validation: "req-selection"
                //  =======================================================

            case "req-selection":

                def.resolve(!IsNoSelection(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Checkbox/Radio Button field
                //  === REQUIRMENTS: checked
                //  === SUPPORTED Data-Validation: "req-checked"
                //  =======================================================

            case "req-checked":

                def.resolve(!$input.is(":checked"));
                break;

                //  =======================================================
                //  === VAL TYPE: Checkbox/Radio Button List fields
                //  === REQUIRMENTS: at least one input checked
                //  === Data-Validation(s): "req-checked-list"
                //  =======================================================

            case "req-checked-list":

                def.resolve(!$input.find("input:checked").size());
                break;

                //  =======================================================
                //  === VAL TYPE: Price field
                //  === REQUIRMENTS: not null, valid number, greater than zero, or "N/A"
                //  === Data-Validation(s): "req-price"
                //  =======================================================

            case "req-price":
                if ($input.hasClass("format-price")){
                    value = value.replace(/[^.0-9]/g, '');
                    $input.val('$' + parseFloat(value).toFixed(2));
                }
                def.resolve(!IsPrice(value) || !IsNotZero(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Price field
                //  === REQUIRMENTS: not null, valid number, greater than or equal to a minimum number, or "N/A"
                //  === SUPPORTED CLASSES: "req-price-min"
                //  === requires attribute: data-minprice="10"
                //  =======================================================

            case "req-price-min":
                var enteredPriceText = value.replace(/[^.0-9]/g, ""),
                    enteredPrice = parseFloat(enteredPriceText),
                    minPrice = $input.attr("data-minprice");

                $input.val('$' + enteredPrice);

                def.resolve(!IsNotEmpty(enteredPrice) || !IsNumber(enteredPrice) || enteredPrice < minPrice);
                break;

                //  =======================================================
                //  === VAL TYPE: Price field
                //  === REQUIRMENTS: valid number, greater than zero, or "N/A" and within range
                //	=== Data-Validation(s): "req-price-range"
                //  === SUPPORTED CLASSES: " req-price-top, req-price-bottom"
                //  =======================================================

            case "req-price-range":
                var showDollar = "$";
                if ($input.hasClass("format-price")) {
                    value = value.replace(/[^.0-9]/g, '');
                    $input.val('$' + parseFloat(value).toFixed(2));
                }

            case "req-number-range":
                var isNumber = IsNumber(value),
                    topPriceText = ($input.closest(':has(.req-price-top)').find('.req-price-top').text()).replace(/[^.0-9]/g, ''),
                    topPrice = parseFloat(topPriceText),
                    bottomPriceText = ($input.closest(':has(.req-price-bottom)').find('.req-price-bottom').text()).replace(/[^.0-9]/g, ''),
                    bottomPrice = parseFloat(bottomPriceText),
                    enteredPriceText = value.replace(/[^.0-9]/g, ''),
                    enteredPrice = parseFloat(enteredPriceText),
					dollar = showDollar || "",
                    returnValue = false;
					
                if (value != "N/A" && (!isNumber || value <= 0)) {
        			
                    returnValue = true;
                    $mask.attr('data-warning-override', 'Please enter a valid amount.');

                }
                else if (!isNaN(topPrice) && topPrice < enteredPrice) {
                    returnValue = true;
                    $mask.attr('data-warning-override', 'Please enter an amount less than or equal to ' + dollar + topPrice + '.');
                }
                else if (!isNaN(bottomPrice) && bottomPrice > enteredPrice) {
        			
                    returnValue = true;
                    $mask.attr('data-warning-override', 'Please enter an amount more than ' + dollar + bottomPrice + '.');
                }
                def.resolve(returnValue);
                break;


            case "req-number":
                if (!IsNotEmpty(value)) {

                    $mask.removeAttr('data-warning-override');
                }
                else {
                    $mask.attr('data-warning-override', $mask.attr('title') + ' (Must be a valid number)');
                }

                def.resolve(!IsWholeNumber(value) || !IsNumber(value) || !IsNotZero(value));
                break;

                //  =======================================================
                //  === VAL TYPE:  Number field
                //  === REQUIRMENTS: valid number, greater than zero, less than 3
                //  === Data-Validation(s): "req-three"
                //  =======================================================
                
            case "req-three":

                def.resolve(!IsWholeNumber(value) || !IsNumber(value) || parseInt(value) < 0 || parseInt(value) > 3 );
                break;

                //  =======================================================
                //  === VAL TYPE:  Number field
                //  === REQUIRMENTS: valid number, greater than zero
                //  === Data-Validation(s): "opt-number"
                //  =======================================================

            case "opt-number":

                def.resolve(IsNotEmpty(value) && (!IsWholeNumber(value) || !IsNumber(value) ));
                break;

                //  =======================================================
                //  === VAL TYPE:  UPC field
                //  === REQUIRMENTS: not null, valid number, 11 or 12 digits
                //  === Data-Validation(s): "req-upc"
                //  =======================================================

            case "req-upc":

                def.resolve(!IsWholeNumber(value) || !IsNumber(value) || (value.length != 11 && value.length != 12));
                break;

                //  =======================================================
                //  === VAL TYPE:  UPC field
                //  === REQUIRMENTS: not null, valid number, 13 digits 
                //  === Data-Validation(s): "req-upc"
                //  =======================================================
            case "opt-isbn":
                if (value == "") {
                    def.resolve(false);
                }
            case "req-isbn":
                value = value.replace("-", "");
                def.resolve(!IsWholeNumber(value) || !IsNumber(value) || !IsISBN(value));
                break;

                //  =======================================================
                //  === VAL TYPE:  Phone Number field
                //  === REQUIRMENTS: not null, valid phone number
                //  === Data-Validation(s): "req-phone"
                //  =======================================================

            case "req-phone":

                FormatUSPhoneNumber($input, value, false);
                def.resolve((!IsPhoneNumber(value) && !IsInternationalPhoneNumber(value)) || !IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE:  Optional Phone Number field
                //  === REQUIRMENTS: valid phone number
                //  === Data-Validation(s): "opt-phone"
                //  =======================================================

            case "opt-phone":

                FormatUSPhoneNumber($input, value, false);
                def.resolve(!IsPhoneNumber(value) && !IsInternationalPhoneNumber(value) && IsNotEmpty(value));
                break;

            //  =======================================================
            //  === VAL TYPE:  US Phone Number field
            //  === REQUIRMENTS: not null, valid US phone number
            //  === Data-Validation(s): "req-phone-us"
            //  =======================================================

            case "req-phone-us":

                FormatUSPhoneNumber($input, value, true);
                def.resolve(!IsUSPhoneNumber(value) || !IsNotEmpty(value));
                break;

            //  =======================================================
            //  === VAL TYPE:  Optional US Phone Number field
            //  === REQUIRMENTS: valid US phone number
            //  === Data-Validation(s): "opt-phone-us"
            //  =======================================================

            case "opt-phone-us":

                FormatUSPhoneNumber($input, value, false);
                def.resolve(!IsUSPhoneNumber(value) && IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE:  Phone Number field by country value
                //  === REQUIRMENTS: not null, valid phone number by country
                //  === Data-Validation(s): "req-phone-bycountry"
                //  =======================================================

            case "req-phone-bycountry":

                FormatUSPhoneNumber($input, value, false);
                def.resolve(IsPhoneNumberByCountry(value, $parentForm.find(".dd-country select").val().toLowerCase()) || !IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE:  Optional Phone Number field by country value
                //  === REQUIRMENTS: not null, valid phone number by country
                //  === Data-Validation(s): "req-phone-bycountry"
                //  =======================================================

            case "opt-phone-bycountry":

                FormatUSPhoneNumber($input, value, false);
                def.resolve(IsPhoneNumberByCountry(value, $parentForm.find(".dd-country select").val().toLowerCase()) && IsNotEmpty(value) && value != "+" + $input.data('phonecode'));
                break;

            //  =======================================================
            //  === VAL TYPE:  Address1 field
            //  === REQUIRMENTS: valid add from UPS web API
            //  === Data-Validation(s): "req-address1"
            //  =======================================================

            case "req-address1":

                var jsonCurrentAddress = { addressline1: $parentForm.find(".txt-address1 .textbox").val(), city: $parentForm.find(".txt-city .textbox").val(), state: $parentForm.find(".dd-states .dropdown").val(), zipCode: $parentForm.find(".txt-zipcode .textbox").val(), country: $parentForm.find(".dd-country .dropdown").val() };
                    
                // if the zip code is empty, fail
                if (!IsNotEmpty(value)) {
                    def.resolve(true);
                }   // if

                // if the address has been certified to be correct, even though UPS said otherwise...pass
                else if (CertifiedAddressMatches(jsonCurrentAddress))
                {
                    def.resolve(false);
                }   // else if

                else {

                    // get the values for the current zip code and country code
                    var countryCode = $parentForm.find(".dd-country .dropdown").val();

                    // make sure we have a valid country code and valid ZIP code before checking for city/state population and only perform this check on form submit
                    if (countryCode == "US" && isFormSubmit) {

                        // build the json request
                        var jsonData = { testing: false, companyname: $parentForm.find(".txt-company .textbox").val(), addressline1: $parentForm.find(".txt-address1 .textbox").val(), addressline2: $parentForm.find(".txt-address2 .textbox").val(), city: $parentForm.find(".txt-city .textbox").val(), state: $parentForm.find(".dd-states .dropdown").val(), zipCode: $parentForm.find(".txt-zipcode .textbox").val(), country: $parentForm.find(".dd-country .dropdown").val() },
                            addressString = $parentForm.find(".txt-address1 .textbox").val() + " " + $parentForm.find(".txt-address2 .textbox").val() + " " + $parentForm.find(".txt-city .textbox").val() + " " + $parentForm.find(".dd-states .dropdown").val() + " " + $parentForm.find(".txt-zipcode .textbox").val();

                        // debug console output
                        if (showJSONAddressData) { console.log(jsonData); }

                        // send the json request to the handler
                        $.ajax({
                            url: '/MyAccount/CommonControls/ResponsiveForms/Handlers/UPSAddressValidationStreetLevel.ashx',
                            type: 'POST',
                            data: JSON.stringify(jsonData),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {

                                // the json in values produced json out values
                                if (data != undefined && data.Response != undefined) {

                                    // assign the response objects
                                    var dataResponse = data.Response,
                                        dataAddressClassification = data.AddressClassification,
                                        dataAddressKeyFormats = data.AddressKeyFormats,
                                        dataAddressIndicator = data.AddressIndicator;

                                    // debug console output
                                    if (showJSONAddressData) { console.log(data); }

                                    // a response has been returned, but check to see if it is an error response 
                                    if (dataResponse.ResponseStatusDescription == "Failure") {
                                        // something went wrong, pass by default?
                                        def.resolve(false);
                                    }   // if
                                    else {

                                        // LOGIC:
                                        // ---------------------------------------------------------------------------------------------------------------------
                                        // If there are no address responses:
                                        //      - ask to verify their address is correct or change the address

                                        // If there is one address response:
                                        //      - update the address with the response address
                                        //      - pass

                                        // If there is more than one address response:
                                        //      - ask to choose from one of the response addresses, verify their address is correct, or change the address
                                        // ---------------------------------------------------------------------------------------------------------------------

                                        var bypassResultsModal = (typeof placeOrder !== 'undefined' && placeOrder);

                                        // there are no address response matches
                                        if (dataAddressKeyFormats.length == 0) {

                                            // before we show the modal for no matches, let's make sure we have all the information needed for a full address...
                                            if (!bypassResultsModal && $.trim(jsonData.addressline1) != "" && $.trim(jsonData.city) != "" && $.trim(jsonData.state) != "" && $.trim(jsonData.zipCode) != "") {
                                                // show the address results modal with the appropriate message
                                                BuildAddressResultsModal($parentForm.find(".txt-address1 .textbox").attr("id"), "none", addressString);
                                            }   // if

                                            // fail
                                            def.resolve(true);
                                        }   //if

                                        // there is an exact match -> auto populate the other address fields
                                        else if (dataAddressKeyFormats.length == 1) {

                                            // Address:     255 Hupi Rd Monterey, Ma 01245
                                            // UPS Returns: 1-99 Hupi Rd Monterey, Ma 01245
                                            // Issue:       Since there was only 1 match, we were assuming it was an exact match and auto updating the street address incorrectly.
                                            // Solution:    Check to make sure the address returned by UPS api does not start with "1-" for street number ranges. If it does, move forward
                                            //              with the user submitted address and do not overwrite automatically.
                                            if (dataAddressKeyFormats[0].AddressLine1.lastIndexOf("1-", 0) !== 0) {
                                                $parentForm.find(".txt-address1 .textbox").val(CapitalizeFirstLetter(dataAddressKeyFormats[0].AddressLine1)).trigger("change");
                                            }
                                            // make sure UPS was actually returning address2 value before setting...
                                            if (dataAddressKeyFormats[0].AddressLine2 != "") {
                                                $parentForm.find(".txt-address2 .textbox").val(CapitalizeFirstLetter(dataAddressKeyFormats[0].AddressLine2)).trigger("change");
                                            }   // if
                                            $parentForm.find(".txt-city .textbox").val(CapitalizeFirstLetter(dataAddressKeyFormats[0].PoliticalDivision2)).trigger("change");
                                            $parentForm.find(".dd-states .dropdown").focus().val(dataAddressKeyFormats[0].PoliticalDivision1).blur().trigger("update");
                                            $parentForm.find(".txt-zipcode .textbox").val(dataAddressKeyFormats[0].PostcodePrimaryLow);

                                            $parentForm.find(".txt-zipcode label").addClass("inputted");
                                            $parentForm.find(".txt-city label").addClass("inputted");

                                            // pass
                                            def.resolve(false);

                                        }   // if
                                        
                                        // there are multiple addresses responses
                                        else {

                                            var fullAddresses = [],
                                            tempAddresses = [],
                                            distinctAddress = [],
                                            passingAddress = false;

                                            // construct the address values and push into a temp array
                                            $.each(dataAddressKeyFormats, function (index, value) {
                                                fullAddresses.push(CapitalizeFirstLetter(dataAddressKeyFormats[index].AddressLine1) + ", " + CapitalizeFirstLetter(dataAddressKeyFormats[index].PoliticalDivision2) + " " + dataAddressKeyFormats[index].PoliticalDivision1 + " " + CapitalizeFirstLetter(dataAddressKeyFormats[index].PostcodePrimaryLow));
                                            }); // each

                                            // make sure we have unique addresses, because there could be street number/apt number groups
                                            $.each(fullAddresses, function (i, el) {
                                                if ($.inArray(el, tempAddresses) === -1) {
                                                    tempAddresses.push(el);
                                                    dataAddressKeyFormats[i].fullAddress = fullAddresses[i];
                                                    distinctAddress.push(dataAddressKeyFormats[i]);
                                                }   // if
                                            }); // each

                                            // show the address results modal with the appropriate message, as long as this is not a validation from an placed order
                                            if (!bypassResultsModal) {
                                                BuildAddressResultsModal($parentForm.find(".txt-address1 .textbox").attr("id"), "multiple", addressString, distinctAddress);
                                            }   // if

                                            // fail
                                            def.resolve(true);
                                        }   // else



                                    }   // else
                                }   // if
                            },
                            fail: function (data) {
                                // hide the loading images for the city/state, since there was no return data
                                $parentForm.find(".txt-city, .txt-state, .dd-states").find(".input-loading").hide();
                                // pass the validation since there was an error getting the JSON
                                def.resolve(false);
                            } // $.ajax() Fail.error(function () {
                        }); // ajax

                    }   // if
                    else {
                        // no address validation for non-US countries...
                        def.resolve(false);
                    }   // else
                }   // else

                break;

            //  =======================================================
            //  === VAL TYPE:  Address2 field
            //  === REQUIRMENTS: valid apartment / suite/ building #
            //  === Data-Validation(s): "opt-address2"
            //  === https://developerkitcommunity.ups.com/index.php/Address_Validation_Street_Level_XML_Developers_Guide_-_July_9,_2011
            //  =======================================================

            case "opt-address2":

                // only perform address line 2 validation if this is in the US
                if ( !IsNonUSCountry($input) && $("#bypassed-" + $input.attr("id")).size() == 0) {
                    // grab the parts of the address
                    var inAddress1 = $.trim($parentForm.find(".txt-address1 .textbox").val()),
                        inAddress2 = $.trim($parentForm.find(".txt-address2 .textbox").val()),
                        inCity = $.trim($parentForm.find(".txt-city .textbox").val()),
                        useStateDD = $parentForm.find(".dd-states").css("display") != "none",
                        inState = useStateDD ? $parentForm.find(".dd-states .dropdown").val() : $.trim($parentForm.find(".txt-state .textbox").val()),
                        inZip = $.trim($parentForm.find(".txt-zipcode .textbox").val());

                    // make sure we have a complete address so we can validate the address2 line
                    if (inAddress1 != "" && inCity != "" && inState != "" && inZip != "") {

                        var addressXML = "<address><addressline1>" + inAddress1 + "</addressline1><addressline2>" + inAddress2 + "</addressline2><city>" + inCity + "</city><state>" + inState + "</state><zip>" + inZip + "</zip></address>",
                            $loadingImg = $input.parent().find(".input-loading"),
                            isMissingApartment = false;

                        ShowLoadingImage($mask, $input, $loadingImg);

                        // call the satori web service
                        $.ajax({
                            type: "POST",
                            url: "/AVLUtilities/AddressVerification.aspx",
                            contentType: "text/xml",
                            dataType: "text",
                            data: addressXML,
                            success: function (msg) {
                                $loadingImg.fadeOut(100, function () {
                                    // parse the ml response
                                    var xmlDoc = $.parseXML(msg),
                                        $xml = $(xmlDoc),
                                        missingApt = $xml.find("ismissingaptnumber");
                                    // assign the return value for the missing apartment number
                                    if (missingApt != null && missingApt != "") {
                                        // determine if the address is missing an apartment number
                                        isMissingApartment = missingApt.text().toLowerCase() === "true";
                                        // if the missing apratment is true, flag so we let this go next time around
                                        if (isMissingApartment) { address2Flagged = true; }
                                        // send back the value
                                        def.resolve(isMissingApartment);
                                    }   // if
                                    else {
                                        def.resolve(false);
                                    }   // else
                                }); // fadeOut
                            },
                            error: function (msg) {
                                $loadingImg.hide();
                                def.resolve(false);
                            }
                        });
                    }   // if
                    else {
                        // not enough addres information to test the address2 data
                        def.resolve(false);
                    }   // else
                }   // if
                else {
                    def.resolve(false);
                }   // else

                break;

                //  =======================================================
                //  === VAL TYPE: Zipcode field
                //  === REQUIRMENTS: not null, correct zipcode format, valid in US verified by UPS API
                //  === Data-Validation(s): "req-zipcode"
                //  === https://developerkitcommunity.ups.com/index.php/Address_Validation_XML_Developers_Guide_-_July_08,_2013
                //  =======================================================

            case "req-zipcode":

                // if the zip code is empty, fail
                if (!IsNotEmpty(value) || (/[\/\\\"?&.*:<>|@#%,]/g).test(value)) {
                    def.resolve(true)
                }   // if

                else {

                    // get the values for the current zip code and country code
                    var countryCode = $parentForm.find(".dd-country .dropdown").val();

                    // make sure we have a valid country code and valid ZIP code before checking for city/state population
                    if (countryCode == "US") {

                        // only for realtime validation...
                        if (!isFormSubmit) {
                            // display the loading images for the city/state inputs 
                            $parentForm.find(".txt-city, .txt-state, .dd-states").find(".input-loading").show();
                        }   // if

                        // build the json request
                        var jsonData = { testing: false, country: $parentForm.find(".dd-country .dropdown").val(), zipCode: value };

                        // debug console output
                        if (showJSONAddressData) { console.log(jsonData); }

                        // send the json request to the handler
                        $.ajax({
                            url: '/MyAccount/CommonControls/ResponsiveForms/Handlers/UPSAddressValidationCityStateZIP.ashx',
                            type: 'POST',
                            data: JSON.stringify(jsonData),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {

                                // the json in values produced json out values
                                if (data != undefined && data.Response != undefined) {

                                    // assign the two main objects: response details and address result(s)
                                    var dataResponse = data.Response,
                                        dataAVResults = data.AddressValidationResults;

                                    // debug console output
                                    if (showJSONAddressData) { console.log(dataResponse); }   // if

                                    // a response has been returned, but check to see if it is an error response 
                                    if (dataResponse.ResponseStatusDescription == "Failure") {

                                        // hide any failed validation display for the city / state since there is a failure
                                        DisplayValidationResult($parentForm.find(".txt-city"), $parentForm.find(".txt-city .textbox"), false, isFormSubmit)
                                        DisplayValidationResult($parentForm.find(".dd-states"), $parentForm.find(".dd-states .dropdown"), false, isFormSubmit)

                                        // only for realtime validation...
                                        if (!isFormSubmit) {
                                            // hide the loading images for the city/state, since there was no return data
                                            $parentForm.find(".txt-city, .txt-state, .dd-states").find(".input-loading").hide();
                                        }   // if

                                        // we know these error codes result from an invalid zip code
                                        if (dataResponse.ErrorCode == "101112" || dataResponse.ErrorCode == "20008") {
                                            // UPS telling us that this postal code is invalid
                                            def.resolve(true);
                                        }   // if
                                        // all other error codes cannot be determined for pass/fail, so pass by default
                                        else {
                                            def.resolve(false);
                                        }
                                    }   // if
                                    else {

                                        // debug console output
                                        if (showJSONAddressData) {
                                            $.each(dataAVResults, function (index, value) {
                                                console.log(dataAVResults[index]);
                                            }); // each
                                        }   // if

                                        // only for realtime validation...
                                        if (!isFormSubmit) {
                                            // hide the loading images for the state laoder
                                            $parentForm.find(".txt-state .input-loading, .dd-states .input-loading").fadeOut(100);

                                            // hide the loading images for the city/state
                                            $parentForm.find(".txt-city .input-loading").fadeOut(100, function () {

                                                if (dataAVResults.length > 0) {
                                                    // we will assume that the first result will have the more likely state option (cannot do anything else since this is already a drop down)
                                                    var upsState = dataAVResults[0].StateProvinceCode;

                                                    // hide any failed validation display for the state
                                                    DisplayValidationResult($parentForm.find(".dd-states"), $parentForm.find(".dd-states .dropdown"), false, isFormSubmit)

                                                    // make sure there is a city response
                                                    if (dataAVResults[0].City != "") {
                                                        // assign the city to the textbox value since there is only one result
                                                        if (dataAVResults.length == 1) {
                                                            $parentForm.find(".txt-city .textbox").val(CapitalizeFirstLetter(dataAVResults[0].City));
                                                            // hide any failed validation display for the city
                                                            DisplayValidationResult($parentForm.find(".txt-city"), $parentForm.find(".txt-city .textbox"), false, isFormSubmit)
                                                        }   // if
                                                            // assign the cityresults to the textbox autocomplete plugin since there is more than one result
                                                        else {

                                                            var cities = new Array(),
                                                                cityAlreadyPresent = false;

                                                            // pull out the city values and push into a temp array
                                                            $.each(dataAVResults, function (index, value) {
                                                                cities[index] = CapitalizeFirstLetter(dataAVResults[index].City);
                                                                // if the the city currently set as the city value is in the array, do not clear the value
                                                                if (dataAVResults[index].City.toLowerCase() == $.trim($parentForm.find(".txt-city .textbox").val()).toLowerCase()) {
                                                                    cityAlreadyPresent = true;
                                                                }   // if
                                                            }); // each

                                                            // clear the current city value, if exists, since it is not in the returned city array
                                                            if (!cityAlreadyPresent) {
                                                                $parentForm.find(".txt-city .textbox").val("");
                                                                // reset the label
                                                                $parentForm.find(".txt-city").find("label").removeClass("inputted");
                                                            }   // if

                                                            $parentForm.find(".txt-city .textbox").autocomplete({
                                                                position: { my: "left top", at: "left bottom-1", of: $parentForm.find(".txt-city") },
                                                                delay: 0,
                                                                source: cities,
                                                                minLength: 0,
                                                                select: function (event, ui) {
                                                                    var $this = $parentForm.find(".txt-city .textbox");
                                                                    // set the sibling label as inputted
                                                                    $this.parent().find("label").addClass("inputted");
                                                                    // hide any failed validation display for the city
                                                                    DisplayValidationResult($parentForm.find(".txt-city"), $parentForm.find(".txt-city .textbox"), false, isFormSubmit)
                                                                },   // onSelect
                                                                close: function (event, ui) {
                                                                    // trigger the local storage save...
                                                                    $parentForm.find(".txt-city .textbox").trigger("change");
                                                                }
                                                            })
                                                            .on("focus", function () {
                                                                if ($(this).hasClass("ui-autocomplete-input")) {
                                                                    $(this).autocomplete("search", "");
                                                                }   // if
                                                            });


                                                        }   // else
                                                    }   // if

                                                    // assign the state
                                                    // make sure there is a state textbox and it is currently displayed
                                                    if ($parentForm.find(".txt-state").size() > 0 && $parentForm.find(".txt-state").css("display") != "none") {
                                                        // for the state's textbox
                                                        $parentForm.find(".txt-state .textbox").val(upsState);
                                                        // remove the warning note if it exists
                                                        DisplayValidationResult($parentForm.find(".txt-state"), $parentForm.find(".txt-state .textbox"), false, isFormSubmit)
                                                    }   // if
                                                    else {
                                                        // for the state's drop down...
                                                        // update the custom dropdown control
                                                        $parentForm.find(".dd-states select").val(upsState).trigger("update");
                                                        // remove the warning note if it exists
                                                        DisplayValidationResult($parentForm.find(".dd-states"), $parentForm.find(".dd-states .dropdown"), false, isFormSubmit)

                                                    }   // else

                                                    // update the label states for the address fieldset
                                                    InitFormLabels($("#address-container"));

                                                    // return with passed validation
                                                    def.resolve(false);
                                                }   // if
                                                else {
                                                    def.resolve(true);
                                                }
                                            }); // fadeOut
                                        }   // if

                                        // form submission validation with passed validation
                                        else {
                                            def.resolve(false);
                                        }   // else

                                    }   // else
                                }   // if

                                // no data was returned so we cannot validate at this time, so pass validation :(
                                else {

                                    // debug console output
                                    if (showJSONAddressData) { console.log(data); }   // if

                                    // only for realtime validation...
                                    if (!isFormSubmit) {
                                        // hide the loading images for the city/state, since there was no return data
                                        $parentForm.find(".txt-city, .txt-state, .dd-states").find(".input-loading").hide();
                                    }   // if

                                    def.resolve(false);

                                }   // else
                            },
                            fail: function (data) {
                                // hide the loading images for the city/state, since there was no return data
                                $parentForm.find(".txt-city, .txt-state, .dd-states").find(".input-loading").hide();
                                // pass the validation since there was an error getting the JSON
                                def.resolve(false);
                            } // $.ajax() Fail.error(function () {
                        }); // ajax

                    }   // if
                    else {
                        // Not a US or PR zip code address, check for general validatin
                        def.resolve(false);
                    }   // else
                }   // else

                break;

                //  =======================================================
                //  === VAL TYPE: CVV field
                //  === REQUIRMENTS: not null, positive integer number, either 3 or 4 digits
                //  === Data-Validation(s): "req-cvv"
                //  =======================================================

            case "req-cvv":

                def.resolve(!IsNotEmpty(value) || !IsNumber(value) || value.length < 3 || value.length > 4);
                break;

                //  =======================================================
                //  === VAL TYPE: Credit Card field
                //  === REQUIRMENTS: not null, LUHN test (http://en.wikipedia.org/wiki/Luhn)
                //  === Data-Validation(s): "req-creditcard"
                //  =======================================================

            case "req-creditcard":

                def.resolve(!IsLuhnPass(value) || !IsNotZero(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Email field
                //  === REQUIRMENTS: not null, correct email format
                //  === Data-Validation(s): "req-email"
                //  =======================================================

            case "req-email":

                def.resolve(!IsEmailAddress(value) || !IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Optional Email field
                //  === REQUIRMENTS: correct email format
                //  === Data-Validation(s): "optional-email"
                //  =======================================================

            case "opt-email":

                def.resolve(!IsEmailAddress(value) && IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Multi Email field
                //  === REQUIRMENTS: not null, correct email format
                //  === Data-Validation(s): "req-multi-email"
                //  =======================================================

            case "req-multi-email":

                var isFail = false,
                    emailList = value.split(','),
                    n;

                for (n in emailList) {
                    var validEmail = IsEmailAddress(emailList[n]);
                    if (!validEmail || !IsNotEmpty(validEmail)) {
                        isFail = true
                    }   // if
                    break;
                }   // for

                def.resolve(isFail);

                break;

                //  =======================================================
                //  === VAL TYPE: Optional multi CC Email field
                //  === REQUIRMENTS: not null, correct email format
                //  === Data-Validation(s): "opt-multi-email"
                //  =======================================================

            case "opt-multi-email":

                var isFail = false,
                    emailList = value.split(','),
                    n;

                if (IsNotEmpty(emailList)) {
                    for (n in emailList) {
                        var validEmail = IsEmailAddress(emailList[n]);
                        if (!validEmail) {
                            isFail = true
                        }   // if
                        break;
                    }   // for
                }   // if

                def.resolve(isFail);

                break;

                //  =======================================================
                //  === VAL TYPE: Email field for new account
                //  === REQUIRMENTS: not null, correct email format, doesn't exist
                //  === Data-Validation(s): "req-email"
                //  === Assistance: modal content, email verification page
                //  =======================================================

            case "req-email-newaccount":

                isFail = (!IsEmailAddress(value) || !IsNotEmpty(value));
                $mask.removeAttr('data-warning-override');
                if (IsEmailAddress(value) && IsNotEmpty(value)) {

                    var $loadingImg = $input.parent().find(".input-loading");

                    ShowLoadingImage($mask, $input, $loadingImg);

                    // verify the email is valid
                    $.get("/MyAccount/VerifyEmailAddress.aspx?email=" + value, function (data) {

                        $loadingImg.fadeOut(100, function () {
                            // the email address is currently registered...
                            if (data == "true") {
                                $mask.attr('data-warning-override', 'This email is already registered. Please enter another email.');
                                def.resolve(true);
                                // only do if this is instant validation
                                if (!isFormSubmit) {
                                    // assign the email address value to the modal window
                                    $("#email-value").text(value);
                                    // trigger the modal window with the conflict message and options
                                    $.openModal({
                                        target: '#email-registered',
                                        showCloseButton: false,
                                        width: '500px'
                                    });
                                }
                            } else if (data === "guest") {
                                $('.check-guest input').attr('checked', true);
                                def.resolve(false);
                            }  else {
                                def.resolve(false);
                            }
                        }); // fadeOut

                    }); // get
                }   // if
                else {

                    def.resolve(true);
                }   // else

                break;

                //  =======================================================
                //  === VAL TYPE: SSN field
                //  === REQUIRMENTS: correct ssn format
                //  === Data-Validation(s): "req-ssn"
                //  =======================================================

            case "req-ssn":

                def.resolve(!IsSSN(value) || !IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE: URL field
                //  === REQUIRMENTS: not null, correct url format
                //  === Data-Validation(s): "req-url"
                //  =======================================================

            case "req-url":

                def.resolve(!IsURL(value) || !IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Date field
                //  === REQUIRMENTS: not null, correct date format
                //  === Data-Validation(s): "req-date"
                //  =======================================================

            case "req-date":

                def.resolve(!IsDate(value) || !IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Date field
                //  === REQUIRMENTS: not null, correct date format
                //  === Data-Validation(s): "req-date-mm-dd-yy"
                //  =======================================================

            case "req-date-mm-dd-yy":

                def.resolve(!IsDateMMDDYY(value) || !IsNotEmpty(value));
                break;

                //  =======================================================
                //  === VAL TYPE: Credit Card Exp Date field
                //  === REQUIRMENTS: date later than today
                //  === Data-Validation(s): "req-expyear, req-expmonth"
                //  === NOTES: Must have BOTH supported Data-Validations.
                //  =======================================================

        	case "req-expmonth":
        		var $expYear = $parentForm.find("select[data-validation=req-expyear]"),
        		hasMonth = IsNotEmpty(value);
        		if (hasMonth && IsNotEmpty($expYear.val())) {
        			ValidateInput($expYear);
        		}
        		def.resolve(!hasMonth);
        		break;

            case "req-expyear":

                var now = new Date(),
                    nowMonth = now.getMonth() + 1,
                    nowYear = now.getFullYear(),
                    expMonthString = $($parentForm.find("select[data-validation=req-expmonth]")[0]).val() || '12',
                    expMonth = 0,
                    expYear = parseInt(value) || 0;

                expMonth = (expMonthString[0] == "0") ? parseInt(expMonthString[1]) : parseInt(expMonthString);

                def.resolve((expYear < nowYear) || (expYear == nowYear && expMonth < nowMonth));
                break;

                //  =======================================================
                //  === VAL TYPE: Date Drop Down Comparison
                //  === REQUIRMENTS: greater than date > less than date
                //  === Data-Validation(s): "req-dateddl-gt", "req-dateddl-lt"
                //  === NOTES: Must have BOTH supported Data-Validations.
                //  =======================================================

            case "req-dateddl-gt":

                var gtDate = new Date(),
                    gtDateparts = value.split('/'),
                    ltDate = new Date(),
                    ltDateparts = $parentForm.find("select[data-validation=req-dateddl-lt]").val().split('/');

                gtDate.setDate(parseInt(gtDateparts[0]));
                gtDate.setMonth((parseInt(gtDateparts[1]) - 1));
                gtDate.setYear(parseInt(gtDateparts[2]));

                ltDate.setDate(parseInt(ltDateparts[0]));
                ltDate.setMonth((parseInt(ltDateparts[1]) - 1));
                ltDate.setYear(parseInt(ltDateparts[2]));

                def.resolve(gtDate.getTime() < ltDate.getTime());
                break;

                //  =======================================================
                //  === VAL TYPE: Email and Confirmation field
                //  === REQUIRMENTS: not null, correct email format, matches
                //  === Data-Validation(s): "req-email1","req-email2"
                //  === NOTES: Must have BOTH supported Data-Validations.
                //  =======================================================

        	case "req-email1":
        	case "req-email":

                def.resolve(!IsEmailAddress(value) || !IsNotEmpty(value));
                break;

            case "req-email2":

                var email1Val = $parentForm.find("input[data-validation=req-email1]").val();

                if (!IsEmailAddress(value) || !IsNotEmpty(value)) {
                    def.resolve(true);
                }   // if
                else if (value != email1Val) {
                    $mask.attr("title", "The email address and confirmation don't match.");
                    def.resolve(true);
                }   // else if
                else {
                    def.resolve(false);
                }   // else
                break;


                //  =======================================================
                //  === VAL TYPE: Password and Confirmation field
                //  === REQUIRMENTS: not null, at least 6 characters, matches
                //  === Data-Validation(s): "req-password1","req-password2"
                //  =======================================================

            case "req-password":
            case "req-password1":

                if (value.length == 0) { $mask.attr("title", "Please enter a password."); }
                else if (value.length < 6) { $mask.attr("title", "Your password must be at least 6 characters."); }
                else if (value.length > 20) { $mask.attr("title", "Your password must be 20 characters or less."); }

                def.resolve(!IsNotEmpty(value) || value.length < 6 || value.length > 20);
                break;

            case "req-password2":

                var password1Val = $parentForm.find("input[data-validation=req-password1]").val();

                if (!IsNotEmpty(value)) {
                    def.resolve(true);
                }   // if
                else if (value != password1Val) {
                    $mask.attr("title", "The password and confirmation don't match.");
                    def.resolve(true);
                }   // else if
                else if (value.length < 6) {
                    $mask.attr("title", "Your confirming password must be at least 6 characters.");
                    def.resolve(true);
                }   // else if
                else if (value.length > 20) {
                    $mask.attr("title", "Your confirming password must be 20 characters or less.");
                    def.resolve(true);
                }   // else if
                else {
                    def.resolve(false);
                }   // else
                break;

            	//  =======================================================
            	//  === VAL TYPE: volumename and trackname field
            	//  === REQUIRMENTS: not null, no special characters
            	//  === Data-Validation(s): "req-volumename","req-trackname"
            	//  =======================================================

        	case "req-volumename":
            case "req-trackname":
            case "req-urlpage":
                var illegalChars = validationType == "req-volumename" ? /[\[\]\/\\\"~'&^$!}{\;()?.*+=:<>|@#%,]/g : /[\/\\\"?.*:<>|@#%]/g;
        	    value = $input.val().replace(/[^\x00-\x7F]/g, ""); //remove non ascii characters
        	    value = value.replace(illegalChars, ""); // remove illegal ascii characters
        		$input.val(value);
        		$input.closest('fieldset').sisyphus().saveAllData();
        		if (isFormSubmit) {
        			def.resolve(!IsNotEmpty(value.trim()));
        		}
        		else{
        			def.resolve(false);
        		}
        		break;

        		//  =======================================================
        		//  === VAL TYPE: ISRC field
        		//  === REQUIRMENTS: not null, matches ISRC regExp
        		//  === Data-Validation(s): "req-isrc"
        		//  =======================================================
            case "opt-isrc":
                if (!IsNotEmpty(value)) {
                    def.resolve(false);
                    break;
                }
        	case "req-isrc":
        		def.resolve( !IsNotEmpty(value) ||  !/^[a-zA-Z]{2}(-?)[0-9a-zA-Z]{3}(-?)\d{2}(-?)\d{5}$/.test(value));
        		break;

            case "req-search":
                def.resolve(!IsNotEmpty(value) || value.trim().toLowerCase() == 'search');
                break;

            default:
                // for any data-validation values that have no validation, return with a pass value
                def.resolve(false);
                break;
        }   // switch

        return def.promise();

    }   // CheckInputValue

    function CertifiedAddressMatches(jsonCurrentAddress)
    {
        if (!addressCertified ||
            jsonCertifiedAddress.addressline1 != $.trim(jsonCurrentAddress.addressline1) ||
            jsonCertifiedAddress.city != $.trim(jsonCurrentAddress.city) ||
            jsonCertifiedAddress.zipCode != $.trim(jsonCurrentAddress.zipCode) ||
            jsonCertifiedAddress.state != $.trim(jsonCurrentAddress.state) ||
            jsonCertifiedAddress.country != $.trim(jsonCurrentAddress.country))
        {
            addressCertified = false;
            $("#address-results").find("#addressCertified").val('false');
            jsonCertifiedAddress.addressline1 = $.trim(jsonCurrentAddress.addressline1);
            jsonCertifiedAddress.city = $.trim(jsonCurrentAddress.city);
            jsonCertifiedAddress.zipCode = $.trim(jsonCurrentAddress.zipCode);
            jsonCertifiedAddress.state = $.trim(jsonCurrentAddress.state);
            jsonCertifiedAddress.country = $.trim(jsonCurrentAddress.country);
            return false;
        }
        return true;
    }

//  ====================================================================================================
//  Instant / Form Submit Validation
//  ====================================================================================================

    function ValidateInput($input) {

        // grab the corresponding element values and assign
    	var $mask = $input.closest("p, div.radio-mask"),
            value = $.trim($input.val()),
            validationType = $input.attr("data-validation") || $input.parent().attr("data-validation"),
            def             = new $.Deferred();

        // validate the input, and when done validating -> display validation results
        $.when(CheckInputValue($mask, $input, value, validationType, def, false)).done(function (isFail) {

            // display pass/fail
            DisplayValidationResult($mask, $input, isFail, false);

            // DEBUG
            if (instantValidationDebug) { console.log("input: " + $input.attr("id") + "\r\n" + "value: '" + value + "'\r\n" + "fail: " + isFail); }

        }); // done

    }   // validateInput

//  ====================================================================================================
//  Form Submit (Input Iteration)
//  ====================================================================================================

    function ValidateInputs(e, $formContainers, passToFunction) {

        // array that will contain all deferred objects
    	var callingButton = e.target || e.srcElement,
			$callingButton = $(callingButton),
    		deferreds = [],
            returnValue = true,
    	    submitText = ($callingButton.attr("data-submit-text") == undefined) ? "Submitting..." : $callingButton.attr("data-submit-text");

        // this is a call back into this function to submit the form because it passed the previous time
        if ($callingButton.data("validated") === "true")
        {
            return true;
        }
       

        // set the text of the button
        $callingButton
            .data("original", $callingButton.val())
            .val(submitText);

        // For each container being passed in, verify its required fields...
        $formContainers.each(function () {

            var currentContainer = $(this);


            removeHazardousStrings($formContainers);

            // iterate through the form inputs
            $(currentContainer).find("input.textbox:visible, textarea.textarea:visible, select.dropdown:visible, input.checkbox:visible, .checkbox input:visible, .radiobutton:visible").each(function () {

                // assign the pass in values
                var $input          = $(this),
                    $mask           = $input.closest("p, div.radio-mask"),
                    value           = $.trim($input.val()),
                    validationType = $input.attr("data-validation") || $input.parent().attr("data-validation"),
                    def = new $.Deferred();

                // push this new deferred into the array
                deferreds.push(def);

                // validated each input
                $.when(CheckInputValue($mask, $input, value, validationType, def, true)).done(function (isFail) {

                    // determine if there was a failing input
                    if (isFail) { returnValue = false; }

                    // display pass/fail
                    DisplayValidationResult($mask, $input, isFail, true);
                    
                    // DEBUG
                    if (submitValidationDebug) { console.log($input.attr("id").split("_").pop() + "(" + $input.val() + ") - fail: " + isFail); }

                });

            }); // each

        }); // each

        // after all validation calls have finished executing...
        $.when.apply(null, deferreds).done(function () {

            // reset the button text
            $callingButton.val($callingButton.data("original"));

            // We have failed validation: scroll to the first field that failed and give it focus
            if (!returnValue) {
                MoveToFirstFailedInput();
            }   // if

            // passed validation, but a function has been passed in to display
            else if (passToFunction != null) {

                // clear out all local storage for this page...
                ReleaseLocalStorage($(".responsive-form"));
                localStorage.removeItem("focus");


                passToFunction.apply($callingButton[0]);
            }   // else

            // passed validation
            // 1. Disable the button so it cannot be clicked - REMOVED the DISABLED attr so it could be clicked
            // 2. change the button text to show a passing validation
            // 3. flag the hidden element's data to "pass"
            // 4. re-click event on the button - .trigger("click") only triggered the onclick event - .click() triggers click of button
            else {

                $callingButton
                    .val(submitText)
                    .data("validated", "true");

                // clear out all local storage for this page...
                ReleaseLocalStorage($(".responsive-form"));
                localStorage.removeItem("focus");


                callingButton.onclick = null;
                // recall the click event for this button, passing validation and proceeding forward
                setTimeout(function () { callingButton.click(); }, 1);
                
            }   // if

            if (submitValidationDebug) { console.log("Form sumbit validated: " + returnValue); }

        }); // done

        // always return false and let the deferreds drive the form validation
        return false;

    }   // validateResponsiveInputs

//  ====================================================================================================
//  Utilities
//  ====================================================================================================

    function HideAllValidationResults($form) {

        // identify the masks
        var $formMasks = $form.find("ul li p");

        $formMasks.each(function () {
            var $mask = $(this);
            SetValidationClass($mask, false);
            SetValidationMessage($mask, $mask.find("input.textbox:visible, textarea.textarea:visible, select.dropdown:visible, input.checkbox:visible, input.radiobutton:visible"), false, false)
        }); // each

    }   // HideAllValidationResults

    function DisplayValidationResult($mask, $input, isFail, isFormSubmit) {

        // toggle the label state occordingly...
        if ($input.val() == "") {
            $mask.find("label").removeClass("inputted");
        }   // if
        else {
            $mask.find("label").addClass("inputted");
        }   // else

        SetValidationClass($mask, isFail);
        SetValidationMessage($mask, $input, isFail, isFormSubmit)

    }   // DisplayValidationResult

    function SetValidationClass($mask, isFail) {

        // assign the correct validation class
        if (isFail) {
            $mask.addClass("failed-validation");
        }   //if
        else {
            $mask.removeClass("failed-validation");
        }   // else

    }   // SetValidationClass

    function SetValidationMessage($mask, $input, isFail, isFormSubmit) {

        var warningID = $input.attr('id') + "_warning", // generate a temporary id for the warning message, so we can identify later to remove when the field has passed validation
            warningOverride = $mask.attr('data-warning-override'),  
            warningMessage = (typeof warningOverride !== 'undefined' && warningOverride !== false) ? warningOverride : $mask.attr("title") || false;
        
        $mask.find('.input-warning').attr('title',warningMessage);
        // if there was a fail, a warning does not already exist for this element, and this is triggered from a form submit
        if (isFail && warningMessage) {

            var bypasslink = "";

            // fields that allow the user to bypass the input by clicking on a bypass link...
            // address line #2 bypass link
            if ($input.attr("data-validation") == "opt-address2") {
                bypasslink = " <a href='#bypass-field' class='bypass-field-link' data-element-id='" + $input.attr('id') + "'>Click here if the value is correct.</a>";
            }   // if

            // add the bypass link string to the warning message (it will either exist or will not exist)
            warningMessage += bypasslink;

            if ($("#" + warningID).size() == 0 && isFormSubmit) {
                $mask.closest("fieldset").find(".warning-messages").append("<div id='" + warningID + "'>" + warningMessage + "</div>");
            }   // if
            else if ($("#" + warningID).size() > 0) {
                // since the warning message already exists, update the message (changes for passwords, email confirmations, etc.)
                $("#" + warningID).html(warningMessage);
            }
        }   //if
        else {
            $("#" + warningID).slideUp(200, function () { $(this).remove(); });
        }   // else

    }   // SetValidationMessage

    function ShowLoadingImage($mask, $input, $loadingImg) {

        // display the loading image while we check for a taken email address
        $loadingImg.show(); 

        // remove any failed validation styles
        $mask.removeClass("failed-validation");

    }   // ShowLoadingImage

    function MoveToFirstFailedInput() {

        // make sure there actually is failed validation before we try to scroll to it...
        if ($(".failed-validation").size() > 0 && $(".failed-validation:first").closest("fieldset").size() > 0) {
            // Scroll to the first failed field 
            $("#slideout-content").animate({
                scrollTop: ($("#slideout-content").scrollTop() + $(".failed-validation:first").closest("fieldset").offset().top - 10)
            }, 500) ||
            $("html, body").animate({
                scrollTop: ($(".failed-validation:first").closest("fieldset").offset().top - 10)
            }, 500);

            // highlight the first failed input
            $(".failed-validation:first input:not(.hasDatepicker), .failed-validation:first textarea").focus();
        }   // if

    }   // MoveToFirstFailedInput

    function FormatUSPhoneNumber($input, value, bypass) {
        // remove any parens/space
        value = value.replace(/["'()-]/g, "");
        value = value.replace(/ /g, '');
        // add the dashes
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        // only format the phone number if this is a US number
        if (!IsNonUSCountry($input) || bypass) {
            // change the input value if it was not formatted correctly
            $input.val(value);
        }   // if
    }   // FormatUSPhoneNumber

    function GetCountryCode($input) {
        var returnValue = "",
            countryDD = $input.closest(".responsive-form").find(".dd-country select");
        // make sure there is a country drop down
        if (countryDD.size() > 0 && countryDD.val()) {
            returnValue = countryDD.val().toLowerCase();
        }   // if

        return returnValue;
    }   // GetCountryCode

    function IsNoSelection(value) {
        return value != "0" && IsNotEmpty(value);
    }   // IsNumber

    function IsNotZero(value) {
        return value > 0;
    }   // IsNumber

    function IsNotEmpty(value) {
        return value != "";
    }   // IsNumber

    function IsNotAvailable(value) {
        return value != "N/A";
    }   // IsNumber

    function IsNumber(value) {
        return !isNaN(value);
    }   // IsNumber

    function IsWholeNumber(value) {
        return /^\d+$/.test(value);
    }   // IsWholeNumber

    function IsPrice(value) {
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
    }   // IsPrice


    function IsISBN(value){
        return (/^(979|978)\d{10}$/i.test(value));
    } // IsISBN

    function IsPhoneNumber(value) {
        return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/i.test(value)
    }   // IsPhoneNumber

    function IsUSPhoneNumber(value) {
        var phoneNumber = value.replace(/["'()-]/g, "");
        phoneNumber = phoneNumber.replace(/ /g, '');

        return (/^[0-9]{1,10}$/.test(+phoneNumber) && phoneNumber.length == 10);
    }   // IsUSPhoneNumber

    function IsPhoneNumberByCountry(value, countryCode) {

        var returnValue = false;

        switch (countryCode) {
            case "us":
            case "usa":
            case "ca":
            case "ant":
            case "bar":
            case "bah":
            case "angu":
            case "brv":
            case "cay":
            case "ber":
            case "gren":
            case "tc":
            case "mons":
            case "guam":
            case "stm":
            case "stl":
            case "domi":
            case "stv":
            case "pr":
            case "do":
            case "tri":
            case "stk":
            case "jam":
                returnValue = !IsPhoneNumber(value);
                break;
            default:
                returnValue = !IsInternationalPhoneNumber(value);
                break;
        }   // switch

        return returnValue;
    }   // IsPhoneNumberByCountry

    function IsInternationalPhoneNumber(value) {
        return /^(\+)?[0-9\-().\s]{7,15}$/i.test(value);
    }   // IsInternationalPhoneNumber

    function IsNonUSCountry($input) {
        var countryCode = GetCountryCode($input);
        return (countryCode != "us" && countryCode != "usa");
    }   // IsNonUSCountry

    function IsEmailAddress(value) {
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
    }   // IsEmailAddress

    function IsLuhnPass(value) {
        var passLuhn = true;

        // accept only digits and dashes
        if (/[^0-9-]+/.test(value)) {
            passLuhn = false;
        }   // if
        else {
            var nCheck = 0,
                nDigit = 0,
                bEven = false;

            value = value.replace(/\D/g, "");

            for (n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n);
                var nDigit = parseInt(cDigit, 10);
                if (bEven) {
                    if ((nDigit *= 2) > 9) { nDigit -= 9; }
                }   // if
                nCheck += nDigit;
                bEven = !bEven;
            }   // for

            return ((nCheck % 10) == 0) ? true : false;
        }   // else
    }   // IsLuhnPass

    function IsSSN(value) {
        return /^(?!000)([0-9]\d{2}|7([0-9]\d|7[012]))([ -]?)(?!00)\d\d\3(?!0000)\d{4}$/i.test(value);
    }   // IsSSN

    function IsURL(value) {
        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }   // IsURL

    function IsDate(value) {
        return !/Invalid|NaN/.test(new Date(value));
    }   // IsDate

    function IsDateMMDDYY(value) {
        return /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/i.test(value);
    }   // IsDateMMDDYY

    function BuildAddressResultsModal(address1_ID, resultType, addressInput, addressOutput) {
        // NOTE: we are passing in the ID of address line 1 because this will always be a failsafe method to identify the parent responsive form (since that element may not always have an ID).
        // create the modal structure
        var addressModal = "<div id='address-results' class='avlModal-container'><div class='avlModal-wrapper'><div class='avlModal-header'></div><div class='avlModal-content'></div></div><input type='hidden' name='addressCertified' id='addressCertified' value='false'/></div>";
        // remove any existing address modal
        $("#address-results").remove();
        // add the new address modal to the body
        $("form").append(addressModal);

        var messageText = "";

        switch (resultType) {

            case "none":
                messageText = "We were unable to verify your address. Please choose one of the following options below to proceed:";

                $("#address-results").find(".avlModal-header").text("Address Not Found");
                $("#address-results").find(".avlModal-content").html("<h6>" + messageText + "</h6><p><a id='ar-change' data-address1ID='" + address1_ID + "' href='#' title='Change the address'>Change the address</a></p><p><a id='ar-certify' data-address1ID='" + address1_ID + "' href='#' title='Certify that the address you entered is the correct address'>Certify that the address is correct ( <em> " + addressInput + " </em> )</a></p>");
                break;

            case "single":
                // currently just overriding the user's input with the returned address result
                break;
            case "multiple":

                var addressChoices = "",
                    messageText = "We were unable to verify your address. Please choose one of the following options below to proceed:";

                // build the address choice string to be displayed as links
                $.each(addressOutput, function (index, value) {
                    addressChoices += "<p><a class='ar-choice' data-address1ID='" + address1_ID + "' href='#' rel='" + index + "' title='Use this address'>" + addressOutput[index].fullAddress + "</a></p>";
                }); // each

                // build the modal with the appropriate choices for multiple addresses
                $("#address-results").find(".avlModal-header").text("Choose Correct Address");
                $("#address-results").find(".avlModal-content").html("<h6>" + messageText + "</h6>" + addressChoices + "<p><a id='ar-change' data-address1ID='" + address1_ID + "' href='#' title='Change the address'>Change the address</a></p><p><a id='ar-certify' data-address1ID='" + address1_ID + "' href='#' title='Certify that the address you entered is the correct address'>Certify the address is correct - <em> " + addressInput + " </em></a></p>");

                // save the address array as data on the results modal, which will then be used to populate the address inputs if the user chooses one of the addresses
                $("#address-results").data("addresses", addressOutput);
                break;

        };  // switch

        // show the newly constructed address modal...
        $.openModal({ target: "#address-results", width: "650px" });


    }   // BuildAddressResultsModal

//  ====================================================================================================
//  REQUEST VALIDATION FUNCTIONS
//  ====================================================================================================


     function removeHazardousStrings($formContainers) {
        $formContainers.find("input.textbox, textarea.textarea").each(function () {
            $(this).val(sanitizeValue($(this).val()));
        });
    } //removeHazardousStrings
    function sanitizeValue(value) {
         return value.replace(/\< /g, '\<').replace(/\</g, '< ').replace(/\&\#/g, '& #');
    } //sanitizeValue
