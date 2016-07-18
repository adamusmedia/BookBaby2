
(function ($) {

    var avlmodal;
    $.openModal = function (settings) {
        settings = jQuery.extend({
            width: "330px", 				// width of the modal
            height: "auto", 				// height of the modal
            opacity: "0.7", 				// opacity of the overlay layer
            overlayImage: "/plugins/avlmodal/images/overlay.png", 			// background image of the overlay
            overlayColor: "#000", 		// background color of the overlay
            modalColor: "#fafafa", 	// background color of the modal
            overlayShowSpeed: 500, 		// fade in speed of the overlay layer / modal
            modalShowSpeed: 400, 		// fade in speed of the modal object / modal
            target: "", 					// target html element identifier to be used for the modal's content
            url: "", 					// target url to be loaded using ajax for the modal's content
            parameters: {}, 				// any parameters to be passed for ajax loads
            cache: false, 				// ajax content cache
            onShow: function () { }, 		// function to be executed when a modal is to be displayed
            onComplete: function () { }, 	// function to be executed when modal is fully displayed 
            onSuccess: function () { }, 	// function to be executed upon AJAX data loaded completely
            onError: function () { } 		// function to be executed upon ajax failure
        }, settings);
        // execute code when a modal is to be displayed
        settings.onShow();
        // assign the settings for the modal; to be used in the sizing of the overlay
        avlmodal = settings;
        // verify a valid data source for the modal
        if (validateData(settings)) {
            // hack: hide the select boxes from ie6 users
            if (isIE6()) { hideSelects(); }
            // load the modal's content 
            loadModalContent(settings);
        }
        // remove any html that kept in the id holder for this modal window...
        $(".qty-error-holder").html("");
        return this;
    } // $.openModal()

    $.closeModal = function (settings) {
        settings = jQuery.extend({
            overlayHideSpeed: 500, 	// fade out speed of the ovelay layer / modal
            modalHideSpeed: 400, 	// fade out speed of the modal object / modal
            target: "", 				// target html element identifier to be used for the modal's content
            onClose: function () { }, 	// function to be executed before the modal is closed EX. function() { alert("It is loaded"); }
            onHide: function () { } 	// function to be executed after the modal has been closed
        }, settings);
        // execute code before the modal is closed
        settings.onClose();
        // fade out the modal box
        $("#avlModal").css("display", "none")
        // readd the positioning class to the modal content												   
        $(settings.target).addClass("avlModalHideClass");
        // remove the modal container from the modal content
        $("#avlModal").children().unwrap();
        // fade out the overlay layer
        $("#avlOverlay").fadeOut(settings.overlayHideSpeed, function () {
            // remove the overlay from the page's html
            $("#avlOverlay").remove();
            // hack: show the select boxes for ie6 users
            if (isIE6()) { showSelects(); }
            // execute code after the modal is removed from the html
            settings.onHide();
        });
        return this;
    } // $.closeModal()

    function validateData(modalObject) {
        var returnValue = false;
        // if there is valid data to populate the modal, return true
        if ((modalObject.target != "" && $(modalObject.target).length) || (modalObject.url != "")) {
            returnValue = true;
        }
        return returnValue;
    } //validateData()

    function setOverlayLayerSize() {
        if (isIE6()) {
            $('#avlOverlay').css({
                position: 'absolute',
                top: '0px',
                left: '0px',
                height: document.documentElement.clientHeight + "px",
                width: document.documentElement.clientWidth + "px"
            });
        } else {
            $('#avlOverlay').css({
                position: 'fixed',
                top: '0px',
                left: '0px',
                height: '100%',
                width: '100%'
            });
        }   // else

    } // setOverlayLayerSize()

    function showOverlayLayer(modalObject, modalContent) {
        // make sure that an overlay layer does not already exist in the html
        if (!($("#avlOverlay").length)) {
            // inject the overlay layer into the html
            $("body").append("<div id='avlOverlay'><!-- --></div>");
            // set the attributes of the new overlay layer
            $("#avlOverlay").css({
                position: "absolute",
                zIndex: "9999",
                left: "0",
                top: "0",
                opacity: modalObject.opacity,
                display: "none"
            });
            // set the proper display mode of the overlay layer
            if (modalObject.overlayImage != "") {
                // set the backgroun image of the overlay layer
                $("#avlOverlay").css({ backgroundImage: "url(" + modalObject.overlayImage + ")" });
            } else {
                // set the background color of the overlay layer
                $("#avlOverlay").css({ backgroundColor: modalObject.overlayColor });
            }
            // set the size of the overlay layer
            setOverlayLayerSize();
            // fade in the overlay layer 
            $("#avlOverlay").fadeIn(modalObject.overlayShowSpeed, function () {
                showModal(modalObject, modalContent)
            });
            // assign a click event to the overlay layer, allowing the user to exit the layer with a click
            //$("#avlOverlay").click(function() {
            //	$.closeModal();
            //});
        }
    } // showOverlayLayer()

    function setModalPosition() {
        var leftPosition, topPosition;
        // find the left position of the modal
        if ($("#avlModal").width() < $(window).width()) {
            // if the modal's width is less than the viewport, calculate the left position attribute
            leftPosition = (document.documentElement.offsetWidth - $("#avlModal").width()) / 2;
        } else {
            // if the modal's width is greater than or equal to the viewport, calculate the left position attribute
            leftPosition = document.documentElement.scrollLeft + 20;
        }
        // find the top position of the modal
        if ($("#avlModal").height() < $(window).height()) {
            // if the modal's height is less than the viewport, calculate the top position attribute
            topPosition = (document.documentElement.scrollTop || document.body.scrollTop) + ($(window).height() - $("#avlModal").height()) / 2;
        } else {
            // if the modal's height is greater than or equal to the viewport, calculate the top position attribute
            topPosition = (document.documentElement.scrollTop || document.body.scrollTop) + 20;
        }
        // assign the calculated values to an array
        var positions = {
            left: leftPosition + "px",
            top: topPosition + "px"
        };
        //move the modal to the new position
        $("#avlModal").css(positions);
    } // setModalPosition()

    function loadModalContent(modalObject) {
        // load the content for the modal
        if (modalObject.target != "") {
            // show the overlay layer
            showOverlayLayer(modalObject, $(modalObject.target));
        } else {
            // show the modal with content loaded from a url using ajax
            // execute the error code upon ajax failure
            $.ajax({
                url: modalObject.url,
                data: modalObject.parameters,
                cache: modalObject.cache,
                dataType: "html",
                method: "GET",
                success: function (data) {
                    modalObject.onSuccess();
                    showOverlayLayer(modalObject, data);
                }
                //,error: modalObject.onError()
            });
        }
    } // loadModalContent(object)

    function showModal(modalObject, modalContent) {
        // wrap the selected modal content container with a modal div container, and remove the positioning class of the content div
        $(modalContent).wrap("<div id='avlModal'><!-- --></div>")
					   .removeClass("avlModalHideClass");
        // set the attributes of the new modal element
        $("#avlModal").css({
            position: "absolute",
            zIndex: "10000",
            left: "0",
            top: "0",
            width: modalObject.width,
            height: modalObject.height,
            backgroundColor: modalObject.modalColor,
            display: "none"
        });
        // set the position of the modal element
        setModalPosition();

        // bind the close button for the modal window...
        $('#avlModal').find(".modal-button").bind('click', function () {
            $.closeModal();
        })  // bind()

        // bind the print button for the print modal window...
        $('#avlModal').find("#print-link").bind('click', function () {
            $('.printable').print();
            return false;
        })  // bind()

        // bind the close button for the print modal window...
        $('#avlModal').find("#close-link").bind('click', function () {
            $.closeModal();
        })  // bind()

        // fade in the modal element
        $("#avlModal").css("display", "block");
        // execute the code for the overlay/modal display
        modalObject.onComplete();
    } // showModal(object,string)

    function hideSelects() {
        // convert all drop downs of the page to a span
        // neglect any drop downs with the ".no-replace" class
        $("select").not(".hidden-dropdown").each(function () {
            $(this)
				.after("<span class='replacement'></span>").next()
				.addClass($(this).attr('class'))
				.attr('id', $(this).attr('id'))
				.html($(this).find("option:selected").text())
				.width($(this).width() - 4)
				.height($(this).height() - 4)
				.prev().addClass("hidden-dropdown").css("display", "none");
        });
    } // hideSelects()

    function showSelects() {
        // remove all replacement drop downs from the html
        $(".replacement").each(function () {
            $(this).remove();
        });
        // convert all drop downs back to normal
        $(".hidden-dropdown").each(function () {
            $(this).removeClass("hidden-dropdown").css({
                display: "block"
            });
        });
    } // showSelects()

    function isIE6() {
        return $.browser.msie && /msie 6\.0/i.test(navigator.userAgent);
    }

    $(window).resize(function () {
        // set the height and width of the overlay layer
        setOverlayLayerSize();
        // set the top and left position of the modal element
        setModalPosition();
    });

})(jQuery);

