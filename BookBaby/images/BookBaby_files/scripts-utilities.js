
/*	
=================================================================================================================================
Common Utility Methods (object literal)
================================================================================================================================= 
*/

var AVLUTILITIES = {

	// Modules

	progressBar: (function () {	// revealing module pattern

		// AVLUTILITIES.progressBar.init({ duration: 10000 });
		// AVLUTILITIES.progressBar.init({ duration: 10000, elapsed: 5000 });
		// AVLUTILITIES.progressBar.init({ duration: 10000, debug: true });
		// AVLUTILITIES.progressBar.init({ duration: 10000, decimals: 4 });

		// AVLUTILITIES.progressBar.pause();
		// AVLUTILITIES.progressBar.play();
		// AVLUTILITIES.progressBar.play(3500);
		// AVLUTILITIES.progressBar.replay();
		// AVLUTILITIES.progressBar.isPlaying();  return true/false if playing

		// private variables
		var requestID = null,
			isPlaying = false,
			actualDuration = 0,
			isFirstPlay = true,
			tempElapsed,
			start;

		// public variables
		var config = {
			duration: 60000,				// the total amount of time (ms)
			elapsed: 0,						// starting time
			decimals: 2,					// number of decimal places to use for percentages
			autoPlay: false,				// play right after init or not
			height: 5,						// height of the progress bar
			color: "#29d",					// color of the progress bar
			parent: $("body"),				// parent element of the progress bar	
			containerClass: "progressBar",	// class of the element container (change for custom styles)	
			debug: false,					// logs output in console if true
			callback: null					// function to call on reaching duration,
		};

		var init = function (options) {
			// resets
			config.elapsed = 0;

			// provide for custom configuration via init()
			if (options && typeof (options) == 'object') {
				// merge user-specified options
				$.extend(config, options);
			}	// if

			// append an element to the body for visually debugging output
			if (config.debug && $("#progressBar-debug").size() == 0) {
				$("body").append("<div id='progressBar-debug'><div id='progress-output'></div><div id='progress-messages'></div></div>");
				$("#progressBar-debug #progress-output").text(config.duration + ", " + config.elapsed + ", " + percentage(config.duration, config.elapsed) + " %")
			}	// if
			else {
				$("#progressBar-debug #progress-messages div").fadeOut(300, function () { $(this).remove(); });
			}		// else

			// add the progress bar to the page
			config.parent.append("<div class='" + config.containerClass + "'><div class='bar'></div></div>");
			//style the bar
			config.parent.find("." + config.containerClass).css({ height: config.height + "px" });
			config.parent.find("." + config.containerClass + " .bar").css({ backgroundColor: config.color });

			// temporary var used to hold the initial value for resetting after duration is reached
			tempElapsed = config.elapsed;

			// debug output
			log("progress bar initialized");

			// play the progress bar animation starting from the beginning or from a starting time passed through the config using "elapsed"
			if (config.autoPlay) {
				play(config.elapsed);
			}	// if
		};

		var play = function (elapsed) {
			// cancel the repaints and stop the progress bar
			cancelAnimationFrame(requestID);
			// override for elapsed time
			config.elapsed = (isNaN(elapsed) ? config.elapsed : elapsed);
			// assign the current time
			start = +new Date() - config.elapsed;
			// capture the actual start time of the progress bar
			if (isFirstPlay) {
				actualDuration = start;
				isFirstPlay = false;
			}	// if
			// toggle the play variable
			isPlaying = true;
			// debug output
			log("progress bar playing - elapsed: " + config.elapsed, true)
			// repaint loop
			loop(config.elapsed);
		};

		var replay = function () {
			// resets
			isPlaying = false;
			actualDuration = 0;
			// start playing the progress bar from the beginning
			play(0);
			// debug output
			log("progress bar replaying")
		};

		var pause = function () {
			// cancel the repaints and stop the progress bar
			cancelAnimationFrame(requestID);
			// toggle the play variable
			isPlaying = false;
			// debug output
			log("progress bar paused - elapsed: " + config.elapsed);
		};

		var loop = function (elapsed) {

			// use the new elapsed time to get the current percentage
			var perc = percentage(config.duration, elapsed),
				isLastFrame = (config.duration - elapsed) <= 0;

			// debug output
			if (config.debug) {
				$("#progressBar-debug #progress-output").text(config.duration + ", " + (isLastFrame ? config.duration : elapsed) + ", " + (isLastFrame ? 100 : perc) + " %");
			}	// if

			if (!isLastFrame) {
				// execute update function
				update(perc);
			}	// if
			else {
				var endTime = +new Date();
				// calculate the actual duration of playback
				actualDuration = endTime - actualDuration;
				// toggle play var
				isPlaying = false;
				// reset the elapsed time
				config.elapsed = tempElapsed;
				// execute update function
				update(100);
				// execute callback function
				config.callback;
				// cancel the repaints
				cancelAnimationFrame(requestID);
				// debug output
				log("progress bar completed [ duration/actual - " + config.duration + " / " + actualDuration + " (+" + (actualDuration - config.duration) + "ms) ]");
				// exit function
				return;
			}	// else

			// update the elapsed time by subtracting the start time from current time
			config.elapsed = +new Date() - start;

			// loop this function passing the new elapsed time
			requestID = requestAnimationFrame(
				function () { AVLUTILITIES.progressBar.loop(config.elapsed) }
			);

		};

		var update = function (progress) {
			// update the width of the progress bar with the percentage
			config.parent.find("." + config.containerClass + " .bar").show().width(progress + "%");
			// fade the progress bar out if completed
			if (progress == 100) config.parent.find("." + config.containerClass + " .bar").fadeOut();
		};

		var status = function () {
			return isPlaying;
		};

		var current = function () {
			var currentValues = {
				percentage: percentage(config.duration, config.elapsed),
				time: config.elapsed
			}
			return currentValues;
		};

		var actual = function () {
			return actualDuration;
		};

		var percentage = function (duration, elapsed) {
			return ((1 - (duration - elapsed) / duration) * 100).toFixed(config.decimals);
		};

		var log = function (message, remove) {
			if (config.debug) {
				// console output
				if (window.console && window.console.log) {
					//console.log(message);
				}	// if
				// visual output
				$("<div><i class='icon-ok'></i>" + message + "</div>").appendTo("#progressBar-debug #progress-messages").delay(1000).show(500, function () {
					$(this).css({ opacity: ".8" });
					if (remove) {
						$(this).remove();
					}		// if
				});
			}	// if
		}

		// public api
		return {
			init: init,
			play: play,
			replay: replay,
			pause: pause,
			loop: loop,
			isPlaying: status,
			current: current,
			actual: actual,
		};

	})(),

	// AVL Brand

	avlBrand: function () {
		return $("#avlBrand").val();
	},

	// General

	formatDate: function (date) {

		// only calculate for defined values
		if (date == "undefined" || date == null) return date;

		var dd = date.getDate(),
			mm = date.getMonth() + 1,
			yyyy = date.getFullYear(),
			hr = date.getHours(),
			min = date.getMinutes(),
			sec = date.getSeconds(),
			ms = date.getMilliseconds();

		if (dd < 10) dd = '0' + dd // single days prepend 0
		if (mm < 10) mm = '0' + mm // single months add prepend 0
		if (hr < 10) hr = '0' + hr // single hours add prepend 0
		if (min < 10) min = '0' + min // single minutes add prepend 0
		if (sec < 10) sec = '0' + sec // single sec add prepend 0
		if (ms < 10) ms = '00' + ms // single ms add prepend 00
		else if (ms < 100) ms = '0' + ms // double ms add prepend 0

		// populate the return object
		return yyyy + "/" + mm + "/" + dd + " " + hr + ":" + min + ":" + sec + "." + ms;

	},

	addCSSToPage: function (css) {
		var head = document.getElementsByTagName('head')[0];
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		if (s.styleSheet) {   // IE
			s.styleSheet.cssText = css;
		} else {                // the world
			s.appendChild(document.createTextNode(css));
		}
		head.appendChild(s);
	},

	formatNumberWithCommas: function (x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	getBrowserFeatures: function () {

		var BrowserFeatures = {
			Fontface: Modernizr.fontface,
			Backgroundsize: Modernizr.backgroundsize,
			Borderimage: Modernizr.borderimage,
			Borderradius: Modernizr.borderradius,
			Boxshadow: Modernizr.boxshadow,
			Flexbox: Modernizr.flexbox,
			Hsla: Modernizr.hsla,
			Multiplebgs: Modernizr.multiplebgs,
			Opacity: Modernizr.opacity,
			Rgba: Modernizr.rgba,
			Textshadow: Modernizr.textshadow,
			Cssanimations: Modernizr.cssanimations,
			Csscolumns: Modernizr.csscolumns,
			Generatedcontent: Modernizr.generatedcontent,
			Cssgradients: Modernizr.cssgradients,
			Cssreflections: Modernizr.cssreflections,
			Csstransforms: Modernizr.csstransforms,
			Csstransforms3d: Modernizr.csstransforms3d,
			Csstransitions: Modernizr.csstransitions,
			Applicationcache: Modernizr.applicationcache,
			Canvas: Modernizr.canvas,
			Canvastext: Modernizr.canvastext,
			Draganddrop: Modernizr.draganddrop,
			Hashchange: Modernizr.hashchange,
			History: Modernizr.history,
			Audio: Modernizr.audio,
			Video: Modernizr.video,
			Indexeddb: Modernizr.indexeddb,
			Localstorage: Modernizr.localstorage,
			Postmessage: Modernizr.postmessage,
			Sessionstorage: Modernizr.sessionstorage,
			Websockets: Modernizr.websockets,
			Websqldatabase: Modernizr.websqldatabase,
			Webworkers: Modernizr.webworkers,
			Geolocation: Modernizr.geolocation,
			Inlinesvg: Modernizr.inlinesvg,
			Smil: Modernizr.smil,
			Svg: Modernizr.svg,
			Svgclippaths: Modernizr.svgclippaths,
			Touch: Modernizr.touch,
			Webgl: Modernizr.webgl
		};

		return BrowserFeatures;

	},

	getDeviceType: function () {

		var returnValue = "other";

		if (categorizr.isTv) { returnValue = "tv"; }
		if (categorizr.isDesktop) { returnValue = "desktop"; }
		if (categorizr.isTablet) { returnValue = "tablet"; }
		if (categorizr.isMobile) { returnValue = "mobile"; }

		return returnValue;
	},

	getEventTarget: function (e) {
		if (e.target) target = e.target;
		else if (e.Target) target = e.Target;
		else if (e.srcElement) target = e.srcElement;
		if (target.nodeType == 3) // defeat Safari bug
			target = targ.parentNode;
		return target;
	},

	getPhysicalSize: function (objectIn) {
		var bytes = encodeURI(objectIn).split(/%..|./).length - 1;
		if (bytes == 0) return '0 Byte';
		var k = 1000;
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	},

	getPhysicalSize: function (objectIn) {
		var bytes = encodeURI(objectIn).split(/%..|./).length - 1;
		if (bytes == 0) return '0 Byte';
		var k = 1000;
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	},

	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	getStylesheetRules: function (externalStyleSheet) {

		var returnValue = "";

		try {
			returnValue = (typeof externalStyleSheet != "undefined") ? externalStyleSheet.cssRules || externalStyleSheet.rules : null; // (W3c model || IE model)
		}   // try
		catch (err) {
			// do nothing because this is only a catch for Firefox not trying to access external stylesheets...
		}   // catch

		return returnValue;

	},

	getScrollBarWidth: function () {
		var inner = document.createElement('p');
		var returnvalue = 17,
			extraPadding = IsIE() ? 5 : (categorizr.isMobile ? 0 : 5);
		inner.style.width = "100%";
		inner.style.height = "200px";

		var outer = document.createElement('div');
		outer.style.position = "absolute";
		outer.style.top = "0px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild(inner);

		document.body.appendChild(outer);
		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		var w2 = inner.offsetWidth;
		if (w1 == w2) w2 = outer.clientWidth;

		document.body.removeChild(outer);
		if (w1 - w2 > 0) {
			returnvalue = w1 - w2 + extraPadding;
		}
		return returnvalue + extraPadding;
	},

	getTransitionEnd: function () {

		// get the transition end event for the css3 animation
		var transitionEnd = "transitionEnd";

		if ($.browser.webkit) { transitionEnd = "webkitTransitionEnd"; }
		else if ($.browser.msie) { transitionEnd = "msTransitionEnd"; }
		else if ($.browser.mozilla) { transitionEnd = "transitionend"; }
		else if ($.browser.opera) { transitionEnd = "oTransitionEnd"; }

		return transitionEnd;

	},

	getVendorPrefix: function () {

		// get the vendor's prefix
		var vp;

		if (!!window.MSStream) { vp = ""; }    // IE11 HACK!
		else if ($.browser.webkit) { vp = "-webkit-"; }
		else if ($.browser.msie) { vp = "-ms-"; }
		else if ($.browser.mozilla) { vp = "-moz-"; }
		else if ($.browser.opera) { vp = "-o-"; }

		return vp

	},

	isIE: function () {
		return  /*@cc_on!@*/false;
	},

	// Cookies

	cookiesEnabled: function () {
		return (navigator.cookieEnabled) ? true : false;
	},

	getCookie: function (c_name, nullReturn) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1) {
			c_start = c_value.indexOf(c_name + "=");
		}
		if (c_start == -1) {
			c_value = nullReturn;
		}
		else {
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start, c_end));
		}
		return c_value;
	},

	setCookie: function (c_name, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	},

	setSessionCookie: function (c_name, value) {
		// will expire with the browser's session
		document.cookie = c_name + "=" + value + "; path=/";
	},

	deleteCookie: function (c_name) {
		document.cookie = c_name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	},

	// Events

	cancelEvent: function (event) {
		event.stopPropagation();
		event.preventDefault();
	},

	isLeftClick: function (event) {
		return event.button == 0 && noKeyModifiers(event);
	},

	isMiddleClick: function (event) {
		return event.button == 1 && noKeyModifiers(event);
	},

	isRightClick: function (event) {
		return event.button == 2 && noKeyModifiers(event);
	},

	noKeyModifiers: function (event) {
		return !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey;
	},

	isControlClick: function (event) {
		return event.button == 0 && isControl(event);
	},

	isShiftClick: function (event) {
		return event.button == 0 && isShift(event);
	},

	isControl: function (event) {
		return (event.metaKey || event.ctrlKey) && !event.shiftKey && !event.altKey;
	},

	isAlt: function (event) {
		return event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey;
	},

	isAltClick: function (event) {
		return event.button == 0 && isAlt(event);
	},

	isControlShift: function (event) {
		return (event.metaKey || event.ctrlKey) && event.shiftKey && !event.altKey;
	},

	isShift: function (event) {
		return event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey;
	},

    // new generic print function for printing from web pages.
	printDocument: function () {
	    setTimeout(function () {
	        window.print();
	    }, 999);
	    return false;
	},//printDocument()

	// URLs

	isErrorPage: function (url) {
		return (url.toLowerCase().indexOf("error") > -1) ? 1 : 0;
	},

	getQuerystringParamByName: function (url, name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},

	getPageTitle: function () {
		return document.title;
	},

	getFileName: function (url) {
		return url.substr(url.lastIndexOf('/') + 1);
	},

	getFileNameNoParams: function (url) {

		var returnValue;

		if (url.indexOf("?") > -1) {
			returnValue = this.getFileName(url.substr(0, url.indexOf("?")));
		} else {
			returnValue = this.getFileName(url);
		}

		// if the pagename is not present in the url, return a default placeholder
		if (returnValue == "" || returnValue.indexOf('.') === -1) {
			returnValue = "default page";
		}	// if

		return returnValue;
	},

	getFileExtension: function (url) {
		if (!url)
			return null;

		// Remove query string from the URL if any.
		var queryString = url.indexOf("?");
		if (queryString != -1)
			url = url.substr(0, queryString);

		// Now get the file extension.
		var lastDot = url.lastIndexOf(".");
		return url.substr(lastDot + 1);
	},

	getDomain: function (url) {
		var m = /[^:]+:\/{1,3}([^\/]+)/.exec(url);
		return m ? m[1] : "";
	},

	getURLNoParams: function (url) {

		var returnValue;

		if (url.indexOf("?") > -1) {
			returnValue = url.substr(0, url.indexOf("?"));
		} else {
			returnValue = url;
		}

		return returnValue;
	},

	getURLPath: function (url) {
		var m = /[^:]+:\/{1,3}[^\/]+(\/.*?)$/.exec(url);
		return m ? m[1] : "";
	},

	getURLPathNoParams: function (url) {
		var m = /[^:]+:\/{1,3}[^\/]+(\/.*?)$/.exec(this.getURLNoParams(url));
		return m ? m[1] : "";
	},

	getURIHost: function (uri) {
		try {
			if (uri)
				return uri.host;
			else
				return "";
		}
		catch (exc) {
			return "";
		}
	},

	getApplication: function () {
		var pathArray = window.location.pathname.split('/');
		return (pathArray[[pathArray.length - 2]]).toLowerCase();
	},

	// XPATH

	getElementByXPath: function (path) {
		// jsut in case this is null, we don;t want ie to throw an exception, naturally.
		if (path == null) { return null; }
		try {
			var result = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			return result.singleNodeValue;
		}	// try
		catch (err) {
			return null;
		}	// catch
	},

	getElementXPath: function (element) {
		if (element && element.id)
			return '//*[@id="' + element.id + '"]';
		else
			return AVLUTILITIES.getElementTreeXPath(element);
	},

	getElementTreeXPath: function (element) {
		var paths = [];

		// Use nodeName (instead of localName) so namespace prefix is included (if any).
		for (; element && element.nodeType == 1; element = element.parentNode) {
		    var index = 0,
                Node = Node || {
                    ELEMENT_NODE: 1,
                    ATTRIBUTE_NODE: 2,
                    TEXT_NODE: 3
                };
			for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
				// Ignore document type declaration.
				if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
					continue;

				if (sibling.nodeName == element.nodeName)
					++index;
			}

			var tagName = element.nodeName.toLowerCase();
			var pathIndex = (index ? "[" + (index + 1) + "]" : "");
			paths.splice(0, 0, tagName + pathIndex);
		}

		return paths.length ? "/" + paths.join("/") : null;
	},

	getHtmlTagName: function (event) {

		return (typeof $(getElementByXPath(getEventTarget(event))).prop("tagName") == "undefined") ? "" : $(getElementByXPath(getEventTarget(event))).prop("tagName").toLowerCase();
	}

};	// AVLUTILITIES

// Plugins

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// https://gist.github.com/paulirish/1579671
(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                   || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () { callback(currTime + timeToCall); },
              timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());

// function to determine if an element has scrollbars (horizontal/vertical/both)
(function ($) {
	function hasScroll(el, index, match) {
		var $el = $(el),
            sX = $el.css('overflow-x'),
            sY = $el.css('overflow-y'),
            hidden = 'hidden',
            visible = 'visible',
            scroll = 'scroll',
            axis = match[3]; // regex for filter -> 3 == args to selector

		if (!axis) {
			if (sX === sY && (sY === hidden || sY === visible)) {
				return false;
			}
			if (sX === scroll || sY === scroll) { return true; }
		} else if (axis === 'x') {
			if (sX === hidden || sX === visible) { return false; }
			if (sX === scroll) { return true; }
		} else if (axis === 'y') {
			if (sY === hidden || sY === visible) { return false; }
			if (sY === scroll) { return true };
		}

		//Compare client and scroll dimensions to see if a scrollbar is needed
		return $el.innerHeight() < el.scrollHeight
            || $el.innerWidth() < el.scrollWidth;
	}
	$.expr[':'].hasScroll = hasScroll;
	$.fn.hasScroll = function (axis) {
		var el = this[0];
		if (!el) { return false; }
		return hasScroll(el, 0, [0, 0, 0, axis]);
	};
}(jQuery));


// (IE Workaround) 
// Wicked Good XPath is a Google-authored pure JavaScript implementation of the DOM Level 3 XPath specification. It enables XPath evaluation for HTML documents in every browser.
// https://code.google.com/p/wicked-good-xpath/
(function () {
	function h(a) { return function () { return this[a] } } function k(a) { return function () { return a } } var l = this;
	function aa(a) {
		var b = typeof a; if ("object" == b) if (a) { if (a instanceof Array) return "array"; if (a instanceof Object) return b; var c = Object.prototype.toString.call(a); if ("[object Window]" == c) return "object"; if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array"; if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function" } else return "null";
		else if ("function" == b && "undefined" == typeof a.call) return "object"; return b
	} function m(a) { return "string" == typeof a } function ba(a, b, c) { return a.call.apply(a.bind, arguments) } function ca(a, b, c) { if (!a) throw Error(); if (2 < arguments.length) { var d = Array.prototype.slice.call(arguments, 2); return function () { var c = Array.prototype.slice.call(arguments); Array.prototype.unshift.apply(c, d); return a.apply(b, c) } } return function () { return a.apply(b, arguments) } }
	function n(a, b, c) { n = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ba : ca; return n.apply(null, arguments) } function da(a, b) { var c = Array.prototype.slice.call(arguments, 1); return function () { var b = c.slice(); b.push.apply(b, arguments); return a.apply(this, b) } } function r(a) { var b = s; function c() { } c.prototype = b.prototype; a.t = b.prototype; a.prototype = new c }
	Function.prototype.bind = Function.prototype.bind || function (a, b) { if (1 < arguments.length) { var c = Array.prototype.slice.call(arguments, 1); c.unshift(this, a); return n.apply(null, c) } return n(this, a) }; function t(a, b, c) { this.a = a; this.b = b || 1; this.d = c || 1 }; var u, ea, fa, ga; function ha() { return l.navigator ? l.navigator.userAgent : null } ga = fa = ea = u = !1; var w; if (w = ha()) { var ia = l.navigator; u = 0 == w.lastIndexOf("Opera", 0); ea = !u && (-1 != w.indexOf("MSIE") || -1 != w.indexOf("Trident")); fa = !u && -1 != w.indexOf("WebKit"); ga = !u && !fa && !ea && "Gecko" == ia.product } var y = ea, ja = ga, ka = fa; function la() { var a = l.document; return a ? a.documentMode : void 0 } var ma;
	n: { var na = "", oa; if (u && l.opera) var pa = l.opera.version, na = "function" == typeof pa ? pa() : pa; else if (ja ? oa = /rv\:([^\);]+)(\)|;)/ : y ? oa = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : ka && (oa = /WebKit\/(\S+)/), oa) var qa = oa.exec(ha()), na = qa ? qa[1] : ""; if (y) { var ra = la(); if (ra > parseFloat(na)) { ma = String(ra); break n } } ma = na } var sa = ma, ta = {};
	function ua(a) {
		if (!ta[a]) {
			for (var b = 0, c = String(sa).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
				var g = c[f] || "", p = d[f] || "", q = RegExp("(\\d*)(\\D*)", "g"), x = RegExp("(\\d*)(\\D*)", "g"); do {
					var v = q.exec(g) || ["", "", ""], J = x.exec(p) || ["", "", ""]; if (0 == v[0].length && 0 == J[0].length) break; b = ((0 == v[1].length ? 0 : parseInt(v[1], 10)) < (0 == J[1].length ? 0 : parseInt(J[1], 10)) ? -1 : (0 == v[1].length ? 0 : parseInt(v[1], 10)) >
                    (0 == J[1].length ? 0 : parseInt(J[1], 10)) ? 1 : 0) || ((0 == v[2].length) < (0 == J[2].length) ? -1 : (0 == v[2].length) > (0 == J[2].length) ? 1 : 0) || (v[2] < J[2] ? -1 : v[2] > J[2] ? 1 : 0)
				} while (0 == b)
			} ta[a] = 0 <= b
		}
	} var va = l.document, wa = va && y ? la() || ("CSS1Compat" == va.compatMode ? parseInt(sa, 10) : 5) : void 0; var z = y && !(y && 9 <= wa), xa = y && !(y && 8 <= wa); function A(a, b, c, d) { this.a = a; this.nodeName = c; this.nodeValue = d; this.nodeType = 2; this.parentNode = this.ownerElement = b } function ya(a, b) { var c = xa && "href" == b.nodeName ? a.getAttribute(b.nodeName, 2) : b.nodeValue; return new A(b, a, b.nodeName, c) }; function za(a) { this.b = a; this.a = 0 } function Aa(a) { a = a.match(Ba); for (var b = 0; b < a.length; b++) Ca.test(a[b]) && a.splice(b, 1); return new za(a) } var Ba = RegExp("\\$?(?:(?![0-9-])[\\w-]+:)?(?![0-9-])[\\w-]+|\\/\\/|\\.\\.|::|\\d+(?:\\.\\d*)?|\\.\\d+|\"[^\"]*\"|'[^']*'|[!<>]=|\\s+|.", "g"), Ca = /^\s/; function B(a, b) { return a.b[a.a + (b || 0)] } function C(a) { return a.b[a.a++] }; var D = Array.prototype, Da = D.indexOf ? function (a, b, c) { return D.indexOf.call(a, b, c) } : function (a, b, c) { c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c; if (m(a)) return m(b) && 1 == b.length ? a.indexOf(b, c) : -1; for (; c < a.length; c++) if (c in a && a[c] === b) return c; return -1 }, E = D.forEach ? function (a, b, c) { D.forEach.call(a, b, c) } : function (a, b, c) { for (var d = a.length, e = m(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a) }, Ea = D.filter ? function (a, b, c) { return D.filter.call(a, b, c) } : function (a, b, c) {
		for (var d = a.length, e = [], f = 0, g = m(a) ?
        a.split("") : a, p = 0; p < d; p++) if (p in g) { var q = g[p]; b.call(c, q, p, a) && (e[f++] = q) } return e
	}, F = D.reduce ? function (a, b, c, d) { d && (b = n(b, d)); return D.reduce.call(a, b, c) } : function (a, b, c, d) { var e = c; E(a, function (c, g) { e = b.call(d, e, c, g, a) }); return e }, Fa = D.some ? function (a, b, c) { return D.some.call(a, b, c) } : function (a, b, c) { for (var d = a.length, e = m(a) ? a.split("") : a, f = 0; f < d; f++) if (f in e && b.call(c, e[f], f, a)) return !0; return !1 };
	function Ga(a, b) { var c; n: { c = a.length; for (var d = m(a) ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) { c = e; break n } c = -1 } return 0 > c ? null : m(a) ? a.charAt(c) : a[c] } function Ha(a) { return D.concat.apply(D, arguments) } function Ia(a, b, c) { return 2 >= arguments.length ? D.slice.call(a, b) : D.slice.call(a, b, c) }; !ja && !y || y && y && 9 <= wa || ja && ua("1.9.1"); y && ua("9"); function Ja(a, b) { if (a.contains && 1 == b.nodeType) return a == b || a.contains(b); if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16); for (; b && a != b;) b = b.parentNode; return b == a }
	function Ka(a, b) {
		if (a == b) return 0; if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1; if (y && !(y && 9 <= wa)) { if (9 == a.nodeType) return -1; if (9 == b.nodeType) return 1 } if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) { var c = 1 == a.nodeType, d = 1 == b.nodeType; if (c && d) return a.sourceIndex - b.sourceIndex; var e = a.parentNode, f = b.parentNode; return e == f ? La(a, b) : !c && Ja(e, b) ? -1 * Ma(a, b) : !d && Ja(f, a) ? Ma(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex) } d = 9 == a.nodeType ? a :
        a.ownerDocument || a.document; c = d.createRange(); c.selectNode(a); c.collapse(!0); d = d.createRange(); d.selectNode(b); d.collapse(!0); return c.compareBoundaryPoints(l.Range.START_TO_END, d)
	} function Ma(a, b) { var c = a.parentNode; if (c == b) return -1; for (var d = b; d.parentNode != c;) d = d.parentNode; return La(d, a) } function La(a, b) { for (var c = b; c = c.previousSibling;) if (c == a) return -1; return 1 }; function G(a) { var b = null, c = a.nodeType; 1 == c && (b = a.textContent, b = void 0 == b || null == b ? a.innerText : b, b = void 0 == b || null == b ? "" : b); if ("string" != typeof b) if (z && "title" == a.nodeName.toLowerCase() && 1 == c) b = a.text; else if (9 == c || 1 == c) { a = 9 == c ? a.documentElement : a.firstChild; for (var c = 0, d = [], b = ""; a;) { do 1 != a.nodeType && (b += a.nodeValue), z && "title" == a.nodeName.toLowerCase() && (b += a.text), d[c++] = a; while (a = a.firstChild); for (; c && !(a = d[--c].nextSibling) ;); } } else b = a.nodeValue; return "" + b }
	function H(a, b, c) { if (null === b) return !0; try { if (!a.getAttribute) return !1 } catch (d) { return !1 } xa && "class" == b && (b = "className"); return null == c ? !!a.getAttribute(b) : a.getAttribute(b, 2) == c } function Na(a, b, c, d, e) { return (z ? Oa : Pa).call(null, a, b, m(c) ? c : null, m(d) ? d : null, e || new I) }
	function Oa(a, b, c, d, e) { if (a instanceof K || 8 == a.b || c && null === a.b) { var f = b.all; if (!f) return e; a = Qa(a); if ("*" != a && (f = b.getElementsByTagName(a), !f)) return e; if (c) { for (var g = [], p = 0; b = f[p++];) H(b, c, d) && g.push(b); f = g } for (p = 0; b = f[p++];) "*" == a && "!" == b.tagName || L(e, b); return e } Ra(a, b, c, d, e); return e }
	function Pa(a, b, c, d, e) { b.getElementsByName && d && "name" == c && !y ? (b = b.getElementsByName(d), E(b, function (b) { a.a(b) && L(e, b) })) : b.getElementsByClassName && d && "class" == c ? (b = b.getElementsByClassName(d), E(b, function (b) { b.className == d && a.a(b) && L(e, b) })) : a instanceof M ? Ra(a, b, c, d, e) : b.getElementsByTagName && (b = b.getElementsByTagName(a.d()), E(b, function (a) { H(a, c, d) && L(e, a) })); return e }
	function Sa(a, b, c, d, e) { var f; if ((a instanceof K || 8 == a.b || c && null === a.b) && (f = b.childNodes)) { var g = Qa(a); if ("*" != g && (f = Ea(f, function (a) { return a.tagName && a.tagName.toLowerCase() == g }), !f)) return e; c && (f = Ea(f, function (a) { return H(a, c, d) })); E(f, function (a) { "*" == g && ("!" == a.tagName || "*" == g && 1 != a.nodeType) || L(e, a) }); return e } return Ta(a, b, c, d, e) } function Ta(a, b, c, d, e) { for (b = b.firstChild; b; b = b.nextSibling) H(b, c, d) && a.a(b) && L(e, b); return e }
	function Ra(a, b, c, d, e) { for (b = b.firstChild; b; b = b.nextSibling) H(b, c, d) && a.a(b) && L(e, b), Ra(a, b, c, d, e) } function Qa(a) { if (a instanceof M) { if (8 == a.b) return "!"; if (null === a.b) return "*" } return a.d() }; function I() { this.b = this.a = null; this.i = 0 } function Ua(a) { this.b = a; this.a = this.d = null } function Va(a, b) { if (!a.a) return b; if (!b.a) return a; for (var c = a.a, d = b.a, e = null, f = null, g = 0; c && d;) c.b == d.b || c.b instanceof A && d.b instanceof A && c.b.a == d.b.a ? (f = c, c = c.a, d = d.a) : 0 < Ka(c.b, d.b) ? (f = d, d = d.a) : (f = c, c = c.a), (f.d = e) ? e.a = f : a.a = f, e = f, g++; for (f = c || d; f;) f.d = e, e = e.a = f, g++, f = f.a; a.b = e; a.i = g; return a } function Wa(a, b) { var c = new Ua(b); c.a = a.a; a.b ? a.a.d = c : a.a = a.b = c; a.a = c; a.i++ }
	function L(a, b) { var c = new Ua(b); c.d = a.b; a.a ? a.b.a = c : a.a = a.b = c; a.b = c; a.i++ } function Xa(a) { return (a = a.a) ? a.b : null } function Ya(a) { return (a = Xa(a)) ? G(a) : "" } function N(a, b) { return new Za(a, !!b) } function Za(a, b) { this.d = a; this.b = (this.c = b) ? a.b : a.a; this.a = null } function O(a) { var b = a.b; if (null == b) return null; var c = a.a = b; a.b = a.c ? b.d : b.a; return c.b }; function $a(a) { switch (a.nodeType) { case 1: return da(ab, a); case 9: return $a(a.documentElement); case 2: return a.ownerElement ? $a(a.ownerElement) : bb; case 11: case 10: case 6: case 12: return bb; default: return a.parentNode ? $a(a.parentNode) : bb } } function bb() { return null } function ab(a, b) { if (a.prefix == b) return a.namespaceURI || "http://www.w3.org/1999/xhtml"; var c = a.getAttributeNode("xmlns:" + b); return c && c.specified ? c.value || null : a.parentNode && 9 != a.parentNode.nodeType ? ab(a.parentNode, b) : null }; function s(a) { this.g = a; this.b = this.f = !1; this.d = null } function P(a) { return "\n  " + a.toString().split("\n").join("\n  ") } function cb(a, b) { a.f = b } function db(a, b) { a.b = b } function Q(a, b) { var c = a.a(b); return c instanceof I ? +Ya(c) : +c } function R(a, b) { var c = a.a(b); return c instanceof I ? Ya(c) : "" + c } function S(a, b) { var c = a.a(b); return c instanceof I ? !!c.i : !!c }; function eb(a, b, c) { s.call(this, a.g); this.c = a; this.e = b; this.j = c; this.f = b.f || c.f; this.b = b.b || c.b; this.c == fb && (c.b || c.f || 4 == c.g || 0 == c.g || !b.d ? b.b || b.f || 4 == b.g || 0 == b.g || !c.d || (this.d = { name: c.d.name, l: b }) : this.d = { name: b.d.name, l: c }) } r(eb);
	function T(a, b, c, d, e) {
		b = b.a(d); c = c.a(d); var f; if (b instanceof I && c instanceof I) { e = N(b); for (d = O(e) ; d; d = O(e)) for (b = N(c), f = O(b) ; f; f = O(b)) if (a(G(d), G(f))) return !0; return !1 } if (b instanceof I || c instanceof I) { b instanceof I ? e = b : (e = c, c = b); e = N(e); b = typeof c; for (d = O(e) ; d; d = O(e)) { switch (b) { case "number": d = +G(d); break; case "boolean": d = !!G(d); break; case "string": d = G(d); break; default: throw Error("Illegal primitive type for comparison."); } if (a(d, c)) return !0 } return !1 } return e ? "boolean" == typeof b || "boolean" == typeof c ?
        a(!!b, !!c) : "number" == typeof b || "number" == typeof c ? a(+b, +c) : a(b, c) : a(+b, +c)
	} eb.prototype.a = function (a) { return this.c.k(this.e, this.j, a) }; eb.prototype.toString = function () { var a = "Binary Expression: " + this.c, a = a + P(this.e); return a += P(this.j) }; function gb(a, b, c, d) { this.a = a; this.p = b; this.g = c; this.k = d } gb.prototype.toString = h("a"); var hb = {}; function U(a, b, c, d) { if (hb.hasOwnProperty(a)) throw Error("Binary operator already created: " + a); a = new gb(a, b, c, d); return hb[a.toString()] = a }
	U("div", 6, 1, function (a, b, c) { return Q(a, c) / Q(b, c) }); U("mod", 6, 1, function (a, b, c) { return Q(a, c) % Q(b, c) }); U("*", 6, 1, function (a, b, c) { return Q(a, c) * Q(b, c) }); U("+", 5, 1, function (a, b, c) { return Q(a, c) + Q(b, c) }); U("-", 5, 1, function (a, b, c) { return Q(a, c) - Q(b, c) }); U("<", 4, 2, function (a, b, c) { return T(function (a, b) { return a < b }, a, b, c) }); U(">", 4, 2, function (a, b, c) { return T(function (a, b) { return a > b }, a, b, c) }); U("<=", 4, 2, function (a, b, c) { return T(function (a, b) { return a <= b }, a, b, c) });
	U(">=", 4, 2, function (a, b, c) { return T(function (a, b) { return a >= b }, a, b, c) }); var fb = U("=", 3, 2, function (a, b, c) { return T(function (a, b) { return a == b }, a, b, c, !0) }); U("!=", 3, 2, function (a, b, c) { return T(function (a, b) { return a != b }, a, b, c, !0) }); U("and", 2, 2, function (a, b, c) { return S(a, c) && S(b, c) }); U("or", 1, 2, function (a, b, c) { return S(a, c) || S(b, c) }); function ib(a, b) { if (b.a.length && 4 != a.g) throw Error("Primary expression must evaluate to nodeset if filter has predicate(s)."); s.call(this, a.g); this.c = a; this.e = b; this.f = a.f; this.b = a.b } r(ib); ib.prototype.a = function (a) { a = this.c.a(a); return jb(this.e, a) }; ib.prototype.toString = function () { var a; a = "Filter:" + P(this.c); return a += P(this.e) }; function kb(a, b) { if (b.length < a.o) throw Error("Function " + a.h + " expects at least" + a.o + " arguments, " + b.length + " given"); if (null !== a.n && b.length > a.n) throw Error("Function " + a.h + " expects at most " + a.n + " arguments, " + b.length + " given"); a.s && E(b, function (b, d) { if (4 != b.g) throw Error("Argument " + d + " to function " + a.h + " is not of type Nodeset: " + b); }); s.call(this, a.g); this.e = a; this.c = b; cb(this, a.f || Fa(b, function (a) { return a.f })); db(this, a.r && !b.length || a.q && !!b.length || Fa(b, function (a) { return a.b })) } r(kb);
	kb.prototype.a = function (a) { return this.e.k.apply(null, Ha(a, this.c)) }; kb.prototype.toString = function () { var a = "Function: " + this.e; if (this.c.length) var b = F(this.c, function (a, b) { return a + P(b) }, "Arguments:"), a = a + P(b); return a }; function lb(a, b, c, d, e, f, g, p, q) { this.h = a; this.g = b; this.f = c; this.r = d; this.q = e; this.k = f; this.o = g; this.n = void 0 !== p ? p : g; this.s = !!q } lb.prototype.toString = h("h"); var mb = {};
	function V(a, b, c, d, e, f, g, p) { if (mb.hasOwnProperty(a)) throw Error("Function already created: " + a + "."); mb[a] = new lb(a, b, c, d, !1, e, f, g, p) } V("boolean", 2, !1, !1, function (a, b) { return S(b, a) }, 1); V("ceiling", 1, !1, !1, function (a, b) { return Math.ceil(Q(b, a)) }, 1); V("concat", 3, !1, !1, function (a, b) { var c = Ia(arguments, 1); return F(c, function (b, c) { return b + R(c, a) }, "") }, 2, null); V("contains", 2, !1, !1, function (a, b, c) { b = R(b, a); a = R(c, a); return -1 != b.indexOf(a) }, 2); V("count", 1, !1, !1, function (a, b) { return b.a(a).i }, 1, 1, !0);
	V("false", 2, !1, !1, k(!1), 0); V("floor", 1, !1, !1, function (a, b) { return Math.floor(Q(b, a)) }, 1); V("id", 4, !1, !1, function (a, b) { function c(a) { if (z) { var b = e.all[a]; if (b) { if (b.nodeType && a == b.id) return b; if (b.length) return Ga(b, function (b) { return a == b.id }) } return null } return e.getElementById(a) } var d = a.a, e = 9 == d.nodeType ? d : d.ownerDocument, d = R(b, a).split(/\s+/), f = []; E(d, function (a) { a = c(a); !a || 0 <= Da(f, a) || f.push(a) }); f.sort(Ka); var g = new I; E(f, function (a) { L(g, a) }); return g }, 1); V("lang", 2, !1, !1, k(!1), 1);
	V("last", 1, !0, !1, function (a) { if (1 != arguments.length) throw Error("Function last expects ()"); return a.d }, 0); V("local-name", 3, !1, !0, function (a, b) { var c = b ? Xa(b.a(a)) : a.a; return c ? c.nodeName.toLowerCase() : "" }, 0, 1, !0); V("name", 3, !1, !0, function (a, b) { var c = b ? Xa(b.a(a)) : a.a; return c ? c.nodeName.toLowerCase() : "" }, 0, 1, !0); V("namespace-uri", 3, !0, !1, k(""), 0, 1, !0); V("normalize-space", 3, !1, !0, function (a, b) { return (b ? R(b, a) : G(a.a)).replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "") }, 0, 1);
	V("not", 2, !1, !1, function (a, b) { return !S(b, a) }, 1); V("number", 1, !1, !0, function (a, b) { return b ? Q(b, a) : +G(a.a) }, 0, 1); V("position", 1, !0, !1, function (a) { return a.b }, 0); V("round", 1, !1, !1, function (a, b) { return Math.round(Q(b, a)) }, 1); V("starts-with", 2, !1, !1, function (a, b, c) { b = R(b, a); a = R(c, a); return 0 == b.lastIndexOf(a, 0) }, 2); V("string", 3, !1, !0, function (a, b) { return b ? R(b, a) : G(a.a) }, 0, 1); V("string-length", 1, !1, !0, function (a, b) { return (b ? R(b, a) : G(a.a)).length }, 0, 1);
	V("substring", 3, !1, !1, function (a, b, c, d) { c = Q(c, a); if (isNaN(c) || Infinity == c || -Infinity == c) return ""; d = d ? Q(d, a) : Infinity; if (isNaN(d) || -Infinity === d) return ""; c = Math.round(c) - 1; var e = Math.max(c, 0); a = R(b, a); if (Infinity == d) return a.substring(e); b = Math.round(d); return a.substring(e, c + b) }, 2, 3); V("substring-after", 3, !1, !1, function (a, b, c) { b = R(b, a); a = R(c, a); c = b.indexOf(a); return -1 == c ? "" : b.substring(c + a.length) }, 2);
	V("substring-before", 3, !1, !1, function (a, b, c) { b = R(b, a); a = R(c, a); a = b.indexOf(a); return -1 == a ? "" : b.substring(0, a) }, 2); V("sum", 1, !1, !1, function (a, b) { for (var c = N(b.a(a)), d = 0, e = O(c) ; e; e = O(c)) d += +G(e); return d }, 1, 1, !0); V("translate", 3, !1, !1, function (a, b, c, d) { b = R(b, a); c = R(c, a); var e = R(d, a); a = []; for (d = 0; d < c.length; d++) { var f = c.charAt(d); f in a || (a[f] = e.charAt(d)) } c = ""; for (d = 0; d < b.length; d++) f = b.charAt(d), c += f in a ? a[f] : f; return c }, 3); V("true", 2, !1, !1, k(!0), 0); function M(a, b) { this.e = a; this.c = void 0 !== b ? b : null; this.b = null; switch (a) { case "comment": this.b = 8; break; case "text": this.b = 3; break; case "processing-instruction": this.b = 7; break; case "node": break; default: throw Error("Unexpected argument"); } } function nb(a) { return "comment" == a || "text" == a || "processing-instruction" == a || "node" == a } M.prototype.a = function (a) { return null === this.b || this.b == a.nodeType }; M.prototype.d = h("e"); M.prototype.toString = function () { var a = "Kind Test: " + this.e; null === this.c || (a += P(this.c)); return a }; function ob(a) { s.call(this, 3); this.c = a.substring(1, a.length - 1) } r(ob); ob.prototype.a = h("c"); ob.prototype.toString = function () { return "Literal: " + this.c }; function K(a, b) { this.h = a.toLowerCase(); this.c = b ? b.toLowerCase() : "http://www.w3.org/1999/xhtml" } K.prototype.a = function (a) { var b = a.nodeType; return 1 != b && 2 != b ? !1 : "*" != this.h && this.h != a.nodeName.toLowerCase() ? !1 : this.c == (a.namespaceURI ? a.namespaceURI.toLowerCase() : "http://www.w3.org/1999/xhtml") }; K.prototype.d = h("h"); K.prototype.toString = function () { return "Name Test: " + ("http://www.w3.org/1999/xhtml" == this.c ? "" : this.c + ":") + this.h }; function pb(a) { s.call(this, 1); this.c = a } r(pb); pb.prototype.a = h("c"); pb.prototype.toString = function () { return "Number: " + this.c }; function qb(a, b) { s.call(this, a.g); this.e = a; this.c = b; this.f = a.f; this.b = a.b; if (1 == this.c.length) { var c = this.c[0]; c.m || c.c != rb || (c = c.j, "*" != c.d() && (this.d = { name: c.d(), l: null })) } } r(qb); function sb() { s.call(this, 4) } r(sb); sb.prototype.a = function (a) { var b = new I; a = a.a; 9 == a.nodeType ? L(b, a) : L(b, a.ownerDocument); return b }; sb.prototype.toString = k("Root Helper Expression"); function tb() { s.call(this, 4) } r(tb); tb.prototype.a = function (a) { var b = new I; L(b, a.a); return b }; tb.prototype.toString = k("Context Helper Expression");
	qb.prototype.a = function (a) { var b = this.e.a(a); if (!(b instanceof I)) throw Error("Filter expression must evaluate to nodeset."); a = this.c; for (var c = 0, d = a.length; c < d && b.i; c++) { var e = a[c], f = N(b, e.c.a), g; if (e.f || e.c != ub) if (e.f || e.c != vb) for (g = O(f), b = e.a(new t(g)) ; null != (g = O(f)) ;) g = e.a(new t(g)), b = Va(b, g); else g = O(f), b = e.a(new t(g)); else { for (g = O(f) ; (b = O(f)) && (!g.contains || g.contains(b)) && b.compareDocumentPosition(g) & 8; g = b); b = e.a(new t(g)) } } return b };
	qb.prototype.toString = function () { var a; a = "Path Expression:" + P(this.e); if (this.c.length) { var b = F(this.c, function (a, b) { return a + P(b) }, "Steps:"); a += P(b) } return a }; function wb(a, b) { this.a = a; this.b = !!b }
	function jb(a, b, c) { for (c = c || 0; c < a.a.length; c++) for (var d = a.a[c], e = N(b), f = b.i, g, p = 0; g = O(e) ; p++) { var q = a.b ? f - p : p + 1; g = d.a(new t(g, q, f)); if ("number" == typeof g) q = q == g; else if ("string" == typeof g || "boolean" == typeof g) q = !!g; else if (g instanceof I) q = 0 < g.i; else throw Error("Predicate.evaluate returned an unexpected type."); if (!q) { q = e; g = q.d; var x = q.a; if (!x) throw Error("Next must be called at least once before remove."); var v = x.d, x = x.a; v ? v.a = x : g.a = x; x ? x.d = v : g.b = v; g.i--; q.a = null } } return b }
	wb.prototype.toString = function () { return F(this.a, function (a, b) { return a + P(b) }, "Predicates:") }; function W(a, b, c, d) { s.call(this, 4); this.c = a; this.j = b; this.e = c || new wb([]); this.m = !!d; b = 0 < this.e.a.length ? this.e.a[0].d : null; a.b && b && (a = b.name, a = z ? a.toLowerCase() : a, this.d = { name: a, l: b.l }); n: { a = this.e; for (b = 0; b < a.a.length; b++) if (c = a.a[b], c.f || 1 == c.g || 0 == c.g) { a = !0; break n } a = !1 } this.f = a } r(W);
	W.prototype.a = function (a) { var b = a.a, c = null, c = this.d, d = null, e = null, f = 0; c && (d = c.name, e = c.l ? R(c.l, a) : null, f = 1); if (this.m) if (this.f || this.c != xb) if (a = N((new W(yb, new M("node"))).a(a)), b = O(a)) for (c = this.k(b, d, e, f) ; null != (b = O(a)) ;) c = Va(c, this.k(b, d, e, f)); else c = new I; else c = Na(this.j, b, d, e), c = jb(this.e, c, f); else c = this.k(a.a, d, e, f); return c }; W.prototype.k = function (a, b, c, d) { a = this.c.d(this.j, a, b, c); return a = jb(this.e, a, d) };
	W.prototype.toString = function () { var a; a = "Step:" + P("Operator: " + (this.m ? "//" : "/")); this.c.h && (a += P("Axis: " + this.c)); a += P(this.j); if (this.e.a.length) { var b = F(this.e.a, function (a, b) { return a + P(b) }, "Predicates:"); a += P(b) } return a }; function zb(a, b, c, d) { this.h = a; this.d = b; this.a = c; this.b = d } zb.prototype.toString = h("h"); var Ab = {}; function X(a, b, c, d) { if (Ab.hasOwnProperty(a)) throw Error("Axis already created: " + a); b = new zb(a, b, c, !!d); return Ab[a] = b }
	X("ancestor", function (a, b) { for (var c = new I, d = b; d = d.parentNode;) a.a(d) && Wa(c, d); return c }, !0); X("ancestor-or-self", function (a, b) { var c = new I, d = b; do a.a(d) && Wa(c, d); while (d = d.parentNode); return c }, !0);
	var rb = X("attribute", function (a, b) { var c = new I, d = a.d(); if ("style" == d && b.style && z) return L(c, new A(b.style, b, "style", b.style.cssText)), c; var e = b.attributes; if (e) if (a instanceof M && null === a.b || "*" == d) for (var d = 0, f; f = e[d]; d++) z ? f.nodeValue && L(c, ya(b, f)) : L(c, f); else (f = e.getNamedItem(d)) && (z ? f.nodeValue && L(c, ya(b, f)) : L(c, f)); return c }, !1), xb = X("child", function (a, b, c, d, e) { return (z ? Sa : Ta).call(null, a, b, m(c) ? c : null, m(d) ? d : null, e || new I) }, !1, !0); X("descendant", Na, !1, !0);
	var yb = X("descendant-or-self", function (a, b, c, d) { var e = new I; H(b, c, d) && a.a(b) && L(e, b); return Na(a, b, c, d, e) }, !1, !0), ub = X("following", function (a, b, c, d) { var e = new I; do for (var f = b; f = f.nextSibling;) H(f, c, d) && a.a(f) && L(e, f), e = Na(a, f, c, d, e); while (b = b.parentNode); return e }, !1, !0); X("following-sibling", function (a, b) { for (var c = new I, d = b; d = d.nextSibling;) a.a(d) && L(c, d); return c }, !1); X("namespace", function () { return new I }, !1);
	var Bb = X("parent", function (a, b) { var c = new I; if (9 == b.nodeType) return c; if (2 == b.nodeType) return L(c, b.ownerElement), c; var d = b.parentNode; a.a(d) && L(c, d); return c }, !1), vb = X("preceding", function (a, b, c, d) { var e = new I, f = []; do f.unshift(b); while (b = b.parentNode); for (var g = 1, p = f.length; g < p; g++) { var q = []; for (b = f[g]; b = b.previousSibling;) q.unshift(b); for (var x = 0, v = q.length; x < v; x++) b = q[x], H(b, c, d) && a.a(b) && L(e, b), e = Na(a, b, c, d, e) } return e }, !0, !0);
	X("preceding-sibling", function (a, b) { for (var c = new I, d = b; d = d.previousSibling;) a.a(d) && Wa(c, d); return c }, !0); var Cb = X("self", function (a, b) { var c = new I; a.a(b) && L(c, b); return c }, !1); function Db(a) { s.call(this, 1); this.c = a; this.f = a.f; this.b = a.b } r(Db); Db.prototype.a = function (a) { return -Q(this.c, a) }; Db.prototype.toString = function () { return "Unary Expression: -" + P(this.c) }; function Eb(a) { s.call(this, 4); this.c = a; cb(this, Fa(this.c, function (a) { return a.f })); db(this, Fa(this.c, function (a) { return a.b })) } r(Eb); Eb.prototype.a = function (a) { var b = new I; E(this.c, function (c) { c = c.a(a); if (!(c instanceof I)) throw Error("Path expression must evaluate to NodeSet."); b = Va(b, c) }); return b }; Eb.prototype.toString = function () { return F(this.c, function (a, b) { return a + P(b) }, "Union Expression:") }; function Fb(a, b) { this.a = a; this.b = b } function Gb(a) { for (var b, c = []; ;) { Y(a, "Missing right hand side of binary expression."); b = Hb(a); var d = C(a.a); if (!d) break; var e = (d = hb[d] || null) && d.p; if (!e) { a.a.a--; break } for (; c.length && e <= c[c.length - 1].p;) b = new eb(c.pop(), c.pop(), b); c.push(b, d) } for (; c.length;) b = new eb(c.pop(), c.pop(), b); return b } function Y(a, b) { if (a.a.b.length <= a.a.a) throw Error(b); } function Ib(a, b) { var c = C(a.a); if (c != b) throw Error("Bad token, expected: " + b + " got: " + c); }
	function Jb(a) { a = C(a.a); if (")" != a) throw Error("Bad token: " + a); } function Kb(a) { a = C(a.a); if (2 > a.length) throw Error("Unclosed literal string"); return new ob(a) } function Lb(a) { var b = C(a.a), c = b.indexOf(":"); if (-1 == c) return new K(b); var d = b.substring(0, c); a = a.b(d); if (!a) throw Error("Namespace prefix not declared: " + d); b = b.substr(c + 1); return new K(b, a) }
	function Mb(a) {
		var b, c = [], d; if ("/" == B(a.a) || "//" == B(a.a)) { b = C(a.a); d = B(a.a); if ("/" == b && (a.a.b.length <= a.a.a || "." != d && ".." != d && "@" != d && "*" != d && !/(?![0-9])[\w]/.test(d))) return new sb; d = new sb; Y(a, "Missing next location step."); b = Nb(a, b); c.push(b) } else {
			n: {
				b = B(a.a); d = b.charAt(0); switch (d) {
					case "$": throw Error("Variable reference not allowed in HTML XPath"); case "(": C(a.a); b = Gb(a); Y(a, 'unclosed "("'); Ib(a, ")"); break; case '"': case "'": b = Kb(a); break; default: if (isNaN(+b)) if (!nb(b) && /(?![0-9])[\w]/.test(d) &&
                    "(" == B(a.a, 1)) { b = C(a.a); b = mb[b] || null; C(a.a); for (d = []; ")" != B(a.a) ;) { Y(a, "Missing function argument list."); d.push(Gb(a)); if ("," != B(a.a)) break; C(a.a) } Y(a, "Unclosed function argument list."); Jb(a); b = new kb(b, d) } else { b = null; break n } else b = new pb(+C(a.a))
				} "[" == B(a.a) && (d = new wb(Ob(a)), b = new ib(b, d))
			} if (b) if ("/" == B(a.a) || "//" == B(a.a)) d = b; else return b; else b = Nb(a, "/"), d = new tb, c.push(b)
		} for (; "/" == B(a.a) || "//" == B(a.a) ;) b = C(a.a), Y(a, "Missing next location step."), b = Nb(a, b), c.push(b); return new qb(d, c)
	}
	function Nb(a, b) {
		var c, d, e; if ("/" != b && "//" != b) throw Error('Step op should be "/" or "//"'); if ("." == B(a.a)) return d = new W(Cb, new M("node")), C(a.a), d; if (".." == B(a.a)) return d = new W(Bb, new M("node")), C(a.a), d; var f; if ("@" == B(a.a)) f = rb, C(a.a), Y(a, "Missing attribute name"); else if ("::" == B(a.a, 1)) { if (!/(?![0-9])[\w]/.test(B(a.a).charAt(0))) throw Error("Bad token: " + C(a.a)); c = C(a.a); f = Ab[c] || null; if (!f) throw Error("No axis with name: " + c); C(a.a); Y(a, "Missing node name") } else f = xb; c = B(a.a); if (/(?![0-9])[\w]/.test(c.charAt(0))) if ("(" ==
        B(a.a, 1)) { if (!nb(c)) throw Error("Invalid node type: " + c); c = C(a.a); if (!nb(c)) throw Error("Invalid type name: " + c); Ib(a, "("); Y(a, "Bad nodetype"); e = B(a.a).charAt(0); var g = null; if ('"' == e || "'" == e) g = Kb(a); Y(a, "Bad nodetype"); Jb(a); c = new M(c, g) } else c = Lb(a); else if ("*" == c) c = Lb(a); else throw Error("Bad token: " + C(a.a)); e = new wb(Ob(a), f.a); return d || new W(f, c, e, "//" == b)
	}
	function Ob(a) { for (var b = []; "[" == B(a.a) ;) { C(a.a); Y(a, "Missing predicate expression."); var c = Gb(a); b.push(c); Y(a, "Unclosed predicate expression."); Ib(a, "]") } return b } function Hb(a) { if ("-" == B(a.a)) return C(a.a), new Db(Hb(a)); var b = Mb(a); if ("|" != B(a.a)) a = b; else { for (b = [b]; "|" == C(a.a) ;) Y(a, "Missing next union location path."), b.push(Mb(a)); a.a.a--; a = new Eb(b) } return a }; function Pb(a, b) { if (!a || !a.length) throw Error("Empty XPath expression."); var c = Aa(a); if (c.b.length <= c.a) throw Error("Invalid XPath expression."); b ? "function" == aa(b) || (b = n(b.lookupNamespaceURI, b)) : b = k(null); var d = Gb(new Fb(c, b)); if (!(c.b.length <= c.a)) throw Error("Bad token: " + C(c)); this.evaluate = function (a, b) { var c = d.a(new t(a)); return new Z(c, b) } }
	function Z(a, b) {
		if (0 == b) if (a instanceof I) b = 4; else if ("string" == typeof a) b = 2; else if ("number" == typeof a) b = 1; else if ("boolean" == typeof a) b = 3; else throw Error("Unexpected evaluation result."); if (2 != b && 1 != b && 3 != b && !(a instanceof I)) throw Error("value could not be converted to the specified type"); this.resultType = b; var c; switch (b) {
			case 2: this.stringValue = a instanceof I ? Ya(a) : "" + a; break; case 1: this.numberValue = a instanceof I ? +Ya(a) : +a; break; case 3: this.booleanValue = a instanceof I ? 0 < a.i : !!a; break; case 4: case 5: case 6: case 7: var d =
            N(a); c = []; for (var e = O(d) ; e; e = O(d)) c.push(e instanceof A ? e.a : e); this.snapshotLength = a.i; this.invalidIteratorState = !1; break; case 8: case 9: d = Xa(a); this.singleNodeValue = d instanceof A ? d.a : d; break; default: throw Error("Unknown XPathResult type.");
		} var f = 0; this.iterateNext = function () { if (4 != b && 5 != b) throw Error("iterateNext called with wrong result type"); return f >= c.length ? null : c[f++] }; this.snapshotItem = function (a) {
			if (6 != b && 7 != b) throw Error("snapshotItem called with wrong result type"); return a >= c.length ||
            0 > a ? null : c[a]
		}
	} Z.ANY_TYPE = 0; Z.NUMBER_TYPE = 1; Z.STRING_TYPE = 2; Z.BOOLEAN_TYPE = 3; Z.UNORDERED_NODE_ITERATOR_TYPE = 4; Z.ORDERED_NODE_ITERATOR_TYPE = 5; Z.UNORDERED_NODE_SNAPSHOT_TYPE = 6; Z.ORDERED_NODE_SNAPSHOT_TYPE = 7; Z.ANY_UNORDERED_NODE_TYPE = 8; Z.FIRST_ORDERED_NODE_TYPE = 9; function Qb(a) { this.lookupNamespaceURI = $a(a) }; function Rb(a) { a = a || l; var b = a.document; b.evaluate || (a.XPathResult = Z, b.evaluate = function (a, b, e, f) { return (new Pb(a, e)).evaluate(b, f) }, b.createExpression = function (a, b) { return new Pb(a, b) }, b.createNSResolver = function (a) { return new Qb(a) }) } var Sb = ["wgxpath", "install"], $ = l; Sb[0] in $ || !$.execScript || $.execScript("var " + Sb[0]); for (var Tb; Sb.length && (Tb = Sb.shift()) ;) Sb.length || void 0 === Rb ? $ = $[Tb] ? $[Tb] : $[Tb] = {} : $[Tb] = Rb;
})();

// device detection
// categorizr.isMobile, categorizr.isTablet, categorizr.isDesktop
// http://skookum.com/blog/categorizr-js-device-detection-for-your-responsive-websites/
// https://github.com/Skookum/categorizr.js
(function (name, context, definition) {
	if (typeof module !== 'undefined') module.exports = definition(name, context);
	else if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
	else context[name] = definition(name, context);
}('categorizr', this, function (name, context) {
	// isBrowser implementation based on https://github.com/jquery/jquery/blob/master/src/core.js
	var key // used in a loop below
	  , isBrowser = context != null && context == context.window
	  , isNode = !isBrowser
	  , is$ = isBrowser && context.$
	  , eventEmitter = (function () {
	  	var e
	  	if (is$) e = context.$('').trigger
	  	return e
	  }())
	  , docElement = isNode ? null : document.documentElement

	  , deviceTypes = 'Tv Desktop Tablet Mobile'.split(' ')

	  , test = function (ua) {
	  	// smart tv
	  	return ua.match(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i) ? 'tv'
                // tv-based gaming console
              : ua.match(/Xbox|PLAYSTATION.3|Wii/i) ? 'tv'
                // tablet
              : ua.match(/iPad/i) || ua.match(/tablet/i) && !ua.match(/RX-34/i) || ua.match(/FOLIO/i) ? 'tablet'
                // android tablet
              : ua.match(/Linux/i) && ua.match(/Android/i) && !ua.match(/Fennec|mobi|HTC.Magic|HTCX06HT|Nexus.One|SC-02B|fone.945/i) ? 'tablet'
                // Kindle or Kindle Fire
              : ua.match(/Kindle/i) || ua.match(/Mac.OS/i) && ua.match(/Silk/i) ? 'tablet'
                // pre Android 3.0 Tablet
              : ua.match(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || ua.match(/MB511/i) && ua.match(/RUTEM/i) ? 'tablet'
                // unique Mobile User Agent
              : ua.match(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google.Wireless.Transcoder/i) ? 'mobile'
                // odd Opera User Agent - http://goo.gl/nK90K
              : ua.match(/Opera/i) && ua.match(/Windows.NT.5/i) && ua.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i) ? 'mobile'
                // Windows Desktop
              : ua.match(/Windows.(NT|XP|ME|9)/) && !ua.match(/Phone/i) || ua.match(/Win(9|.9|NT)/i) ? 'desktop'
                // Mac Desktop
              : ua.match(/Macintosh|PowerPC/i) && !ua.match(/Silk/i) ? 'desktop'
                // Linux Desktop
              : ua.match(/Linux/i) && ua.match(/X11/i) ? 'desktop'
                // Solaris, SunOS, BSD Desktop
              : ua.match(/Solaris|SunOS|BSD/i) ? 'desktop'
                // Desktop BOT/Crawler/Spider
              : ua.match(/Bot|Crawler|Spider|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|TinEye/i) && !ua.match(/Mobile/i) ? 'desktop'
                // assume it is a Mobile Device (mobile-first)
              : 'mobile'
	  }
	  , device = test(context.navigator ? context.navigator.userAgent
					  : context.request ? context.request.headers['user-agent']
					  : 'No User-Agent Provided')
	  , is = function (type) {
	  	return device === type
	  }
	  , categorizr = function () {
	  	var args = [].slice.call(arguments, 0)

	  	// previously categorizeType. arg1 = real, arg2 = fake
	  	if (args.length === 2 && device === args[0]) {
	  		device = args[1]
	  		_update()
	  	}

	  		// else set type
	  	else if (args.length === 1 && typeof args[0] === 'string') {
	  		// todo: can only set to registered deviceTypes
	  		device = args[0]
	  		_update()
	  	}

	  	// always return device. no args returns device
	  	return device
	  }

	categorizr.is = is
	categorizr.test = test

	// set quick access properties
	// e.g. categorizr.isTv => false
	//      categorizr.isDesktop => true
	//      categorizr.isTablet => false
	//      categorizr.isMobile => false
	function _setDeviceBooleans() {
		var i = deviceTypes.length
		while (i--) {
			categorizr['is' + deviceTypes[i]] = is(deviceTypes[i].toLowerCase())
			if (is$) context.$['is' + deviceTypes[i]] = is(deviceTypes[i].toLowerCase())
		}
	}

	function _setClassName() {
		if (isBrowser) {
			docElement.className = docElement.className.replace(/(^|\s)desktop|tablet|tv|mobile(\s|$)/, '$1$2') + (' ' + device)
		}
	}

	function _update() {
		_setDeviceBooleans()
		//_setClassName()

		// trigger deviceChange event
		if (eventEmitter) context.$(context).trigger('deviceChange', [{ type: device }])
	}

	// init
	_update()

	if (is$) {
		// put categorizr onto global $
		for (key in categorizr)
			if (Object.hasOwnProperty.call(categorizr, key))
				context.$[key == 'test' ? 'testUserAgent' : key == 'is' ? 'isDeviceType' : key] = categorizr[key]
		context.$.categorizr = categorizr
	}

	return categorizr;
}));

//  ====================================================================================================
//  Object.create POLYFILL
//  ====================================================================================================

if (typeof Object.create != 'function') {
    Object.create = (function () {
        var Object = function () { };
        return function (prototype) {
            if (arguments.length > 1) {
                throw Error('Second argument not supported');
            }
            if (typeof prototype != 'object') {
                throw TypeError('Argument must be an object');
            }
            Object.prototype = prototype;
            var result = new Object();
            Object.prototype = null;
            return result;
        };
    })();
}

//  ====================================================================================================
//  Array.indexOf POLYFILL
//  ====================================================================================================

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {

        var k;

        // 1. Let O be the result of calling ToObject passing
        //    the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get
        //    internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        //    ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        //    If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            var kValue;
            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            //    HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            //    i.  Let elementK be the result of calling the Get
            //        internal method of O with the argument ToString(k).
            //   ii.  Let same be the result of applying the
            //        Strict Equality Comparison Algorithm to
            //        searchElement and elementK.
            //  iii.  If same is true, return k.
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}


//  ====================================================================================================
//  Responsive IMG Functions
//  ====================================================================================================


//  ====================================================================================================
//  Ititialize The Responsive IMG 
//	Function: AVLUTILITIES.initResponsiveImg()
//  
//	Description: If the speed and window width cookies are unavailable it will set them.
//	
//	ARGS: (none)
//	RETURNS: (none)
//  ====================================================================================================


AVLUTILITIES.initResponsiveImg = function () {
    //if the speed cookie doesn't exist get the speed and set the cookie
    if (!AVLUTILITIES.getCookie('speed')) {
        AVLUTILITIES.getBandwidth();
    }
    //if the width cookie doesn't exist get the width and set the cookie
    if (!AVLUTILITIES.getCookie('windowW')) {
        AVLUTILITIES.getScreenSize();
    }
}; // AVLUTILITIES.initResponsiveImg()


//  ====================================================================================================
//  Get Bandwidth 
//	Function: AVLUTILITIES.getBandwidth()
//  
//	Description: Gets the speed of the Download and sets a cookie
//	
//	ARGS: (none)
//	RETURNS: (none)
//  ====================================================================================================

AVLUTILITIES.getBandwidth = function () {
    var tries = 1,	//number of tries to test
		speedKbps = [],	//speed of all tries in Kbs
		speedMbps = 0, //speed for the cookie in Mbs
		n = 0;	//Counter


    //Run test speed function for each try
    for (n = 0; n < tries; n++) {
        testSpeed();
    } //for

    //  ====================================================================================================
    //  Test Speed
    //	Function: testSpeed()
    //  
    //	Description: Gets the speed of the Download
    //	
    //	ARGS: (none)
    //	RETURNS: (none)
    //  ====================================================================================================

    function testSpeed() {

        var file = "/CommonControls/Universal/Common/IMG/TestImg.jpg" + "?n=" + Math.random(),	//file to download
			startTime,																			//start Time
			endTime,																			//end Time
			downloadSize = 1052672,																//size of the file
			img = new Image();																	//new IMG element

        //set onload Function to save the speed
        img.onload = saveSpeed;
        //get the start time
        startTime = new Date().getTime();
        //set the source to the file
        img.src = file;

        //  ====================================================================================================
        //  Save Speed
        //	Function: saveSpeed()
        //  
        //	Description: Saves the speed of the Download to array and when all the speeds are collected saves a cookie
        //	
        //	ARGS: (none)
        //	RETURNS: (none)
        //  ====================================================================================================

        function saveSpeed() {
            // set the end time
            endTime = new Date().getTime();
            //add the speed in Kbps to the array
            speedKbps.push((downloadSize * 0.9765625 / (endTime - startTime)));

            //if all of the tries are completed
            if (speedKbps.length == tries) {
                //add all of the speeds together
                for (var i = 0; i < speedKbps.length; i++) {
                    speedMbps += speedKbps[i];
                }//for
                //get average of speeds and convert to Mbps
                speedMbps = speedMbps / (tries * 1024);
                //set the cookie
                AVLUTILITIES.setCookie('speed', speedMbps, 7);
            }//if
        }//saveSpeed() 
    }//testSpeed()
};//AVLUTILITIES.getBandwidth()


//  ====================================================================================================
//  Get Screen Size
//	Function: AVLUTILITIES.getScreenSize ()
//  
//	Description: Gets the window width, screen width, and pixel ratio and  saves a cookie for each
//	
//	ARGS: (none)
//	RETURNS: (none)
//  ====================================================================================================


AVLUTILITIES.getScreenSize = function () {

    var windowW = window.innerWidth,		//the window width
		screenW = screen.availWidth,		//the screen width
		ratio = window.devicePixelRatio;	//the pixel ratio

    //Set the Cookies
    AVLUTILITIES.setCookie('windowW', windowW, 7);
    AVLUTILITIES.setCookie('screenW', screenW, 7);
    AVLUTILITIES.setCookie('ratio', ratio, 7);

};//AVLUTILITIES.getScreenSize ()

//Run AVLUTILITIES.initResponsiveImg() on ready
$(document).ready(function () {
    //set timeout to ensure nothing else is loading.
    setTimeout(AVLUTILITIES.initResponsiveImg, 3000);
    //reset screensize cookie on window resize
    $(window).on('resize', AVLUTILITIES.getScreenSize);
}); //$(document).ready


//  ====================================================================================================
//  END OF Responsive IMG Functions
//  ====================================================================================================
