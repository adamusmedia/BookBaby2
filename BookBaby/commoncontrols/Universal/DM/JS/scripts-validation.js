

//  ====================================================================================================
//  General Form Validation Functions
//  ====================================================================================================

    function checkRequiredFields(formContainers, passToFunction) {
        
        var returnValue = true;
        // speed at which to fade in the error symbols for failed inputs
        var errorFadeInSpeed = 1000;
        var errorFadeOutSpeed = 600;


        // hide any previously shown errors...
        $(".highlighted-container").removeClass("highlighted-container");
        $(".input-error:visible").fadeOut(errorFadeOutSpeed);

        // For each container being passed in, verify its required fields...

        formContainers.each(function () {

            var currentContainer = $(this);

            //  =======================================================
            //  === VAL TYPE: Required field
            //  === REQUIRMENTS: not null
            //  === SUPPORTED CLASSES: "req-field"
            //  =======================================================

            $(currentContainer).find(".req-field:visible").each(function () {

               
                    if ($.trim($(this).val()) == "") {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                        
                    }//if
                    
                
            });
            
            //  =======================================================
            //  === VAL TYPE: Required Drop Down Selection
            //  === REQUIRMENTS: not null or not zero
            //  === SUPPORTED CLASSES: "req-selection"
            //  =======================================================

            $(currentContainer).find(".req-selection:visible").each(function () {
                
                    if ($(this).val() == "" || $(this).val() == "0") {
                        if ($(this).hasClass("grandparent-container")) {
                            $(this).parent().parent().find(".input-error").fadeIn(errorFadeInSpeed);
                            $(this).parent().parent().addClass("highlighted-container");
                        } else {
                            $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                            $(this).parent().addClass("highlighted-container");
                        }
                        returnValue = false;
                    }
                    else {
                        if ($(this).hasClass("grandparent-container:visible")) {
                            $(this).parent().parent().find(".input-error").fadeOut(errorFadeOutSpeed);
                            $(this).parent().parent().removeClass("highlighted-container");
                        }
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Checkbox/Radio Button field
            //  === REQUIRMENTS: checked
            //  === SUPPORTED CLASSES: "req-checked"
            //  =======================================================

            $(currentContainer).find(".req-checked:visible").each(function () {
                
                    if ($(this).is(":checked") == false) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                    
                
            });

            //  =======================================================
            //  === VAL TYPE: Checkbox/Radio Button List fields
            //  === REQUIRMENTS: at least one input checked
            //  === SUPPORTED CLASSES: "req-checked-list"
            //  =======================================================

            $(currentContainer).find(".req-checked-list:visible").each(function () {
                
                    var choiceMade = false;
                    $(this).find("input").each(function () {
                        if ($(this).is(":checked") == true) {
                            choiceMade = true;
                        }   // if
                    })   // each
                    if (!choiceMade) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                   
                
            });

            //  =======================================================
            //  === VAL TYPE: Price field
            //  === REQUIRMENTS: not null, valid number, greater than zero, or "N/A"
            //  === SUPPORTED CLASSES: "req-price"
            //  =======================================================

            $(currentContainer).find(".req-price:visible").each(function () {
                

                    var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val());

                    if ($(this).val() != "N/A" && (!isNumber || $(this).val() <= 0)) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }

            });
            
            //  =======================================================
            //  === VAL TYPE: Price field
            //  === REQUIRMENTS: valid number, greater than zero, or "N/A" and within range
            //  === SUPPORTED CLASSES: "req-price-range, req-price-top, req-price-bottom"
            //  =======================================================

            $(currentContainer).find(".req-price-range:visible").each(function () {


                var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val()),
                    topPriceText = ($(this).closest(':has(.req-price-top)').find('.req-price-top').text()).replace(/[^.0-9]/g, ''),
                    topPrice = parseFloat(topPriceText),
                    bottomPriceText = ($(this).closest(':has(.req-price-bottom)').find('.req-price-bottom').text()).replace(/[^.0-9]/g, ''),
                    bottomPrice = parseFloat(bottomPriceText),
                    enteredPriceText = $(this).val().replace(/[^.0-9]/g, ''),
                    enteredPrice = parseFloat(enteredPriceText),
                    errorMessage = $(this).closest('.input-container').find('.input-error');

                    if ($(this).val() != "N/A" && (!isNumber || $(this).val() <= 0)) {
                        $(this).closest('.input-container').children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).closest('.input-container').addClass("highlighted-container");
                        returnValue = false;
                        errorMessage.text('Please enter a valid amount.');

                    }
                    else if (!isNaN(topPrice) && topPrice < enteredPrice) {
                        $(this).closest('.input-container').children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).closest('.input-container').addClass("highlighted-container");
                        returnValue = false;
                        errorMessage.text('Please enter an amount less than or equal to $' + topPrice + '.');
                    }
                    else if (!isNaN(bottomPrice) && bottomPrice > enteredPrice) {
                        $(this).closest('.input-container').children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).closest('.input-container').addClass("highlighted-container");
                        returnValue = false;
                        errorMessage.text('Please enter an amount more than $' + bottomPrice + '.');
                    }
                console.log(bottomPrice + "<" + enteredPrice + "<" + topPrice);

            });

            //  =======================================================
            //  === VAL TYPE: Price field
            //  === REQUIRMENTS: not null, valid number, greater than or equal zero, or "N/A"
            //  === SUPPORTED CLASSES: "req-price-digital"
            //  =======================================================

            $(currentContainer).find(".req-price-digital:visible").each(function () {
                

                    var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val());

                    if ($(this).val() != "N/A" && (!isNumber || $(this).val() < 0)) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                    
                
            });

            //  =======================================================
            //  === VAL TYPE: Price field
            //  === REQUIRMENTS: not null, valid number, not negative, or "N/A"
            //  === SUPPORTED CLASSES: "req-price-299"
            //  =======================================================

            $(currentContainer).find(".req-price-299:visible").each(function () {
                

                    var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val());

                    if ($(this).val() != "N/A" && (!isNumber || $(this).val() < 0 || $(this).val() > 2.99)) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE:  Number field
            //  === REQUIRMENTS: not null, valid number, greater than zero
            //  === SUPPORTED CLASSES: "req-number"
            //  =======================================================

            $(currentContainer).find(".req-number:visible:visible").each(function () {
                

                    var isNumber = !isNaN(parseInt($(this).val()));

                    var isWholeNumber = /^\d+$/.test($(this).val());

                    if (!isWholeNumber || !isNumber || $(this).val() <= 0) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                       
                    }//if
                
            });

            $(currentContainer).find(".optional-number:visible").each(function () {
                

                    if (($(this).val()) != "") {
                        var isNumber = !isNaN(parseInt($(this).val()));

                        var isWholeNumber = /^\d+$/.test($(this).val());

                        if (!isWholeNumber || !isNumber || $(this).val() <= 0) {
                            $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                            $(this).parent().addClass("highlighted-container");
                            returnValue = false;
                        }
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE:  UPC field
            //  === REQUIRMENTS: not null, valid number, 11 or 12 digits
            //  === SUPPORTED CLASSES: "req-upc"
            //  =======================================================

            $(currentContainer).find(".req-upc:visible").each(function () {


                var isNumber = !isNaN(parseInt($(this).val()));

                var isWholeNumber = /^\d+$/.test($(this).val());

                if (!isWholeNumber || !isNumber || ($(this).val().length != 11 && $(this).val().length != 12)) {
                    $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                    $(this).parent().addClass("highlighted-container");
                    returnValue = false;
                }

            });

            //  =======================================================
            //  === VAL TYPE:  Number field Greater than or equal to 10
            //  === REQUIRMENTS: not null, valid number, greater than 10
            //  === SUPPORTED CLASSES: "req-number-10"
            //  =======================================================

            $(currentContainer).find(".req-number-10:visible").each(function () {
                

                    var isNumber = !isNaN(parseInt($(this).val()));

                    var isWholeNumber = /^\d+$/.test($(this).val());

                    if (!isWholeNumber || !isNumber || $(this).val() <= 10) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE:  Number field Greater than 20
            //  === REQUIRMENTS: not null, valid number, greater than 20
            //  === SUPPORTED CLASSES: "req-number-20"
            //  =======================================================

            $(currentContainer).find(".req-number-20:visible").each(function () {
                

                    $(this).val($(this).val().replace("$", ""));

                    var numberVal = $(this).val().replace("$", "");

                    var isNumber = !isNaN(parseInt(numberVal));

                    var isWholeNumber = /^\d+$/.test(numberVal);

                    if (!isWholeNumber || !isNumber || numberVal < 20) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE:  Number field Greater than or equal to 250
            //  === REQUIRMENTS: not null, valid number, greater than 20
            //  === SUPPORTED CLASSES: "req-number-20"
            //  =======================================================

            $(currentContainer).find(".req-number-250:visible").each(function () {
                

                    $(this).val($(this).val().replace("$", ""));

                    var numberVal = $(this).val().replace("$", "");

                    var isNumber = !isNaN(parseInt(numberVal));

                    var isWholeNumber = /^\d+$/.test(numberVal);

                    if (!isWholeNumber || !isNumber || numberVal <= 250) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });
            
            //  =======================================================
            //  === VAL TYPE:  Phone Number field
            //  === REQUIRMENTS: not null, valid phone number
            //  === SUPPORTED CLASSES: "req-phone"
            //  =======================================================


            $(currentContainer).find(".req-phone:visible").each(function () {
                

                    var isPhone = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/i.test($(this).val());
                    var internationalPhone = /^(\+)?[0-9\-().\s]{7,15}$/i.test($(this).val());

                    var ddCountry = $(currentContainer).find(".dd-country");
                    var ddlCountry = $(currentContainer).find(".ddl-country");

                    var country = "us";
                    if (ddCountry.length > 0) {
                        country = ddCountry.val().toLowerCase();
                    }
                    else if (ddlCountry.length > 0) {
                        country = ddlCountry.val().toLowerCase();
                    }

                    switch (country) {
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
                            break;

                        default:
                            isPhone = internationalPhone;
                            break;
                    }
                    


                if (!isPhone || $(this).val() == "") {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            $(currentContainer).find(".req-phone-us:visible").each(function () {
                
                var phoneNumber = $(this).val().replace(/["'()-]/g, "");
                phoneNumber = phoneNumber.replace(/ /g, '');

                var isUSPhone = (/^[0-9]{1,10}$/.test(+phoneNumber) && phoneNumber.length == 10);

                if (!isUSPhone || phoneNumber == "") {
                    $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                    $(this).parent().addClass("highlighted-container");
                    returnValue = false;
                }

            });


            //  =======================================================
            //  === VAL TYPE: Zipcode field
            //  === REQUIRMENTS: not null, correct zipcode format
            //  === SUPPORTED CLASSES: "req-zipcode"
            //  =======================================================

            $(currentContainer).find(".req-zipcode:visible").each(function () {
                
                    var isNotZip = (/[\/\\\"?.*:<>|@#%,]/g).test($(this).val());

                    if ($(this).val() == "" || isNotZip) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                    else {
                        if ($(this).parent().find(".zip-validator").css("visibility") == "visible") {
                            $(this).parent().find(".zip-validator").css("visibility", "hidden")
                            $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                            $(this).parent().addClass("highlighted-container");
                            returnValue = false;
                        }
                    }

                
            });

            //  =======================================================
            //  === VAL TYPE: CVV field
            //  === REQUIRMENTS: not null, positive integer number, either 3 or 4 digits
            //  === SUPPORTED CLASSES: "req-cvv"
            //  =======================================================

            $(currentContainer).find(".req-cvv:visible").each(function () {
                

                    var isNumber = /^\d+$/.test($(this).val());

                    if (!isNumber || $(this).val().length < 3 || $(this).val().length > 4) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: CVV field
            //  === REQUIRMENTS: not null or not zero
            //  === SUPPORTED CLASSES: "req-month, req-year"
            //  =======================================================

            $(currentContainer).find(".req-month:visible").each(function () {
                

                    if ($(this).val() == "" || $(currentContainer).find(".req-year").val() == "") {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Credit Card field
            //  === REQUIRMENTS: not null, LUHN test (http://en.wikipedia.org/wiki/Luhn)
            //  === SUPPORTED CLASSES: "req-creditcard"
            //  =======================================================

            $(currentContainer).find(".req-creditcard:visible").each(function () {
                

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
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
               
            });

            //  =======================================================
            //  === VAL TYPE: Password and Confirmation field
            //  === REQUIRMENTS: not null, at least 6 characters, matches
            //  === SUPPORTED CLASSES: "req-password1","req-password2"
            //  =======================================================

            $(currentContainer).find(".req-password1:visible").each(function () {
                
                    if ($(this).val().length < 6) {
                        $(this).parent().children(".input-error").css("display", "block").text("Your password must be at least 6 characters.");
                        $(this).parent().addClass("highlighted-container");
                        $(currentContainer).find(".req-password2").parent().find(".input-error").fadeOut(errorFadeOutSpeed);
                        $(currentContainer).find(".req-password2").parent().removeClass("highlighted-container");
                        returnValue = false;
                    }
                    else if ($(this).val().length >= 6 && $(currentContainer).find(".req-password2").val().length == 0) {
                        //$(this).parent().children(".input-error").fadeOut(errorFadeOutSpeed);
                        //$(this).parent().removeClass("highlighted-container");
                        $(currentContainer).find(".req-password2").parent().find(".input-error").fadeIn(errorFadeInSpeed);
                        $(currentContainer).find(".req-password2").parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                    else if ($(this).val() != $(currentContainer).find(".req-password2").val()) {
                        $(currentContainer).find(".req-password2").parent().children(".input-error").css("display", "block").text("Your passwords don't match.");
                        $(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "block").text("Your passwords don't match.");
                        $(currentContainer).find(".req-password2").parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                    else {
                        $(currentContainer).find(".req-password2").parent().find(".input-error").fadeOut(errorFadeOutSpeed);
                        $(currentContainer).find(".req-password2").parent().removeClass("highlighted-container");
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Email field
            //  === REQUIRMENTS: not null, correct email format
            //  === SUPPORTED CLASSES: "req-email"
            //  =======================================================

            $(currentContainer).find(".req-email:visible").each(function () {
                

                    var isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(this).val());

                    if (!isEmail || ($(this).val() == "" )) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });
            //  =======================================================
            //  === VAL TYPE: OptionalEmail field
            //  === REQUIRMENTS: correct email format or empty
            //  === SUPPORTED CLASSES: "optional-email"
            //  =======================================================

            $(currentContainer).find(".optional-email:visible").each(function () {
                

                    var isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(this).val());

                    if (!isEmail && !($(this).val() == "" )) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Multi Email field
            //  === REQUIRMENTS: not null, correct email format
            //  === SUPPORTED CLASSES: "req-email"
            //  =======================================================

            $(currentContainer).find(".req-multi-email:visible").each(function () {

                var isEmail,
                    subStrEmails = $(this).val().split(','),
                    n;
                for (n in subStrEmails) {
                    isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(subStrEmails[n]);

                    if (!isEmail || ($(this).val() == "")) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                }
            });

            //  =======================================================
            //  === VAL TYPE: Optional multi CC Email field
            //  === REQUIRMENTS: not null, correct email format
            //  === SUPPORTED CLASSES: "req-email"
            //  =======================================================

            $(currentContainer).find(".optional-multi-email:visible").each(function () {

                if ($(this).val() != "") {

                    var isEmail,
                        subStrEmails = $(this).val().split(','),
                        n;
                    for (n in subStrEmails) {
                        isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(subStrEmails[n]);

                        if (!isEmail) {
                            $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                            $(this).parent().addClass("highlighted-container");
                            returnValue = false;
                        }
                    }
                }
            });

            //  =======================================================
            //  === VAL TYPE: Email and Confirmation field
            //  === REQUIRMENTS: not null, correct email format, matches
            //  === SUPPORTED CLASSES: "req-email1","req-email2"
            //  =======================================================

            $(currentContainer).find(".req-email1:visible").each(function () {
                

                    var isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(this).val());

                    if (!isEmail || $(this).val() == "") {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        $(currentContainer).find(".req-email2").parent().find(".input-error").fadeOut(errorFadeOutSpeed);
                        $(currentContainer).find(".req-email2").parent().removeClass("highlighted-container");
                        returnValue = false;
                    }
                    else if ($(this).val() != "" && $(currentContainer).find(".req-email2").val() == "") {
                        $(currentContainer).find(".req-email2").parent().find(".input-error").fadeIn(errorFadeInSpeed);
                        $(currentContainer).find(".req-email2").parent().addClass("highlighted-container")
                        returnValue = false;
                    }
                    else if ($(this).val() != $(currentContainer).find(".req-email2").val()) {
                        $(this).parent().children(".input-error").css("display", "block").text("Your email address and confirmation don't match.");
                        $(this).parent().addClass("highlighted-container");
                        $(currentContainer).find(".req-email2").parent().find(".input-error").css("display", "block").text("Your email address and confirmation don't match.");
                        $(currentContainer).find(".req-email2").parent().addClass("highlighted-container")
                        returnValue = false;
                    }
                    else {
                        $(currentContainer).find(".req-email2").parent().find(".input-error").fadeOut(errorFadeOutSpeed);
                        $(currentContainer).find(".req-email2").parent().removeClass("highlighted-container");
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Date field
            //  === REQUIRMENTS: not null, correct date format
            //  === SUPPORTED CLASSES: "req-date"
            //  =======================================================

            $(currentContainer).find(".req-date:visible").each(function () {
                

                    var isDate = !/Invalid|NaN/.test(new Date($(this).val()));

                    if (!isDate || $(this).val() == "") {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Date field
            //  === REQUIRMENTS: not null, correct date format
            //  === SUPPORTED CLASSES: "req-date-mm-dd-yy"
            //  =======================================================

            $(currentContainer).find(".req-date-mm-dd-yy:visible").each(function () {
                

                    var isDate = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/i.test($(this).val());

                    if (!isDate || $(this).val() == "") {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Date field
            //  === REQUIRMENTS: can be null, correct date format
            //  === SUPPORTED CLASSES: "req-date-empty"
            //  =======================================================

            $(currentContainer).find(".req-date-empty:visible").each(function () {
                

                    var isDate = !/Invalid|NaN/.test(new Date($(this).val())) || $(this).val() == "";

                    if (!isDate) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });

            //  =======================================================
            //  === VAL TYPE: Date Drop Down Comparison
            //  === REQUIRMENTS: greater than date > less than date
            //  === SUPPORTED CLASSES: "req-dateddl-gt", "req-dateddl-lt"
            //  =======================================================

            $(currentContainer).find(".req-dateddl-gt:visible").each(function () {
                

                    if ($(currentContainer).find(".req-dateddl-lt")) {
                        var gtDate = new Date();
                        var gtDateparts = $(this).val().split('/');
                        var ltDate = new Date();
                        var ltDateparts = $(currentContainer).find(".req-dateddl-lt").val().split('/');

                        gtDate.setDate(parseInt(gtDateparts[0]));
                        gtDate.setMonth((parseInt(gtDateparts[1]) - 1));
                        gtDate.setYear(parseInt(gtDateparts[2]));

                        ltDate.setDate(parseInt(ltDateparts[0]));
                        ltDate.setMonth((parseInt(ltDateparts[1]) - 1));
                        ltDate.setYear(parseInt(ltDateparts[2]));

                        if (gtDate.getTime() < ltDate.getTime()) {
                            $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                            $(this).parent().addClass("highlighted-container");
                            returnValue = false;
                        }
                        
                    }
                    else {
                        alert("Hold on kid, there's no second date to compare!");
                    }
                 
            });


            //  =======================================================
            //  === VAL TYPE: URL field
            //  === REQUIRMENTS: not null, correct url format
            //  === SUPPORTED CLASSES: "req-url"
            //  =======================================================

            $(currentContainer).find(".req-url:visible").each(function () {
                

                    var isURL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test($(this).val());

                    if (!isURL || $(this).val() == "") {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });


            //  =======================================================
            //  === VAL TYPE: SSN field
            //  === REQUIRMENTS: correct ssn format
            //  === SUPPORTED CLASSES: "req-ssn"
            //  =======================================================

            $(currentContainer).find(".req-ssn:visible").each(function () {
                

                    var isSSN = /^(?!000)([0-9]\d{2}|7([0-9]\d|7[012]))([ -]?)(?!00)\d\d\3(?!0000)\d{4}$/i.test($(this).val());

                    if ($(this).val() != "" && !isSSN) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });
           
            //  =======================================================
            //  === VAL TYPE: Credit Card Exp Date field
            //  === REQUIRMENTS: date later than today
            //  === SUPPORTED CLASSES: "req-expyear req-expmonth"
            //  === NOTES: Must have BOTH supported classes.
            //  =======================================================
            
            $(currentContainer).find(".req-expyear:visible").each(function () {
                
                    var now = new Date(),
                        nowMonth = now.getMonth() + 1,
                        nowYear =  now.getFullYear(),
                        expMonthString = $(this).parent().find('.req-expmonth').val(),
                        expMonth = 0,
                        expYear = parseInt($(this).val());

                    if(expMonthString[0] == "0"){
                        expMonth = parseInt(expMonthString[1]);
                    } //if
                    else{
                        expMonth = parseInt(expMonthString);
                    } //else

                    if (expYear < nowYear || (expYear == nowYear && expMonth < nowMonth)) {
                        $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                        $(this).parent().addClass("highlighted-container");
                        returnValue = false;
                    }
                
            });


            $(currentContainer).find(".txt-totalrunnigtime:visible").each(function () {
                var totFormatedTime = /^\d{2}[:]\d{2}[:]\d{2}$/i.test($(this).val());

                if ($(this).val() != "" && !totFormatedTime) {
                    $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                    $(this).parent().addClass("highlighted-container");
                    returnValue = false;
                }

            });

            $(currentContainer).find(".txt-totalrunnigtimelimited:visible").each(function () {
                var totFormatedTime = /^\d{2}[:]\d{2}$/i.test($(this).val());

                if ($(this).val() != "" && !totFormatedTime) {
                    $(this).parent().children(".input-error").fadeIn(errorFadeInSpeed);
                    $(this).parent().addClass("highlighted-container");
                    returnValue = false;
                }

            });

        }); // each

        

        // We have failed validation: scroll to the first field that failed and give it focus
        if ( !returnValue ) {

            // Scroll to the first failed field 
			
            $.scrollTo( $(".highlighted-container:first"), 500);
            $(".highlighted-container:first input, .highlighted-container:first textarea").focus();

        }
        else if (passToFunction != null) {
            SubmitModal(passToFunction);
        }   // else

        return returnValue;
    }

    