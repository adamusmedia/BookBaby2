/* 
Author: Kris Jackson

TOC:
=====================================================================

(Function) $.openModal
(Function) $.closeModal

(Function) fadeOutModal(array,bool)
(Function) removeOverlay(array)
(Function) cleanUpModals(array,bool)
(Function) validateData(array)
(Function) loadModalContent(object)
(Function) showOverlayLayer(object,string)
(Function) setOverlayLayerSize()
(Function) showModal(object,string)
(Function) setModalPosition(string,elem)
(Function) hideSelects()
(Function) showSelects()
(Function) isIE6()
(Function) getTransitionEnd()
(Function) goForTransitions()
        
(Binding) Window : resize

USAGE:
=====================================================================

(To open)

return $.openModal({target:'#modalID'});

(To close)

return $.closeModal({target:'#modalID'});

(Modal structure)

<div id="modalID" class="avlModal-container">
    <div class="avlModal-wrapper">
        <div class="avlModal-header">Modal Header Text</div>
        <div class="avlModal-content">Modal content text</div>
    </div><!-- .avlModal-wrapper -->
</div><!-- .avlModal-container -->

(Renders As)

<div id="modalID" class="avlModal-container">
    <div class="avlModal-wrapper">
        <a href='#close' class='avlModal-close' title='Close this modal window'>close modal</a>
        <div class="avlModal-header">Modal Header Text</div>
        <div class="avlModal-content"><div class="avlModal-content-wrapper">Modal content text</p></div>
    </div><!-- .avlModal-wrapper -->
</div><!-- .avlModal-container -->
    
(Button Structure) Goes inside .avlModal-content

<div class="modal-buttons">
<button type="button" id="" onclick="" class="button secondary-site-button">Yes</button>
<button type="button" id="" onclick="" class="button give-focus primary-site-button">No</button>
</div>

*/

//  === (Function) $.openModal =====================================================================

(function ($) {

	var avlmodal;

	$.openModal = function (settings) {
		// user settings for the open modal call
		settings = jQuery.extend({
			width: "700px", 			// width of the modal
			height: null, 			// height of the modal
			overlayOpacity: "0.5", 			// opacity of the overlay layer
			overlayImage: "", 			    // background image of the overlay
			overlayColor: "#000", 		    // background color of the overlay
			overlayShowSpeed: 500, 		        // fade in speed of the overlay layer / modal
			modalShowSpeed: 400, 		        // fade in speed of the modal object / modal
			useTransitions: true,             // if browser capable, use css transitions over animation
			showCloseButton: true,             // will add the close button to the upper right corner of the modal
			closeButtonFunction: function () { },  // executes when the close button has been pressed
			target: "", 				// target html element identifier to be used for the modal's content
			url: "", 				// target url to be loaded using ajax for the modal's content
			parameters: {}, 				// any parameters to be passed for ajax loads
			cache: false, 			// ajax content cache
			onShow: function () { }, 	// function to be executed when a modal is to be displayed
			onComplete: function () { }, 	// function to be executed when modal is fully displayed 
			onSuccess: function () { }, 	// function to be executed upon AJAX data loaded completely
			onError: function () { }   // function to be executed upon ajax failure
		}, settings);

		// make sure this modal is not already open (failsafe)
		if ($(settings.target).parent().hasClass("avlModal")) { return false; }


		// bind the close button...
		$(settings.target).find(".avlModal-close").unbind("click").bind("click", function () {
			return $.closeModal({ target: "#" + $(settings.target).attr("id"), onClose: settings.closeButtonFunction });
		}); // on

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
		}   // if

		return false;
	} // $.openModal()

	//  === (Function) $.openModal =====================================================================

	$.closeModal = function (settings) {
		// user settings for the close modal call
		settings = jQuery.extend({
			overlayHideSpeed: 500, 	            // fade out speed of the ovelay layer / modal
			modalHideSpeed: 400, 	            // fade out speed of the modal object / modal
			target: "", 				// target element to close
			useTransitions: true,             // if browser capable, use css transitions over animation
			onClose: function () { }, 	// function to be executed before the modal is closed EX. function() { alert("It is loaded"); }
			onHide: function () { } 	// function to be executed after the modal has been closed
		}, settings);

		// find out if there is more than one modal visible at this time
		var multipleModals = ($(".avlModal").size() > 1) ? true : false,
    		n,
			l;

		// execute code before the modal is closed
		settings.onClose(settings);


		//Responsive Check for Modal Content Resize
		//find and remove the current Modal from the array
		for (n = 0, l = OpenModals.length; n < l; n++) {
			if ($(settings.target).parent()[0] == OpenModals[n].modal) {
				OpenModals.splice(n, 1);
				break;
			}
		}



		// run the transitions for closing the modal
		if (goForTransitions(settings.useTransitions)) {
			// get the css transition's end
			var transitionEnd = getTransitionEnd();
			// add the class to simulate the modal close
			$(settings.target).find(".avlModal-wrapper").addClass("hide");
			// fade out the overlay
			fadeOutOverlay(settings, multipleModals)
			// transitions callback
			$(settings.target).find(".avlModal-wrapper")[0].addEventListener(transitionEnd, function (event) {
				// remove this event listener
				$(settings.target).find(".avlModal-wrapper")[0].removeEventListener(transitionEnd, arguments.callee, false);
				// remove the hidden class
				$(settings.target).find(".avlModal-wrapper").removeClass("hide").removeClass("show");
				// re-add the positioning class to the modal content												   
				$(settings.target).addClass("avlModal-container");
				// clean up the modals
				cleanUpModals(settings, multipleModals);
			}, false);
		}   // if
			// fallback animation for closing modals
		else {
			// fade out the overlay
			fadeOutOverlay(settings, multipleModals)
			// re-add the positioning class to the modal content												   
			$(settings.target).addClass("avlModal-container");
			// clean up the modals
			cleanUpModals(settings, multipleModals);
		}   // else


		return false;
	} // $.closeModal()

	//  === (Function) fadeOutOverlay() =====================================================================

	function fadeOutOverlay(settings, multipleModals) {
		if (!multipleModals) {
			// unblur the content
			$("#site-container").removeClass("overlay-helper");
			// hide the overlay...with animation fallback
			$("#avlOverlay").fadeOut(settings.overlayHideSpeed, function () {
				// remove the overlay, show selects for old ie, and run callback for final function
				removeOverlay(settings);
			});
		}   // if
	} //fadeOutOverlay()

	//  === (Function) removeOverlay() =====================================================================

	function removeOverlay(settings) {
		// remove the overlay from the page's html
		$("#avlOverlay").remove();
		// hack: show the select boxes for ie6 users
		if (isIE6()) { showSelects(); }
		// execute code after the modal is removed from the html
		settings.onHide();
	}   // removeOverlay

	//  === (Function) cleanUpModals() =====================================================================

	function cleanUpModals(settings, multipleModals) {
		// remove the modal container from the modal content
		if ($(settings.target).parent().hasClass('avlModal')) {
			// remove the modal container from the modal content
			$(settings.target).unwrap();
		}        // fade out the overlay layer
		if (multipleModals) {
			// since there was still an existing modal, we need to move it above the overlay screen
			$(".avlModal").css("zIndex", "10000");
		}   // else
		//Reshow hidden java app.
		if (($('object embed[type]').size() > 0 && $('object embed[type]').attr('type').match('java')) || ($('object[codeBase]').size() > 0 && $('object[codeBase]').attr('codeBase').match('java'))) {
			$('object').parent().css({ width: '100%', height: '', position: 'static', right: '', bottom: '', overflow: 'show' });
		}
		//reset max-size on content
		$(settings.target).find(".avlModal-content").css({ 'max-height': '', 'height': '' });
	} //cleanUpModals()

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

			// fade in the overlay layer and blur style
			$("#site-container").addClass("overlay-helper");
			$("#avlOverlay").fadeIn(modalObject.overlayShowSpeed, function () {
			}); // fadeIn()
			// moved out so happens at same time
			showModal(modalObject, modalContent)
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

		var modalWrapperPadding,
    		modalInnerContent,
    		$modal,
    		modal;

		// find out if there are now more than one modals existing... if so recess the original behind the overlay screen
		if ($(".avlModal").size() > 0) {
			$(".avlModal").css("zIndex", "9998");
		}   // if

		// wrap the selected modal content container with a modal div container, and remove the positioning class of the content div
		$(modalContent)
            .wrap("<div class='avlModal' />")
		    .removeClass("avlModal-container");
		$modal = $(modalContent).parent();
		// add an inner paragraph wrapper for the modal content to stop inline elements and just text, from forcing scrollbars when they are not needed
		if ($(modalContent).find(".avlModal-content-wrapper").size() == 0) {
			$(modalContent).find(".avlModal-content").wrapInner("<div class='avlModal-content-wrapper' />");
			$(modalContent)
            .data("initialHeight", $modal.height())
            .data("initialWidth", parseInt(modalObject.width))
            .data("modalShowSpeed", modalObject.modalShowSpeed)
			.data("initialContentHeight", $(modalContent).find('.avlModal-content').height());
		}   // if 
		modalInnerContent = $(modalContent).find('.avlModal-content-wrapper')[0];

		// add then close button to the modal if user has not disabled, or if there is not already a close button present
		if (modalObject.showCloseButton && $(modalObject.target).find(".avlModal-close").size() == 0) {
			if ($(modalContent).find(".avlModal-wrapper").find(".avlModal-close").size() < 1) {
				$(modalContent).find(".avlModal-wrapper").append("<a href='#close' class='avlModal-close' title='Close this modal window'><i id='closeModalIcon' class='icon-cancel-circled'></i></a>");
				$(modalContent).find(".avlModal-close").attr('onclick', "return $.closeModal({ target: '#" + $(modalContent).attr('id') + "', onClose:" + modalObject.closeButtonFunction + "});");
			}   // if
		}   // if

		// try to parse the modal's inner wrapper (bug fix for ie not seeing this value?)
		modalWrapperPadding = parseInt((modalContent).find(".avlModal-wrapper").css("padding"));

		// if this value is not a number, set it to 0 
		if (!isNumber(modalWrapperPadding)) {
			modalWrapperPadding = 0;
		}   // if

		// set the attributes of the new modal element
		$modal
            .css({
            	zIndex: "10000",
            	width: parseInt(modalObject.width) + modalWrapperPadding,
            	height: 'auto'
            });
		

		// set the position of the modal element
		setModalPosition("show", $modal, modalObject);

		//Responsive Check for Modal Content Resize
		//Save the Modal Information
		OpenModals.push({ modal: $modal[0], modalContent: modalInnerContent, previousHeight: modalInnerContent.scrollHeight });
		//If it is the first open modal start the loop
		if (OpenModals.length == 1) {
			animloop();
		}

		//hide java-apps so they do not overlay the modal. There is a 1px height and width because they cannot be completely hidden.
		if (($('object embed[type]').size() > 0 && $('object embed[type]').attr('type').match('java')) || ($('object[codeBase]').size() > 0 && $('object[codeBase]').attr('codeBase').match('java'))) {
			$('object').parent().css({ width: '1px', top: '99%', height: '1px', right: '0px', bottom: '0px', position: 'absolute', overflow: 'hidden' });
		}
	} // showModal(object,string)

	//  === (Function) setModalPosition(string,elem) =====================================================================

	setModalPosition = function (action, $currentModal, modalObject) {

		var modalHeight,
            modalWidth,
            modalMarginTop,
            modalMarginLeft;

		$currentModal.each(function () {

			var $thisModal = $(this),
				modalContent = $thisModal.children()[0],
                $thisModalsHeader = $thisModal.find(".avlModal-header"),
                $thisModalsContent = $thisModal.find(".avlModal-content"),
                $closeButton = $thisModal.find(".avlModal-close"),
                $thisModalsWrapper = $thisModal.find(".avlModal-wrapper"),
                //thisModalsWrapperBorderSize = $thisModalsWrapper.css("border-left-width").replace("px", "") * 2,
                thisModalsWrapperBorderSize = 6,
                unexplainedAdj = 5,
                headerHeight = ($thisModalsHeader.size() > 0) ? $thisModalsHeader.outerHeight(true) : 0,
                closeButtonHeightAdj = ($closeButton.size() > 0) ? ($closeButton.height() / 3) - unexplainedAdj : 0,
                closeButtonWidthAdj = ($closeButton.size() > 0) ? ($closeButton.width() / 3) - unexplainedAdj : 0,
                windowBufferAdj = 30,
                modalPadding = $thisModal.find(".avlModal-wrapper").css("padding-left").replace("px", "") * 2,
                windowHeight = $(window).height(),
                windowWidth = $(window).width(),
                contentMaxHeight = 'auto',
				maxWidth = windowWidth - windowBufferAdj,
				modalWidth = $(modalContent).data('initialWidth'),
				contentHeight = $thisModal.css({ 'max-width': maxWidth }).find('.avlModal-content-wrapper')[0].scrollHeight,
    			fullHeight = contentHeight - $thisModalsContent.height() + $thisModal.height();

			// get the border size if it exists
			if (isNaN(thisModalsWrapperBorderSize)) { thisModalsWrapperBorderSize = 0; }

			// the height of the modal is greater than or equal to the window height
			if ((fullHeight + closeButtonHeightAdj + windowBufferAdj + thisModalsWrapperBorderSize) >= windowHeight) {
				modalHeight = windowHeight - windowBufferAdj - closeButtonHeightAdj;
				contentMaxHeight = (modalHeight + $thisModalsContent.height() - $thisModal.height()) + 'px';
			}   // if
				// the height of the modal is less than to the window height
			else {
				modalHeight = fullHeight;
			}   // else



			// set the negative margins
			modalMarginTop = ($(window).height() + closeButtonWidthAdj + thisModalsWrapperBorderSize - modalHeight - windowBufferAdj / 2) / 2;
			if (modalWidth > maxWidth) {
				modalMarginLeft = ($(window).width() + closeButtonWidthAdj + thisModalsWrapperBorderSize - maxWidth - windowBufferAdj / 2) / 2;
			} else {
				modalMarginLeft = ($(window).width() + closeButtonWidthAdj + thisModalsWrapperBorderSize - modalWidth - windowBufferAdj / 2) / 2;
			}

			// set the height of the modal's content section
			$thisModalsContent.css('height', contentMaxHeight);

			if (action === "show") {

				$thisModal
                    .css({
                    	position: "fixed",
                    	top: Math.round(modalMarginTop),
                    	left: Math.round(modalMarginLeft),
                    	height: 'auto',
                    	width: modalWidth,
                    	display: "block"
                    });

				// run the transitions for opening the modal
				if (goForTransitions(modalObject.useTransitions)) {

					$thisModal.find(".avlModal-wrapper").addClass("show");

					//$(this).parent().parent()
					// .css({ minHeight: headerHeight + (modalPadding / 2) }) // set the minHeight of the modal for obvious reasons
					// execute the code for the overlay/modal display
					if (modalObject != undefined) { modalObject.onComplete(); }
				}   // if
					// animate the modal (fallback)
				else {
					$thisModal.find(".avlModal-wrapper")
                        .addClass("no-trans")
                    .css({ opacity: 1 });

					$thisModal
                        .animate({
                        	left: Math.round(modalMarginLeft),
                        	width: modalWidth
                        }, $(modalContent).data("modalShowSpeed"), "easeInOutExpo", function () {
                        	$thisModal
				                .animate({
				                	top: Math.round(modalMarginTop),
				                	height: 'auto'
				                }, 400, "easeInOutExpo", function () {
				                	$(this).parent().parent()
                                        .css({ minHeight: headerHeight + (modalPadding / 2) }) // set the minHeight of the modal for obvious reasons
				                	// execute the code for the overlay/modal display
				                	if (modalObject != undefined) { modalObject.onComplete(); }
				                });
                        });
				}   // else
			}   // if

			if (action === "resize") {
				$thisModal
			        .css({
			        	top: Math.round(modalMarginTop),
			        	left: Math.round(modalMarginLeft),
			        	height: 'auto',
			        	width: modalWidth,
			        	'max-width': maxWidth,
			        	display: "block"
			        })
			}   // if

		}); // each()
	}; // setModalPosition(object,string)

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
	}   // isIE6

	//  === (Function) getTransitionEnd() =====================================================================

	function getTransitionEnd() {
		// get the transition end event for the css3 animation and the vendor's prefix
		var transitionEnd = "transitionEnd";
		// get the type of transition end and vendor's previx
		if ($.browser.webkit) { transitionEnd = "webkitTransitionEnd"; }
		else if ($.browser.opera) { transitionEnd = "oTransitionEnd"; }
		else { transitionEnd = "transitionend"; }
		return transitionEnd;
	}   // getTransitionEnd

	//  === (Function) goForTransitions() =====================================================================

	function goForTransitions(useTransitions) {
		// using Modernizr determine the browser capabilities and user defined var
		return Modernizr.csstransforms && Modernizr.csstransitions && useTransitions
	}

	//  === (Binding) Window : resize =====================================================================

	$(window).on("resize onorientationchange", function () {
		if ($(".avlModal").is(":visible")) {
			// set the height and width of the overlay layer
			setOverlayLayerSize();
			// set the top and left position of the modal element
			setModalPosition("resize", $(".avlModal:visible"));
		}   // if
	}); // resize



	OpenModals = [];

	CheckModalContentSize = function () {
		var current = 0,
			modalHeight = 0,
    		n = 0,
    		l = OpenModals.length,
    		htmlHeight = document.getElementsByTagName("HTML")[0].scrollHeight;
		if (l) {
			//console.log('Checking Size of ' + l + ' modals.');
			for (n = 0; n < l; n++) {

				current = OpenModals[n].modalContent.scrollHeight;
				modalHeight = OpenModals[n].modal.scrollHeight;
				if (OpenModals[n].previousHeight != current || modalHeight > htmlHeight) {
					setModalPosition("resize", $(OpenModals[n].modal));
				}
				OpenModals[n].previousHeight = current;
			}
		}
	};

	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				};
	})();


	function animloop() {
		if (OpenModals.length > 0) {
			requestAnimFrame(animloop);
			CheckModalContentSize();
		}

	}


})(jQuery);

