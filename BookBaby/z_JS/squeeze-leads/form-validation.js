//  ===========================================================================================================================================================
//  Validation Display Functions
//  ===========================================================================================================================================================

	// display the input container in a failed input state
	function ShowInputFail(elem, rt) {
		// only display the pink input container if this is button validation
		
		var $isCheckbox;
			$isCheckbox = $(elem).hasClass('checkbox');
		
		if (rt != true) {
			
			if($isCheckbox)
			{
				$(elem).parent().parent().find(".input-error").css("display", "block");
				$(elem).parent().parent().addClass("highlighted-container");
			}
			else
			{
				$(elem).parent().find(".input-error").css("display", "block");
				$(elem).parent().addClass("highlighted-container");
			}
			
		}	// if
		// change the source of the validation image to fail
		if($isCheckbox)
			{
				$(elem)
					.parent()
					.parent()
					.find(".field-status")
					.attr("src", "/images/fail.png")
					.css("display", "block");
			}
			else
			{
				$(elem)
					.parent()
					.find(".field-status")
					.attr("src", "/images/fail.png")
					.css("display", "block");
			}
	}	// ShowInputFail()

	// display the input container in a checking state
	function ShowInputChecking(elem) {
		// change the source of the validation image to checking
		$(elem).parent().find(".field-status").attr("src", "/images/checking.gif").css({ display: "block", opacity: 1 });
	}	// ShowInputChecking()

	// display the input container in a pass state
	function ShowInputPass(elem, rt) {
		var $isCheckbox;
			$isCheckbox = $(elem).hasClass('checkbox'); 
			
		// return the pink input container to its original state
		if($isCheckbox)
		{
			$(elem).parent().parent().find(".input-error").css("display", "none");
			$(elem).parent().parent().removeClass("highlighted-container");
		}
		else
		{
			$(elem).parent().find(".input-error").css("display", "none");
			$(elem).parent().removeClass("highlighted-container");
		}
		// change the source of the validation image to pass
		if (rt == true) 
		{
			if($isCheckbox)
			{
				$(elem)
					.parent()
					.parent()
					.find(".field-status")
					.attr("src", "/images/pass.png")
					.css("display", "block")
					.animate({ opacity: 1 }, 1500, function() {
						$(this).fadeOut(500);
					});
				
			}
			else
			{
	
				$(elem)
					.parent()
					.find(".field-status")
					.attr("src", "/images/pass.png")
					.css("display", "block")
					.animate({ opacity: 1 }, 1500, function() {
						$(this).fadeOut(500);
					});
			}
		}	// if
	}	// ShowInputPass()

//  ===========================================================================================================================================================
//  Validation Functions
//  ===========================================================================================================================================================

	//  ==============================================================================================================
	//  === TEXT BOXES ==  
	//  ==============================================================================================================
	//  === "req-field" 						==  not null
	//  === "req-price" 						==  not null, valid number, greater than zero, or "N/A"
	//  === "req-number" 						==  not null, valid number, greater than zero
	//  === "req-phone" 						==  not null, valid phone number
	//  === "req-zipcode" 						==  not null, correct zipcode number (5 digits)  
	//  === "req-cvv" 							==  not null, positive integer number, either 3 or 4 digits
	//  === "req-creditcard" 					==  not null, LUHN test (http://en.wikipedia.org/wiki/Luhn)
	//  === "req-password1","req-password2" 	==  not null, at least 8 characters, passwords match
	//  === "req-email" 						==  not null, correct email format
	//  === "req-email1","req-email2" 			==  not null, correct email format, emails match
	//  === "req-date" 							==  not null, correct date format
	//  === "req-url" 							==  not null, correct url format
	//  === "req-ssn" 							==  not null, correct ssn format

//  ==============================================================================================================
	//  === CHECK BOXES / RADIO BUTTONS ==  
	//  ==============================================================================================================
	//  === "req-checked" ==  is checked

	//  ==============================================================================================================
	//  === DROP DOWN ==  
	//  ==============================================================================================================
	//  === "req-selection" ==  not null or not zero



	//  ==============================================================================================================

	// run through any validation classes that are inside the formContainer param
	// Param "formContainers" : the element the contains the inputs tovalidate against
	// Param "realTime" : if this is a real-time validation on a single ipout
	// Param "ignoreScroll" : if wedo no want the button-click validation to scroll to first failed input
    function checkRequiredFields(formContainers, realTime, ignoreScroll) {
        // return value for this function
		var returnValue = true;
		// if there is no value for the realtime param, set it to false
        if (realTime == null) { realTime = false; }
		else { realTime = true;}
		// if there is no value for the ignore scroll, set it to false
        if (ignoreScroll == null) { ignoreScroll = false; }
        // for each container being passed in, verify its required fields...
        formContainers.each(function () {
			// assign the current parent element
            var currentContainer = $(this);

            //  ==============================================================================================================
            //  === VAL TYPE: Required field
            //  === REQUIRMENTS: not null
            //  === SUPPORTED CLASSES: "req-field"
            //  ==============================================================================================================

            $(currentContainer).find(".req-field").each(function () {
                if ($.trim($(this).val()) == "") {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Required Drop Down Selection
            //  === REQUIRMENTS: not null or not zero
            //  === SUPPORTED CLASSES: "req-selection"
            //  ==============================================================================================================

            $(currentContainer).find(".req-selection").each(function () {
                if ($(this).val() == "" || $(this).val() == "0") {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Checkbox/Radio Button field
            //  === REQUIRMENTS: checked
            //  === SUPPORTED CLASSES: "req-checked"
            //  ==============================================================================================================

            $(currentContainer).find(".req-checked").each(function () {
                
				if ($(this).is(':checked')) {
                    ShowInputPass($(this),realTime);
                }
                else { 
					ShowInputFail($(this),realTime);
                    returnValue = false; 
				}
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Price field
            //  === REQUIRMENTS: not null, valid number, greater than zero, or "N/A"
            //  === SUPPORTED CLASSES: "req-price"
            //  ==============================================================================================================

            $(currentContainer).find(".req-price").each(function () {

                var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val());

                if ($(this).val() != "N/A" && (!isNumber || $(this).val() <= 0)) {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE:  Number field
            //  === REQUIRMENTS: not null, valid number, greater than zero
            //  === SUPPORTED CLASSES: "req-number"
            //  ==============================================================================================================

            $(currentContainer).find(".req-number").each(function () {

                var isNumber = !isNaN(parseInt($(this).val()));

                var isWholeNumber = /^\d+$/.test($(this).val());

                if (!isWholeNumber || !isNumber || $(this).val() <= 0) {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE:  Phone Number field
            //  === REQUIRMENTS: not null, valid phone number
            //  === SUPPORTED CLASSES: "req-phone"
            //  ==============================================================================================================


            $(currentContainer).find(".req-phone").each(function () {

                var isPhone = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/i.test($(this).val());

                if (!isPhone || $(this).val() == "") {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });



            //  ==============================================================================================================
            //  === VAL TYPE: Zipcode field
            //  === REQUIRMENTS: not null, correct zipcode number (5 digits)
            //  === SUPPORTED CLASSES: "req-zipcode"
            //  ==============================================================================================================

            $(currentContainer).find(".req-zipcode").each(function () {

                var isNumber = /^\d+$/.test($(this).val());

				if (!isNumber || $(this).val() == "" || $(this).val().length != 5) {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: CVV field
            //  === REQUIRMENTS: not null, positive integer number, either 3 or 4 digits
            //  === SUPPORTED CLASSES: "req-cvv"
            //  ==============================================================================================================

            $(currentContainer).find(".req-cvv").each(function () {

                var isNumber = /^\d+$/.test($(this).val());

                if (!isNumber || $(this).val().length < 3 || $(this).val().length > 4) {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Credit Card field
            //  === REQUIRMENTS: not null, LUHN test (http://en.wikipedia.org/wiki/Luhn)
            //  === SUPPORTED CLASSES: "req-creditcard"
            //  ==============================================================================================================

            $(currentContainer).find(".req-creditcard").each(function () {

                var passLuhn = true;
                var value = $(this).val();

                // accept only digits and dashes
                if (/[^0-9-]+/.test(value)) {
                    passLuhn = false;
                }
                else {
                    var nCheck = 0,
				            nDigit = 0,
				            bEven = false;

                    value = value.replace(/\D/g, "");

                    for (n = value.length - 1; n >= 0; n--) {
                        var cDigit = value.charAt(n);
                        var nDigit = parseInt(cDigit, 10);
                        if (bEven) {
                            if ((nDigit *= 2) > 9)
                                nDigit -= 9;
                        }
                        nCheck += nDigit;
                        bEven = !bEven;
                    }

                    passLuhn = ((nCheck % 10) == 0) ? true : false;
                }

                if (!passLuhn || value.length < 1) {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Password and Confirmation field
            //  === REQUIRMENTS: not null, at least 8 characters, matches
            //  === SUPPORTED CLASSES: "req-password1","req-password2"
            //  ==============================================================================================================

            $(currentContainer).find(".req-password1").each(function () {
                if ($(this).val().length < 8) {
                    $(this).parent().find(".input-error").css("display", "inline").text("your password must be at least 8 characters.");
                    $(this).parent().addClass("highlighted-container");
                    $(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "none");
                    $(currentContainer).find(".req-password2").parent().removeClass("highlighted-container");
                    returnValue = false;
                }
                else if ($(this).val().length >= 8 && $(currentContainer).find(".req-password2").val().length == 0) {
                    $(this).parent().find(".input-error").css("display", "none");
                    $(this).parent().removeClass("highlighted-container");
                    $(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "block");
                    $(currentContainer).find(".req-password2").parent().addClass("highlighted-container");
                    returnValue = false;
                }
                else if ($(this).val() != $(currentContainer).find(".req-password2").val()) {
                    $(this).parent().find(".input-error").css("display", "inline").text("your passwords don't match.");
                    $(this).parent().addClass("highlighted-container");
                    $(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "inline").text("your passwords don't match.");
                    $(currentContainer).find(".req-password2").parent().addClass("highlighted-container");
                    returnValue = false;
                }
                else {
                    $(this).parent().find(".input-error").css("display", "none");
                    $(this).parent().removeClass("highlighted-container");
                    $(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "none");
                    $(currentContainer).find(".req-password2").parent().removeClass("highlighted-container");
                }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Email field
            //  === REQUIRMENTS: not null, correct email format
            //  === SUPPORTED CLASSES: "req-email"
            //  ==============================================================================================================

            $(currentContainer).find(".req-email").each(function () {

                var isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(this).val());

                if (!isEmail || $(this).val() == "") {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Email and Confirmation field
            //  === REQUIRMENTS: not null, correct email format, matches
            //  === SUPPORTED CLASSES: "req-email1","req-email2"
            //  ==============================================================================================================

            $(currentContainer).find(".req-email1").each(function () {

                var isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(this).val());

                if (!isEmail || $(this).val() == "") {
                    $(this).parent().find(".input-error").css("display", "block");
                    $(this).parent().addClass("highlighted-container");
                    $(currentContainer).find(".req-email2").parent().find(".input-error").css("display", "none");
                    $(currentContainer).find(".req-email2").parent().removeClass("highlighted-container");
                    returnValue = false;
                }
                else if ($(this).val() != "" && $(currentContainer).find(".req-email2").val() == "") {
                    $(this).parent().find(".input-error").css("display", "none");
                    $(this).parent().removeClass("highlighted-container");
                    $(currentContainer).find(".req-email2").parent().find(".input-error").css("display", "block");
                    $(currentContainer).find(".req-email2").parent().addClass("highlighted-container")
                    returnValue = false;
                }
                else if ($(this).val() != $(currentContainer).find(".req-email2").val()) {
                    $(this).parent().find(".input-error").css("display", "inline").text("your email address and confirmation don't match.");
                    $(this).parent().addClass("highlighted-container");
                    $(currentContainer).find(".req-email2").parent().find(".input-error").css("display", "inline").text("your email address and confirmation don't match.");
                    $(currentContainer).find(".req-email2").parent().addClass("highlighted-container")
                    returnValue = false;
                }
                else {
                    $(this).parent().find(".input-error").css("display", "none");
                    $(this).parent().removeClass("highlighted-container");
                    $(currentContainer).find(".req-email2").parent().find(".input-error").css("display", "none");
                    $(currentContainer).find(".req-email2").parent().removeClass("highlighted-container");
                }
            });

            //  ==============================================================================================================
            //  === VAL TYPE: Date field
            //  === REQUIRMENTS: not null, correct date format
            //  === SUPPORTED CLASSES: "req-date"
            //  ==============================================================================================================

            $(currentContainer).find(".req-date").each(function () {

                var isDate = !/Invalid|NaN/.test(new Date($(this).val()));

                if (!isDate || $(this).val() == "") {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });


            //  ==============================================================================================================
            //  === VAL TYPE: URL field
            //  === REQUIRMENTS: not null, correct url format
            //  === SUPPORTED CLASSES: "req-url"
            //  ==============================================================================================================

            $(currentContainer).find(".req-url").each(function () {

                var isURL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test($(this).val());

                if (!isURL || $(this).val() == "") {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });


            //  ==============================================================================================================
            //  === VAL TYPE: SSN field
            //  === REQUIRMENTS: correct ssn format
            //  === SUPPORTED CLASSES: "req-ssn"
            //  ==============================================================================================================

            $(currentContainer).find(".req-ssn").each(function () {

                var isSSN = /^(?!000)([0-9]\d{2}|7([0-9]\d|7[012]))([ -]?)(?!00)\d\d\3(?!0000)\d{4}$/i.test($(this).val());

                if ($(this).val() != "" && !isSSN) {
                    ShowInputFail($(this),realTime);
                    returnValue = false;
                }
                else { ShowInputPass($(this),realTime); }
            });

		});	// each

        

        // We have failed validation: scroll to the first field that failed and give it focus
        if ( !returnValue && ignoreScroll == false && realTime == false ) {

            // Scroll to the first failed field 
			$.scrollTo( $(".highlighted-container:first"), 1000 );
			// Give that field focus
			$(".highlighted-container:first input").focus();
        }
        
        return returnValue;
    }

    