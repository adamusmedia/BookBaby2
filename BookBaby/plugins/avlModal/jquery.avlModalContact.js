/* 
    Author: Kris Jackson

    TOC:
    =====================================================================

    (Function) $.openContactModal
    (Function) $.closeContactModal

    (Function) validateData(array)
    (Function) loadModalContent(object)
    (Function) showOverlayLayer(object,string)
    (Function) setOverlayLayerSize()
    (Function) showModal(object,string)
    (Function) setModalPosition(string,elem)
    (Function) hideSelects()
    (Function) showSelects()
    (Function) isIE6()
        
    (Binding) Window : resize

    USAGE:
    =====================================================================

    (To open)

        return $.openContactModal({target:'#modalID'});

    (To close)

        return $.closeContactModal({target:'#modalID'});

    (Modal structure)

	    <div id="modalID" class="avlContactModal-container">
            <div class="avlContactModal-wrapper">
                <div class="avlContactModal-header">Modal Header Text</div>
                <div class="avlContactModal-content">Modal content text</div>
            </div><!-- .avlContactModal-wrapper -->
        </div><!-- .avlContactModal-container -->

    (Renders As)

	    <div id="modalID" class="avlContactModal-container">
            <div class="avlContactModal-wrapper">
                <a href='#close' class='avlContactModal-close' title='Close this modal window'>close modal</a>
                <div class="avlContactModal-header">Modal Header Text</div>
                <div class="avlContactModal-content"><p class="avlContactModal-content-wrapper">Modal content text</p></div>
            </div><!-- .avlContactModal-wrapper -->
        </div><!-- .avlContactModal-container -->
    
   (Button Structure) Goes inside .avlContactModal-content

        <div class="modal-buttons">
			<button type="button" id="" onclick="" class="button secondary-site-button">Yes</button>
			<button type="button" id="" onclick="" class="button give-focus primary-site-button">No</button>
		</div>

*/

//  === (Function) $.openContactModal =====================================================================

(function ($) {

    var avlContactModal;

    $.openContactModal = function (settings) {
        // user settings for the open modal call
        settings = jQuery.extend({
            width: "700px", 			// width of the modal
            height: "auto", 			// height of the modal
            overlayOpacity: "0.7", 			// opacity of the overlay layer
            overlayImage: "", 			    // background image of the overlay
            overlayColor: "#000", 		    // background color of the overlay
            overlayShowSpeed: 500, 		        // fade in speed of the overlay layer / modal
            modalShowSpeed: 400, 		        // fade in speed of the modal object / modal
            showCloseButton: true,             // will add the close button to the upper right corner of the modal
            closeButtonFunction: "",               // executes when the close button has been pressed
            target: "", 				// target html element identifier to be used for the modal's content
            url: "", 				// target url to be loaded using ajax for the modal's content
            parameters: {}, 				// any parameters to be passed for ajax loads
            cache: false, 			// ajax content cache
            onShow: function () { }, 	// function to be executed when a modal is to be displayed
            onComplete: function () { }, 	// function to be executed when modal is fully displayed 
            onSuccess: function () { }, 	// function to be executed upon AJAX data loaded completely
            onError: function () { }   // function to be executed upon ajax failure
        }, settings);

        // execute code when a modal is to be displayed
        settings.onShow();

        // assign the settings for the modal; to be used in the sizing of the overlay
        avlContactModal = settings;

        // verify a valid data source for the modal
        if (validateData(settings)) {
            // hack: hide the select boxes from ie6 users
            if (isIE6()) { hideSelects(); }
            // load the modal's content 
            loadModalContent(settings);
        }   // if

        return false;
    } // $.openContactModal()

    //  === (Function) $.closeContactModal =====================================================================

    $.closeContactModal = function (settings) {
        // user settings for the close modal call
        settings = jQuery.extend({
            overlayHideSpeed: 500, 	            // fade out speed of the ovelay layer / modal
            modalHideSpeed: 400, 	            // fade out speed of the modal object / modal
            target: "", 				// target element to close
            onClose: function () { }, 	// function to be executed before the modal is closed EX. function() { alert("It is loaded"); }
            onHide: function () { } 	// function to be executed after the modal has been closed
        }, settings);

        // find out if there is more than one modal visible at this time
        var multipleModals = ($(".avlContactModal").size() > 1) ? true : false;

        // execute code before the modal is closed
        settings.onClose();

        // fade out the modal box
        $(settings.target).parent().css("display", "none");

        // re-add the positioning class to the modal content												   
        $(settings.target).addClass("avlContactModal-container");

        // remove the modal container from the modal content
        $(settings.target).parent().children().unwrap();

        // fade out the overlay layer
        if (!multipleModals) {
            $("#avlOverlay").fadeOut(settings.overlayHideSpeed, function () {
                // remove the overlay from the page's html
                $("#avlOverlay").remove();
                // hack: show the select boxes for ie6 users
                if (isIE6()) { showSelects(); }
                // execute code after the modal is removed from the html
                settings.onHide();
            });
        } else {
            // since there was still an existing modal, we need to move it above the overlay screen
            $(".avlContactModal").css("zIndex", "10000");
        }   // else
        //Reshow hidden java app.
        if ($('object embed').size() > 0 && $('object embed').attr('type').match('java')) {
            $('embed').css({ width: '', height: '', left: '', top: '' });
        }

        return false;
    } // $.closeContactModal()


    //  === (Function) validateData(array) =====================================================================

    function validateData(modalObject) {
        // determine if there is an HTML target or a url for an ajax call
        return ((modalObject.target != "" && $(modalObject.target).length) || (modalObject.url != "")) ? true : false;
    } //validateData()

    //  === (Function) loadModalContent(object) =====================================================================

    function loadModalContent(modalObject) {
        // load the content for the modal
        if (modalObject.target != "") {
            // show the overlay layer
            showOverlayLayer(modalObject, $(modalObject.target));
        }   // if 
        else {
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
                }   // success
            }); // ajax
        }   // else
    } // loadModalContent(object)

    //  === (Function) showOverlayLayer(object,string) =====================================================================

    function showOverlayLayer(modalObject, modalContent) {
        // make sure that an overlay layer does not already exist in the html
        if (!($("#avlOverlay").length)) {

            // inject the overlay layer into the html
            $(modalContent).parent().append("<div id='avlOverlay'><!-- --></div>");

            // set the attributes of the new overlay layer
            $("#avlOverlay").css({
                position: "absolute",
                zIndex: "9999",
                left: "0",
                top: "0",
                opacity: modalObject.overlayOpacity,
                display: "none"
            }); // css

            // set the proper display mode of the overlay layer
            if (modalObject.overlayImage != "") {
                // set the backgroun image of the overlay layer
                $("#avlOverlay").css({ backgroundImage: "url(" + modalObject.overlayImage + ")" });
            }   // if
            else {
                // set the background color of the overlay layer
                $("#avlOverlay").css({ backgroundColor: modalObject.overlayColor });
            }   // else

            // set the size of the overlay layer
            setOverlayLayerSize();

            // fade in the overlay layer 
            $("#avlOverlay").fadeIn(modalObject.overlayShowSpeed, function () {
                showModal(modalObject, modalContent)
            }); // fadeIn()
        }   // if 
        else {
            showModal(modalObject, modalContent)
        }   // else
    } // showOverlayLayer(object,string)

    //  === (Function) setOverlayLayerSize() =====================================================================

    function setOverlayLayerSize() {
        // aply the styles to the overlay element, filling the entire screen
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

    //  === (Function) showModal(object,string) =====================================================================

    function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }

    function showModal(modalObject, modalContent) {

        var modalWrapperPadding;

        // find out if there are now more than one modals existing... if so recess the original behind the overlay screen
        if ($(".avlContactModal").size() > 0) {
            $(".avlContactModal").css("zIndex", "9998");
        }   // if

        // wrap the selected modal content container with a modal div container, and remove the positioning class of the content div
        $(modalContent)
            .wrap("<div class='avlContactModal' />")
		    .removeClass("avlContactModal-container");


        // add an inner paragraph wrapper for the modal content to stop inline elements and just text, from forcing scrollbars when they are not needed
        if ($(modalContent).find(".avlContactModal").find("p.avlContactModal-content-wrapper").size() == 0) {
            $(modalContent).find(".avlContactModal-content").wrapInner("<p class='avlContactModal-content-wrapper' />");
        }   // if 

        // add the close button to the modal if user has not disabled
        if (modalObject.showCloseButton) {
            if ($(modalContent).find(".avlContactModal-wrapper").find(".avlContactModal-close").size() < 1) {
                $(modalContent).find(".avlContactModal-wrapper").append("<a href='#close' class='avlContactModal-close' title='Close this modal window'>close modal</a>");
                $(modalContent).find(".avlContactModal-close").click(function () {
                    return $.closeContactModal({ target: "#" + $(modalContent).attr('id'), onClose: function () { modalObject.closeButtonFunction } });
                }); // click()
            }   // if
        }   // if

        // try to parse the modal's inner wrapper (bug fix for ie not seeing this value?)
        modalWrapperPadding = parseInt((modalContent).find(".avlContactModal-wrapper").css("padding"));

        // if this value is not a number, set it to 0 
        if (!isNumber(modalWrapperPadding)) {
            modalWrapperPadding = 0;
        }   // if

        var modalHeight = parseInt(modalObject.height);
        // if this value is not a number, set it to 0 
        if (!isNumber(modalHeight)) {
            modalHeight = "575";
        }   // if

        // set the attributes of the new modal element
        $(modalContent).parent()
            .css({
                zIndex: "10000",
                width: parseInt(modalObject.width) + modalWrapperPadding,
                height: modalHeight + modalWrapperPadding
            })
            .data("initialHeight", $(modalContent).parent().height())
            .data("initialWidth", $(modalContent).parent().width())
            .data("modalShowSpeed", modalObject.modalShowSpeed);

        // set the position of the modal element
        setModalPosition("show", $(modalContent).parent());
       

        // execute the code for the overlay/modal display
        modalObject.onComplete();
        //hide java-apps so they do not overlay the modal. There is a 1px height and width because they cannot be completely hidden.
        if ($('object embed').size() > 0 && $('object embed').attr('type').match('java')) {
            $('embed').css({ width: '1px', height: '1px', left: '0px', top: '0px' });
        }
    } // showModal(object,string)

    //  === (Function) setModalPosition(string,elem) =====================================================================

    function setModalPosition(action, $currentModal) {

        var modalHeight,
            modalWidth,
            modalMarginTop,
            modalMarginLeft;

        $currentModal.each(function () {

            var $thisModal = $(this),
                $thisModalsHeader = $thisModal.find(".avlContactModal-header"),
                $thisModalsContent = $thisModal.find(".avlContactModal-content"),
                $closeButton = $thisModal.find(".avlContactModal-close"),
                unexplainedAdj = 5,
                headerHeight = ($thisModalsHeader.size() > 0) ? $thisModalsHeader.outerHeight(true) : 0,
                closeButtonHeightAdj = ($closeButton.size() > 0) ? ($closeButton.height() / 2) - unexplainedAdj : 0,
                closeButtonWidthAdj = ($closeButton.size() > 0) ? ($closeButton.width() / 2) - unexplainedAdj : 0,
                windowBufferAdj = 40,
                modalPadding = 40,
                windowHeight = $(window).height();
            windowWidth = $(window).width();

            // the height of the modal is greater than or equal to the window height
            if (($thisModal.data("initialHeight") + closeButtonHeightAdj + windowBufferAdj) >= windowHeight) {
                modalHeight = windowHeight - windowBufferAdj - closeButtonHeightAdj;
            }   // if
                // the height of the modal is less than to the window height
            else {
                modalHeight = $thisModal.data("initialHeight");
            }   // else

            // the width of the modal is greater than or equal to the window width
            if (($thisModal.data("initialWidth") + closeButtonWidthAdj + windowBufferAdj) >= windowWidth) {
                modalWidth = windowWidth - windowBufferAdj - closeButtonWidthAdj;
            }   // if
                // the width of the modal is less than to the window width
            else {
                modalWidth = $thisModal.data("initialWidth");
            }   // else

            // set the negative margins
            modalMarginTop = -(((modalHeight + (windowBufferAdj / 2)) / 2) - closeButtonHeightAdj);
            modalMarginLeft = -(((modalWidth + (windowBufferAdj / 2)) / 2) - closeButtonWidthAdj);

            // set the height of the modal's content section
            $thisModalsContent
                .height(modalHeight - modalPadding - headerHeight);

            if (action === "show") {
                // hide the wrapper so we can fade it in when the modal is done animating open
                $thisModal.find(".avlContactModal-wrapper").hide();
                $thisModal
			        .css({
			            position: "fixed",
			            top: "50%",
			            left: "50%",
			            marginTop: "0",
			            marginLeft: "0",
			            height: "40px",
			            width: "0",
			            display: "block"
			        })
			        .animate({
			            marginLeft: modalMarginLeft,
			            width: modalWidth
			        }, $thisModal.data("modalShowSpeed"), "easeInOutExpo", function () {
			            $thisModal
				            .animate({
				                marginTop: modalMarginTop,
				                height: modalHeight
				            }, $thisModal.data("modalShowSpeed"), "easeInOutExpo", function () {
				                $thisModal.find(".avlContactModal-wrapper")
                                    .fadeIn(800, function () {
                                        $(this).parent().parent()
                                            .css({ minHeight: headerHeight + (modalPadding / 2) }) // set the minHeight of the modal for obvious reasons
                                    });
				            });
			        });
            }   // if

            if (action === "resize") {
                $thisModal
			        .css({
			            marginTop: modalMarginTop,
			            marginLeft: modalMarginLeft,
			            height: modalHeight,
			            width: modalWidth,
			            display: "block"
			        })
            }   // if

        }); // each()
    } // setModalPosition(object,string)

    //  === (Function) hideSelects() =====================================================================

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
        }); // each
    } // hideSelects()

    //  === (Function) showSelects() =====================================================================

    function showSelects() {
        // remove all replacement drop downs from the html
        $(".replacement").each(function () {
            $(this).remove();
        }); // each
        // convert all drop downs back to normal
        $(".hidden-dropdown").each(function () {
            $(this)
                .removeClass("hidden-dropdown")
                .css({ display: "block" });
        }); // each
    } // showSelects()

    //  === (Function) isIE6() =====================================================================

    function isIE6() {
        return $.browser.msie && /msie 6\.0/i.test(navigator.userAgent);
    }

    //  === (Binding) Window : resize =====================================================================

    $(window).resize(function () {
        if ($(".avlContactModal").is(":visible")) {
            // set the height and width of the overlay layer
            setOverlayLayerSize();
            // set the top and left position of the modal element
            setModalPosition("resize", $(".avlContactModal"));
        }   // if
    });

})(jQuery);

