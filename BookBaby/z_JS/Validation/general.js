

//  ====================================================================================================
//  General Form Validation Functions
//  ====================================================================================================


	function checkRequiredFields(formContainers, ignoreScroll) {
		var returnValue = true;

		if (ignoreScroll == null) {
			ignoreScroll = false;
		}   // if


		// For each container being passed in, verify its required fields...

		formContainers.each(function () {

			var currentContainer = $(this);

			//  =======================================================
			//  === VAL TYPE: Required field
			//  === REQUIRMENTS: not null
			//  === SUPPORTED CLASSES: "req-field"
			//  =======================================================

			$(currentContainer).find(".req-field").each(function () {

				if ($.trim($(this).val()) == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Required Drop Down Selection
			//  === REQUIRMENTS: not null or not zero
			//  === SUPPORTED CLASSES: "req-selection"
			//  =======================================================

			$(currentContainer).find(".req-selection").each(function () {
				if ($(this).val() == "" || $(this).val() == "0") {
					if ($(this).hasClass("grandparent-container")) {
						$(this).parent().parent().find(".input-error").css("display", "block");
						$(this).parent().parent().addClass("highlighted-container");
					} else {
						$(this).parent().find(".input-error").css("display", "block");
						$(this).parent().addClass("highlighted-container");
					}
					returnValue = false;
				}
				else {
					if ($(this).hasClass("grandparent-container")) {
						$(this).parent().parent().find(".input-error").css("display", "none");
						$(this).parent().parent().removeClass("highlighted-container");
					} else {
						$(this).parent().find(".input-error").css("display", "none");
						$(this).parent().removeClass("highlighted-container");
					}   // else
				}
			});

			//  =======================================================
			//  === VAL TYPE: Checkbox/Radio Button field
			//  === REQUIRMENTS: checked
			//  === SUPPORTED CLASSES: "req-checked"
			//  =======================================================

			$(currentContainer).find(".req-checked").each(function () {
				if ($(this).find("input").prop("checked") == false) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Checkbox/Radio Button List fields
			//  === REQUIRMENTS: at least one input checked
			//  === SUPPORTED CLASSES: "req-checked-list"
			//  =======================================================

			$(currentContainer).find(".req-checked-list").each(function () {
				var choiceMade = false;
				$(this).find("input").each(function () {
					if ($(this).prop("checked")) {
						choiceMade = true;
					}   // if
				})   // each
				if (!choiceMade) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Price field
			//  === REQUIRMENTS: not null, valid number, greater than zero, or "N/A"
			//  === SUPPORTED CLASSES: "req-price"
			//  =======================================================

			$(currentContainer).find(".req-price").each(function () {

				var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val());

				if ($(this).val() != "N/A" && (!isNumber || $(this).val() <= 0)) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Price field
			//  === REQUIRMENTS: not null, valid number, greater than or equal zero, or "N/A"
			//  === SUPPORTED CLASSES: "req-price-digital"
			//  =======================================================

			$(currentContainer).find(".req-price-digital").each(function () {

			    var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val());


				if ($(this).val() != "N/A" && (!isNumber || $(this).val() < 0)) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Price field
			//  === REQUIRMENTS: not null, valid number, not negative, or "N/A"
			//  === SUPPORTED CLASSES: "req-price-299"
			//  =======================================================

			$(currentContainer).find(".req-price-299").each(function () {

				var isNumber = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test($(this).val());

				if ($(this).val() != "N/A" && (!isNumber || $(this).val() < 0 || $(this).val() > 2.99)) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE:  Number field
			//  === REQUIRMENTS: not null, valid number, greater than or equal to zero
			//  === SUPPORTED CLASSES: "req-number"
			//  =======================================================
			$(currentContainer).find(".req-number").each(function () {

				var isNumber = !isNaN(parseInt($(this).val()));

				var isWholeNumber = /^\d+$/.test($(this).val());

				if (!isWholeNumber || !isNumber || $(this).val() < 0) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE:  Number field
			//  === REQUIRMENTS: not null, valid number, greater than zero
			//  === SUPPORTED CLASSES: "req-positive-number"
			//  =======================================================
			$(currentContainer).find(".req-positive-number").each(function () {

				var isNumber = !isNaN(parseInt($(this).val()));

				var isWholeNumber = /^\d+$/.test($(this).val());

				if (!isWholeNumber || !isNumber || $(this).val() <= 0) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			$(currentContainer).find(".optional-number").each(function () {

				if (($(this).val()) != "") {
					var isNumber = !isNaN(parseInt($(this).val()));

					var isWholeNumber = /^\d+$/.test($(this).val());

					if (!isWholeNumber || !isNumber || $(this).val() <= 0) {
						$(this).parent().find(".input-error").css("display", "block");
						$(this).parent().addClass("highlighted-container");
						returnValue = false;
					}
					else {
						$(this).parent().find(".input-error").css("display", "none");
						$(this).parent().removeClass("highlighted-container");
					}
				} else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}   // else
			});

			//  =======================================================
			//  === VAL TYPE:  Number field Greater than 10
			//  === REQUIRMENTS: not null, valid number, greater than 10
			//  === SUPPORTED CLASSES: "req-number-10"
			//  =======================================================

			$(currentContainer).find(".req-number-10").each(function () {

				var isNumber = !isNaN(parseInt($(this).val()));

				var isWholeNumber = /^\d+$/.test($(this).val());

				if (!isWholeNumber || !isNumber || $(this).val() < 10) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE:  Number field Greater than 50
			//  === REQUIRMENTS: not null, valid number, greater than 50
			//  === SUPPORTED CLASSES: "req-number-50"
			//  =======================================================

			$(currentContainer).find(".req-number-50").each(function () {

				var isNumber = !isNaN(parseInt($(this).val()));

				var isWholeNumber = /^\d+$/.test($(this).val());

				if (!isWholeNumber || !isNumber || $(this).val() <= 50) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE:  Number field Greater than 20
			//  === REQUIRMENTS: not null, valid number, greater than 20
			//  === SUPPORTED CLASSES: "req-number-20"
			//  =======================================================

			$(currentContainer).find(".req-number-20").each(function () {

				$(this).val($(this).val().replace("$", ""));

				var numberVal = $(this).val().replace("$", "");

				var isNumber = !isNaN(parseInt(numberVal));

				var isWholeNumber = /^\d+$/.test(numberVal);

				if (!isWholeNumber || !isNumber || numberVal < 20) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE:  Number field Greater than or equal to 250
			//  === REQUIRMENTS: not null, valid number, greater than 20
			//  === SUPPORTED CLASSES: "req-number-20"
			//  =======================================================

			$(currentContainer).find(".req-number-250").each(function () {

				$(this).val($(this).val().replace("$", ""));

				var numberVal = $(this).val().replace("$", "");

				var isNumber = !isNaN(parseInt(numberVal));

				var isWholeNumber = /^\d+$/.test(numberVal);

				if (!isWholeNumber || !isNumber || numberVal <= 250) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE:  Phone Number field
			//  === REQUIRMENTS: not null, valid phone number
			//  === SUPPORTED CLASSES: "req-phone"
			//  =======================================================


			$(currentContainer).find(".req-phone").each(function () {

                // Check for digits, spaces, and dashes only.			   
			    var isDigitsAndDashes = /^[0-9-\s]*$/i.test($(this).val());

			    if (!isDigitsAndDashes || $(this).val() == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});



			//  =======================================================
			//  === VAL TYPE: Zipcode field
			//  === REQUIRMENTS: not null, correct zipcode format
			//  === SUPPORTED CLASSES: "req-zipcode"
			//  =======================================================

			$(currentContainer).find(".req-zipcode").each(function () {
				if ($(this).val() == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					if ($(this).parent().find(".zip-validator").css("visibility") == "visible") {
						$(this).parent().find(".zip-validator").css("visibility", "hidden")
						$(this).parent().find(".input-error").css("display", "block");
						$(this).parent().addClass("highlighted-container");
						returnValue = false;
					}
					else {
						$(this).parent().find(".input-error").css("display", "none");
						$(this).parent().removeClass("highlighted-container");
					}
				}

			});

			//  =======================================================
			//  === VAL TYPE: CVV field
			//  === REQUIRMENTS: not null, positive integer number, either 3 or 4 digits
			//  === SUPPORTED CLASSES: "req-cvv"
			//  =======================================================

			$(currentContainer).find(".req-cvv").each(function () {

				var isNumber = /^\d+$/.test($(this).val());

				if (!isNumber || $(this).val().length < 3 || $(this).val().length > 4) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: CVV field
			//  === REQUIRMENTS: not null or not zero
			//  === SUPPORTED CLASSES: "req-month, req-year"
			//  =======================================================

			$(currentContainer).find(".req-month").each(function () {

				if ($(this).val() == "" || $(currentContainer).find(".req-year").val() == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Credit Card field
			//  === REQUIRMENTS: not null, LUHN test (http://en.wikipedia.org/wiki/Luhn)
			//  === SUPPORTED CLASSES: "req-creditcard"
			//  =======================================================

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
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Password and Confirmation field
			//  === REQUIRMENTS: not null, at least 8 characters, matches
			//  === SUPPORTED CLASSES: "req-password1","req-password2"
			//  =======================================================
			$(currentContainer).find(".req-password1").each(function () {
			    if ($(this).data("validPwd") != true) {
			        $(this).parent().find(".input-error").css("display", "block").text("Password must use at least 8 characters, at least one number, and at least one capital letter.");
			        $(this).parent().addClass("highlighted-container");
			        $(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "none");
			        $(currentContainer).find(".req-password2").parent().removeClass("highlighted-container");
			        returnValue = false;
			    } 
				else if ($(this).val().length >= 8 && $(currentContainer).find(".req-password2").val().length == 0) {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
					$(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "block");
					$(currentContainer).find(".req-password2").parent().addClass("highlighted-container")
					returnValue = false;
				}
				else if ($(this).val() != $(currentContainer).find(".req-password2").val()) {
					$(this).parent().find(".input-error").css("display", "block").text("Your passwords don't match.");
					$(this).parent().addClass("highlighted-container");
					$(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "block").text("Your passwords don't match.");
					$(currentContainer).find(".req-password2").parent().addClass("highlighted-container")
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
					$(currentContainer).find(".req-password2").parent().find(".input-error").css("display", "none");
					$(currentContainer).find(".req-password2").parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Email field
			//  === REQUIRMENTS: not null, correct email format
			//  === SUPPORTED CLASSES: "req-email"
			//  =======================================================

			$(currentContainer).find(".req-email").each(function () {

				var isEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test($(this).val());

				if (!isEmail || $(this).val() == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Routing Number
			//  === REQUIRMENTS: json to validate if the bank exists
			//  === SUPPORTED CLASSES: "req-route"
			//  =======================================================

			$(currentContainer).find(".req-route").each(function () {
				var routingNumber = $(this).val();
				var $routingNumberTextBox = $(this);

				$.ajax
					(
						{
							type: "POST",
							url: "/admin/Validation.aspx/ValidateBankRoutingNumber",
							async: false,
							data: "{'routingNumber':'" + routingNumber + "'}",
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							beforeSend: function (xhr) {
								xhr.setRequestHeader("content-type",
													 "application/json; charset=utf-8");
							},
							success: function (msg) {
								var bankName = msg.d;

								if (bankName == "Not Found") {
									$routingNumberTextBox.parent().find(".input-error").css("display", "block");
									$routingNumberTextBox.parent().addClass("highlighted-container");
									$routingNumberTextBox.parent().find(".additional").html("Invalid routing number.");
									returnValue = false;
								}   // if
								else {
									$routingNumberTextBox.parent().find(".input-error").css("display", "none");
									$routingNumberTextBox.parent().removeClass("highlighted-container");
									$routingNumberTextBox.parent().find(".additional").html(bankName);
								}   // else
							}
						}
					)

				/*

				var isNumber = /^\d+$/.test($(this).val());

				if (!isNumber || $(this).val() == "") {
				$(this).parent().find(".input-error").css("display", "block");
				$(this).parent().addClass("highlighted-container");
				$(currentContainer).find(".req-route2").parent().find(".input-error").css("display", "none");
				$(currentContainer).find(".req-route2").parent().removeClass("highlighted-container");
				returnValue = false;
				}
				else if ($(this).val() != "" && $(currentContainer).find(".req-route2").val() == "") {
				$(this).parent().find(".input-error").css("display", "none");
				$(this).parent().removeClass("highlighted-container");
				$(currentContainer).find(".req-route2").parent().find(".input-error").css("display", "block");
				$(currentContainer).find(".req-route2").parent().addClass("highlighted-container")
				returnValue = false;
				}
				else if ($(this).val() != $(currentContainer).find(".req-route2").val()) {
				$(this).parent().find(".input-error").css("display", "inline").text("your routing number and confirmation don't match.");
				$(this).parent().addClass("highlighted-container");
				$(currentContainer).find(".req-route2").parent().find(".input-error").css("display", "inline").text("your routing number and confirmation don't match.");
				$(currentContainer).find(".req-route2").parent().addClass("highlighted-container")
				returnValue = false;
				}
				else {
				$(this).parent().find(".input-error").css("display", "none");
				$(this).parent().removeClass("highlighted-container");
				$(currentContainer).find(".req-route2").parent().find(".input-error").css("display", "none");
				$(currentContainer).find(".req-route2").parent().removeClass("highlighted-container");
				}
				*/
			});

			//  =======================================================
			//  === VAL TYPE: Email and Confirmation field
			//  === REQUIRMENTS: not null, correct email format, matches
			//  === SUPPORTED CLASSES: "req-email1","req-email2"
			//  =======================================================

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
					$(this).parent().find(".input-error").css("display", "block").text("Your email address and confirmation don't match.");
					$(this).parent().addClass("highlighted-container");
					$(currentContainer).find(".req-email2").parent().find(".input-error").css("display", "block").text("Your email address and confirmation don't match.");
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

			//  =======================================================
			//  === VAL TYPE: Date field
			//  === REQUIRMENTS: not null, correct date format
			//  === SUPPORTED CLASSES: "req-date"
			//  =======================================================

			$(currentContainer).find(".req-date").each(function () {

				var isDate = !/Invalid|NaN/.test(new Date($(this).val()));

				if (!isDate || $(this).val() == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Date field
			//  === REQUIRMENTS: not null, correct date format
			//  === SUPPORTED CLASSES: "req-date-mm-dd-yy"
			//  =======================================================

			$(currentContainer).find(".req-date-mm-dd-yy").each(function () {

				var isDate = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/i.test($(this).val());

				if (!isDate || $(this).val() == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Date field
			//  === REQUIRMENTS: can be null, correct date format
			//  === SUPPORTED CLASSES: "req-date-empty"
			//  =======================================================

			$(currentContainer).find(".req-date-empty").each(function () {

				var isDate = !/Invalid|NaN/.test(new Date($(this).val())) || $(this).val() == "";

				if (!isDate) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Date Drop Down Comparison
			//  === REQUIRMENTS: greater than date > less than date
			//  === SUPPORTED CLASSES: "req-dateddl-gt", "req-dateddl-lt"
			//  =======================================================

			$(currentContainer).find(".req-dateddl-gt").each(function () {

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
						$(this).parent().find(".input-error").css("display", "block");
						$(this).parent().addClass("highlighted-container");
						returnValue = false;
					}
					else {
						$(this).parent().find(".input-error").css("display", "none");
						$(this).parent().removeClass("highlighted-container");
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

			$(currentContainer).find(".req-url").each(function () {

				var isURL = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test($(this).val());

				if (!isURL || $(this).val() == "") {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});


			//  =======================================================
			//  === VAL TYPE: SSN field
			//  === REQUIRMENTS: correct ssn format
			//  === SUPPORTED CLASSES: "req-ssn"
			//  =======================================================

			$(currentContainer).find(".req-ssn").each(function () {

				var isSSN = /^(?!000)([0-9]\d{2}|7([0-9]\d|7[012]))([ -]?)(?!00)\d\d\3(?!0000)\d{4}$/i.test($(this).val());

				if ($(this).val() != "" && !isSSN) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});


			//  =======================================================
			//  === VAL TYPE: SSN field
			//  === REQUIRMENTS: must be 9 digits after dashes removed
			//  === SUPPORTED CLASSES: "req-ssn-tax"
			//  =======================================================

			$(currentContainer).find(".req-ssn-tax").each(function () {

				var strippedVal = $(this).val().replace(/-/g, "");
				var isValid = (strippedVal.length == 9) ? true : false;
				var isNumber = !isNaN(parseInt(strippedVal));

				if ($(this).val() != "" && (!isValid || !isNumber)) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: ISBN Field
			//  === REQUIRMENTS: Must be a valid ISBN or an empty string
			//  === SUPPORTED CLASSES: "req-isbn"
			//  =======================================================

			$(currentContainer).find(".req-isbn").each(function () {
				var isbnValue = $.trim($(this).val());
				var $isbnTextBox = $(this);
				var $bookId = $isbnTextBox.attr("bookId");

				if (isbnValue == "" || isbnValue.replace("-", "").length != 13) {
					$(this).parent().find(".input-error").html("Please enter a valid 13 digit ISBN without the dashes.");
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}   // if

				else if (isbnValue != "") {
					$.ajax
					(
						{
							type: "POST",
							url: "/admin/Validation.aspx/ValidateIsbn",
							async: false,
							data: "{'isbn':'" + isbnValue + "','bookId':'" + $bookId + "','validate10DigitIsbn':'false','validate13DigitIsbn':'true'}",
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							beforeSend: function (xhr) {
								xhr.setRequestHeader("content-type",
													 "application/json; charset=utf-8");
							},
							success: function (msg) {
								var isbnSuccess = msg.d;

								switch (isbnSuccess) {
									case 1:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "block");
											$isbnTextBox.parent().addClass("highlighted-container");
											$isbnTextBox.parent().find(".input-error").html("The isbn is already in our system.");
											returnValue = false;

											break;
										}   // case                                        
									case 2:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "block");
											$isbnTextBox.parent().find(".input-error").html("The isbn is invalid.");
											$isbnTextBox.parent().addClass("highlighted-container");
											returnValue = false;

											break;
										}   // case
									case 0:
									case 3:
									case 4:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "none");
											$isbnTextBox.parent().removeClass("highlighted-container");

											break;
										}   // case
									case 5:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "block");
											$isbnTextBox.parent().addClass("highlighted-container");
											$isbnTextBox.parent().find(".input-error").html("The isbn is already in use.");
											returnValue = false;
										}   // case
								}   // switch
							}   // success
						}   // ajax
					)
				}   // else if

				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});


			 //  =======================================================
			//  === VAL TYPE: Physical ISBN Field
			//  === REQUIRMENTS: Must be a valid ISBN or an empty string
			//  === SUPPORTED CLASSES: "opt-physical-isbn"
			//  =======================================================

			$(currentContainer).find(".opt-physical-isbn").each(function () {
				var isbnValue = $.trim($(this).val());
				var $isbnTextBox = $(this);
				var $bookId = $isbnTextBox.attr("bookId");
				var cleanedISBNLength = isbnValue.replace("-", "").length;

				if (cleanedISBNLength != 0 && (cleanedISBNLength != 10 && cleanedISBNLength != 13)) {
					$(this).parent().find(".input-error").html("Please enter a valid 10 or 13 digit ISBN without the dashes.");
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}   // if

				else if (isbnValue != "") {
					$.ajax
					(
						{
							type: "POST",
							url: "/admin/Validation.aspx/ValidateIsbn",
							async: false,
							data: "{'isbn':'" + isbnValue + "','bookId':'" + $bookId + "','validate10DigitIsbn':'true','validate13DigitIsbn':'true'}",
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							beforeSend: function (xhr) {
								xhr.setRequestHeader("content-type",
													 "application/json; charset=utf-8");
							},
							success: function (msg) {
								var isbnSuccess = msg.d;

								switch (isbnSuccess) {
									case 1:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "block");
											$isbnTextBox.parent().addClass("highlighted-container");
											$isbnTextBox.parent().find(".input-error").html("The isbn is already in our system.");
											returnValue = false;

											break;
										}   // case                                        
									case 2:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "block");
											$isbnTextBox.parent().find(".input-error").html("The isbn is invalid.");
											$isbnTextBox.parent().addClass("highlighted-container");
											returnValue = false;

											break;
										}   // case
									case 0:
									case 3:
									case 4:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "none");
											$isbnTextBox.parent().removeClass("highlighted-container");

											break;
										}   // case
									case 5:
										{
											$isbnTextBox.parent().find(".input-error").css("display", "none");
											$isbnTextBox.parent().removeClass("highlighted-container");
										}   // case
								}   // switch
							}   // success
						}   // ajax
					)
				}   // else if

				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}
			});

			//  =======================================================
			//  === VAL TYPE: Limited field 
			//  === REQUIRMENTS: none
			//  === SUPPORTED CLASSES: "max-character-length"
			//  =======================================================
			
			$(currentContainer).find(".max-character-length").each(function () {
				var limit = $(this).parent().find(".hidden-label").text();
															
				if ($(this).val().length > limit) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
					}	// if
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
					}	// else
			});

			//  =======================================================
			//  === VAL TYPE: Required and Limited field 
			//  === REQUIRMENTS: not null
			//  === SUPPORTED CLASSES: "max-character-length-req"
			//  =======================================================
		
			$(currentContainer).find(".max-character-length-req").each(function () {
				var upperLimit = $(this).parent().find(".hidden-label").text();
				var lowerLimit = 0;

				if ($(this).parent().find(".hidden-label-minlength") != null) {
					lowerLimit = $(this).parent().find(".hidden-label-minlength").text();
				}
											
				if ($.trim($(this).val()) == "" || $(this).val().length > upperLimit || $(this).val().length < lowerLimit) {
					$(this).parent().find(".input-error").css("display", "block");
					$(this).parent().addClass("highlighted-container");
					returnValue = false;
				}	// if
				else {
					$(this).parent().find(".input-error").css("display", "none");
					$(this).parent().removeClass("highlighted-container");
				}	// else
			});

			//  =======================================================
			//  === VAL TYPE: ALL Field
			//  === REQUIRMENTS: Automatic Fail
			//  === SUPPORTED CLASSES: "req-push-fail"
			//  =======================================================

			$(currentContainer).find(".req-push-fail").each(function () {
				$(this).parent().find(".input-error").css("display", "block");
				$(this).parent().addClass("highlighted-container");
				returnValue = false;
			});



		}); // each

		

		// We have failed validation: scroll to the first field that failed and give it focus
		if ( !returnValue && ignoreScroll == false ) {

			//get the number of error on the page...
			errorCount = $(".highlighted-container").size();

			// determine the string to display to the user for the number of errors
			if (errorCount > 1) { $("#form-errors span").text("There are " + errorCount + " items that need your attention.");
			} else {  $("#form-errors span").text("There is one item that need attention."); }

			// Scroll to the first failed field 
			$.scrollTo( $(".highlighted-container:first").offset().top - 150, 1000, { 
				offset: {top:-10},
				onAfter:function(){
					// Give that field focus
					$(".highlighted-container:first input").focus();
					// Hide the .net error response label
					$(".output-error").css("display","none");
					// display the error modal
					//$.openModal({target:'#form-errors', width:'420px'})
				} 
			});
			
		}


		return returnValue;
	}

	