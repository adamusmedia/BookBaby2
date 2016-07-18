/* 	===================================================================================================================================================
   SCRIPTS-RESPONSIVE.JS

   The main responsive site scripts.


   TABLE OF CONTENTS	> = runs		+ = creates
   =================
	+	cookie functions

	+	getComputedStyle IE 8 PolyFill

	+	Responsive															Global Namespace Declaration
	+	Responsive.Vars														Namespace for global variables
	+	Responsive.Vars.animating											Int - Number of currently animating elements
	+	Responsive.Vars.IsMobile											Bool - is it a mobile width?
	+	Responsive.Vars.bp													string - browser prefix
	+	Responsive.$container												$obj - the $('#slideout-container')
	+	Responsive.Vars.isKeyboard											true when onscreen keyboard is being shown in Safari
	+	Responsive.Functions												Namespace for global functions

	+	Responsive.Functions.nonAsyncBinding()								Run initial binding functions on non Async elements
		>	Responsive.Functions.BindResize();								
		>	Responsive.Functions.BindClicks();								
		>	Responsive.Functions.BindSwipe();								

	+	Responsive.Functions.BindResize()									Bind the window Resize & window.onorientationchange events

	+	Responsive.Functions.BindClicks()									Bind all of the click events
		>	bind #mobile-site-header #togglenav-button-header
		>	bind #mobile-site-header #togglehelp-button-header 
		>	bind #mobile-site-header .dropDown-menu-link
		>	bind #mobile-site-header #slideout-overlay

	+	Responsive.Functions.BindSwipe()									Bind the swipe event (using Hammer.js)
		>	bind body

	+	Responsive.Functions.handleSlideoutSwipe(e)							The function that handles the swipe event
	+	Responsive.Functions.getTransformX(offsetX)
	+	Responsive.Functions.CheckForFontface()								Check for FontFace
	+	Responsive.Functions.ToggleHiddenSlideOut(isNav)					Toggle the slideout of the help and main site navigation
	+	Responsive.Functions.ResetSlideout()								Reset slideouts to original positions
	+	Responsive.Functions.SetIsMobile()									Sets the Responsive.Vars.IsMobile Variable and resets slideout if necessary
	+	Responsive.Functions.showFeedback()									Show or hide the feedback tab/button (dependent on feedback scripts)
	+	Responsive.Functions.IsSlideoutVisible()							Returns true if a slideout is visible
	+	Responsive.Functions.showPageMenu(menu)								Shows the clicked(menu) page menu in the footer or the page-title menu
	+	Responsive.Functions.hidePageMenu(menu)								Hides the clicked(menu) page menu in the footer or the page-title menu
	+	Responsive.Functions.hasCSS(styles)									Check for a css style
	+	Responsive.Functions.CheckForOverflowScrolling()					Check for OverflowScrolling(uses Responsive.Functions.hasCSS(styles)
	+	Responsive.Functions.BindIsKeyboard()									Use variable Responsive.Vars.isKeyboard for when onscreen keyboard is being shown in Safari

	>    $(document).ready													Run the document.ready function
    	>	Responsive.$container = $('#slideout-container');				Set $container variable
		>	FastClick.attach(document.body);								Attach the FastClick Plugin
    	>	Responsive.Functions.nonAsyncBinding();							Run the initial binding function
    	>	Responsive.Functions.CheckForFontface();						Check for fontface
    	>	Responsive.Functions.SetIsMobile();								Check for mobile
    	// >	setTimeout(Responsive.Functions.showFeedback, 0);				Run ShowFeedback function - setTimeout so it happens after the feedback UC scripts

    =================================================================================================================================================== */

//  ====================================================================================================
//  getComputedStyle IE 8 PolyFill
//  ====================================================================================================

!('getComputedStyle' in this) && (this.getComputedStyle = (function () {
    function getPixelSize(element, style, property, fontSize) {
        var
		sizeWithSuffix = style[property],
		size = parseFloat(sizeWithSuffix),
		suffix = sizeWithSuffix.split(/\d/)[0],
		rootSize;

        fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
        rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

        return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
    }

    function setShortStyleProperty(style, property) {
        var
		borderSuffix = property == 'border' ? 'Width' : '',
		t = property + 'Top' + borderSuffix,
		r = property + 'Right' + borderSuffix,
		b = property + 'Bottom' + borderSuffix,
		l = property + 'Left' + borderSuffix;

        style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
		: style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
		: style[l] == style[r] ? [style[t], style[r], style[b]]
		: [style[t], style[r], style[b], style[l]]).join(' ');
    }

    function CSSStyleDeclaration(element) {
        var
		currentStyle = element.currentStyle,
		style = this,
		fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

        for (property in currentStyle) {
            if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
                style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
            } else if (property === 'styleFloat') {
                style['float'] = currentStyle[property];
            } else {
                style[property] = currentStyle[property];
            }
        }

        setShortStyleProperty(style, 'margin');
        setShortStyleProperty(style, 'padding');
        setShortStyleProperty(style, 'border');

        style.fontSize = fontSize + 'px';

        return style;
    }

    CSSStyleDeclaration.prototype = {
        constructor: CSSStyleDeclaration,
        getPropertyPriority: function () { },
        getPropertyValue: function (prop) {
            return this[prop] || '';
        },
        item: function () { },
        removeProperty: function () { },
        setProperty: function () { },
        getPropertyCSSValue: function () { }
    };

    function getComputedStyle(element) {
        return new CSSStyleDeclaration(element);
    }

    return getComputedStyle;
})(this));


/* 	===================================================================================================================================================
    Global Namespace: Responsive
    =================================================================================================================================================== */

var Responsive = {};

/* 	===================================================================================================================================================
    Global Variables
    =================================================================================================================================================== */

Responsive.Vars = {};
Responsive.Vars.animating = 0;
Responsive.Vars.MobileWidth = 960;
Responsive.Vars.IsMobile;
Responsive.Vars.bp =
	$.browser.webkit ? "-webkit-" : false ||
	$.browser.msie ? "-ms-" : false ||
	!!window.MSStream ? "" : false ||
	$.browser.mozilla ? "-moz-" : false ||
	$.browser.opera ? "-o-" : false;
Responsive.Vars.startX = null;
Responsive.Vars.startY = null;
Responsive.Vars.responsiveStyles = null;
Responsive.Vars.isKeyboard = false;
Responsive.$container;
Responsive.Vars.ScrollTop = $(window).scrollTop();
Responsive.Vars.IsLoggedIn = false;

/* 	===================================================================================================================================================
    Global Functions
    =================================================================================================================================================== */

Responsive.Functions = {};

/* 	===================================================================================================================================================
	(Function) Responsive.Functions.nonAsyncBinding()
	=================================================================================================================================================== */

Responsive.Functions.nonAsyncBinding = function () {

    Responsive.Functions.BindResize();
    Responsive.Functions.BindClicks();
    //Responsive.Functions.BindSwipe();

};   // Responsive.Functions.nonAsyncBinding


/* 	===================================================================================================================================================
	(Function) Responsive.Functions.BindResize()
	=================================================================================================================================================== */

Responsive.Functions.BindResize = function () {

    // on window resize change adjust the layout
    $(window).on('resize orientationchange', function () {
        Responsive.Functions.SetIsMobile();
        //Responsive.Functions.ResizeSlider();
        Responsive.Functions.ResizeDropDowns();
        Responsive.Functions.ShowOverlay();
        //Responsive.Functions.showFeedback();
    });	// resize()

};   // Responsive.Functions.BindResize

Responsive.Functions.ResizeSlider = function () {

    if ($(window).width() >= 1610) {
        var parentSection = $(".dm-slider").closest("section");
        if ((parentSection).hasClass("digipaks")) {
            $(".dm-slider").height(483);
        } else {
            $(".dm-slider").height(400);
        }
    } else {
        console.log($(".img-1").height());
        //$(".dm-slider").height($(".img-1").height());
    }
    //console.log(".dm-slider = " + $(".dm-slider").height());
    //console.log(".img-1 = " + $(".img-1").height());
};	// Responsive.Functions.ResizeSlider

Responsive.Functions.ShowSearch = function (showSearch) {
    if (showSearch) {
        $('#header-search').addClass('open');
        if (!$("html").hasClass("isMobile")) {
            $("div.main-nav>ul.level1").hide();
        }
        $("#headersuggest").removeClass("hidden");
        $('#SearchTerms').val('').siblings('label').removeClass('inputted');
    }
    else {
        $('#header-search').removeClass('open');
        $("div.main-nav>ul.level1").show();
        $("#headersuggest").addClass("hidden");
        $("#headersuggest").empty();
    }
    return false;
};

Responsive.Functions.ShowOverlay = function () {
    if ($('#overlay').is(':visible')) {
        if (Responsive.Vars.IsMobile) {
            $('#overlay').hide();
        }
    }
    return false;
};
/* 	===================================================================================================================================================
	(Function) Responsive.Functions.BindClicks()
	================================================================================================================================================== */

Responsive.Functions.BindClicks = function () {
    var radioLabels = [];

    $('.open-menu-link').unbind('click').bind('click', Responsive.Functions.ShowHideMenu);	// #togglenav-button-header' - click

    $('#slideout-overlay').unbind('click').bind('click', function (e) {
        e.stopPropagation();
        Responsive.Functions.HideMenu();
        return false;
    }); // #slideout-overlay - click

    $("[data-toggle='nav-menu']").unbind('click').bind('click', function (e) {
        var clicked = $(this);

        if ($(clicked).closest("ul").attr("class") == "level1") {
            $(".level2:visible").each(function () {
                if (($(this) != $(clicked).next())) {
                    $(this).hide();
                }
            });
        } else {
            if ($(".level3:visible").length > 0) {
                $(".level3:visible").each(function () {
                    if (($(this) != $(clicked).prev())) {
                        $(this).hide();
                    }
                });
            } else {
                if (Responsive.Vars.IsMobile) {
                    window.location = $(clicked).attr("href");
                }
            }
        }

        var parent = $(clicked).closest("ul").attr("class");
        var menu = (parent == "level1") ? $(clicked).next("ul") : $(clicked).prev("ul");
        //console.log($(clicked).closest("ul").attr("class"));
        menu.show();
        Responsive.Functions.ResizeDropDowns();
        e.stopPropagation();
        return false;
    });	// data-toggle=['nav-menu]

    $("[data-toggle='nav-menu']").click(function (e) {
        e.stopPropagation();
    });

    $(document).unbind('click').bind('click', function (e) {
        $("ul.level2").hide();
        $("ul.level3").hide();
        if (Responsive.Vars.IsMobile) {
            $(".main-nav > ul > li").removeClass("open");
        }
    });

    $('.close-search-link').unbind('click').bind('click', function (e) { return Responsive.Functions.ShowSearch(false) });
    $('.open-search-link').unbind('click').bind('click', function (e) { return Responsive.Functions.ShowSearch(true) });

    $('.main-nav .level1>li>a').on('click', function (e) {
        var $target = $(e.target || e.srcElement),
                $li = $target.closest('li');
        if ($li.find('.level2').size()) {
            if (Responsive.Vars.IsMobile) {
                e.preventDefault;
                e.stopPropagation;
                var $target = $(e.target || e.srcElement),
                    $li = $target.closest('li');
                if ($li.hasClass('open')) {
                    $li.removeClass('open');
                }
                else {
                    $li.addClass('open');
                    $('.main-nav .level1 li').not($li).removeClass('open');
                }
                return false;

            }
        }
        return true;
    });

    $('input[type=radio]').closest(':has(label)').find('label').each(function () {
        radioLabels.push(this);
    });
    $(radioLabels).on('click', function (event) {
        el = document.getElementById(this.getAttribute('for'));
        if ($(el).attr('type') == 'radio') {
            event.preventDefault();
            el.click(); el.click();
        }
    });
    $('.mobile-moreinfo-link').on('click', function () {
        if ($(window).width() <= 500) {
            if (!$(this).hasClass('open')) {
                $(this).addClass('open').closest(':has(.mobile-moreinfo)').find('.mobile-moreinfo').addClass('open');
            }
            else {
                $(this).removeClass('open').closest(':has(.mobile-moreinfo)').find('.mobile-moreinfo').removeClass('open');
            }
        }
        return false;
    });
    $('.moreinfo-link').on('click', function () {
        if (!$(this).hasClass('open')) {
            $(this).addClass('open').closest(':has(.moreinfo)').find('.moreinfo').addClass('open');
        }
        else {
            $(this).removeClass('open').closest(':has(.moreinfo)').find('.moreinfo').removeClass('open');
        }
        return false;
    });
};   // Responsive.Functions.BindClicks


Responsive.Functions.ShowHideMenu = function (e) {
    if ($('#site-header').hasClass('open')) {
        Responsive.Functions.HideMenu();
    }
    else {
        Responsive.Functions.ShowMenu();
    }
    return false;
};
Responsive.Functions.ShowMenu = function (e) {
    $('#site-header, #mobile-header').addClass('open');
    return false;
};
Responsive.Functions.QuickHideMenu = function () {
    $('#site-header, #mobile-header').removeClass('open').removeClass('closing');
    return false;
};
Responsive.Functions.HideMenu = function () {
    $('#site-header, #mobile-header').addClass('closing');
    setTimeout(function () {
        $('#site-header, #mobile-header').removeClass('open').removeClass('closing');
    }, 700);
};

/* 	===================================================================================================================================================
	(Function) Responsive.Functions.BindSwipe()
	=================================================================================================================================================== */

Responsive.Functions.BindSwipe = function () {

    $('html.touch').hammer({ drag_lock_to_axis: true, prevent_mouseevents: true, stop_browser_behavior: false, swipe: false }).on('dragend dragleft dragright dragup dragdown', Responsive.Functions.handleSlideoutSwipe);

};   // Responsive.Functions.BindSwipe


/* 	===================================================================================================================================================
	(Function) Responsive.Functions.handleSlideoutSwipe(e)
	
	e = obj - touch event
	=================================================================================================================================================== */

Responsive.Functions.handleSlideoutSwipe = function (e) {
    var target = e.target || e.srcElement;
    if ($(target).hasClass('touchable', 'avlModal', 'draggable', 'ui-sortable') || $(target).parents().hasClass('touchable', 'avlModal', 'draggable', 'ui-sortable') || $('.avlModal').is(':visible')) {
        return true;
    }
    if ($(target).hasClass('overlay')) {
        e.preventDefault();
        e.stopPropogation();
    }

    var offsetX = e.gesture.deltaX,
		offsetY = e.gesture.deltaY,
		isNav = $('#site-navigation').hasClass('active'),
		animate = false,
		transform = {},
		transformFunction = null;
    switch (e.type) {
        case 'dragright':
        case 'dragleft':
        case 'dragdown':
        case 'dragup':

            //console.log(offsetX + ',' + offsetY);

            if (Math.abs(offsetX) > Math.abs(offsetY)) {

                e.gesture.preventDefault();
                e.gesture.stopPropagation();
                if (Responsive.$container.hasClass('slide-out')) {
                    if (isNav && offsetX < 0) {
                        Responsive.Functions.ToggleHiddenSlideOut(true);
                    } // if
                    else if (!isNav && offsetX > 0) {
                        Responsive.Functions.ToggleHiddenSlideOut(false);
                    } // else if

                } // if
                else if (Responsive.$container.is(':not(:animated)') && !Responsive.Vars.animating) {
                    transform = Responsive.Functions.getTransformX(offsetX);
                    Responsive.$container.css(transform);
                }
            }
            else if (offsetY > 0) {
                if ($('#slideout-content').scrollTop() == 0) {
                    e.gesture.preventDefault();
                    e.gesture.stopPropagation();
                    //$('#slideout-container').scrollTop(0);
                }
            }
            else if (offsetY < 0) {
                //console.log($('#slideout-container').scrollTop() + ' + ' + $('#slideout-container').height() + ' >= ' + $('#slideout-container')[0].scrollHeight);
                if ($('#slideout-content').scrollTop() + $('#slideout-content').height() >= $('#slideout-content')[0].scrollHeight) {
                    e.gesture.preventDefault();
                    e.gesture.stopPropagation();
                    //$('#slideout-container').scrollTop($('#slideout-container')[0].scrollHeight - $('#slideout-container').height());
                }
            }
            break;
        case 'dragend':
            if (!Responsive.$container.hasClass('slide-out') && Responsive.$container.is(':not(:animated)') && !Responsive.Vars.animating) {
                if (Math.abs(offsetX) > 80) {
                    if (offsetX > 0) {
                        //console.log('true');
                        Responsive.Functions.ToggleHiddenSlideOut(true);
                    }   // if
                    else {

                        //console.log('false');
                        Responsive.Functions.ToggleHiddenSlideOut(false);
                    }   // else
                }   // if
                else {
                    //console.log('else');
                    transform = Responsive.Functions.getTransformX(0);
                    Responsive.$container.cssAnimate(transform, 300, 'ease', function () {
                        if (!Responsive.$container.hasClass('slide-out') && Responsive.$container.is(':not(:animated)') && !Responsive.Vars.animating) {
                            Responsive.Functions.ResetSlideout();
                        }
                    }); // animate
                } // else 
            }
            break;

    }   // switch
    $('#slideout-content').scrollLeft(0);

}   // handleSliderHammer

/* 	===================================================================================================================================================
	(Function) Responsive.Functions.getTransformX(offsetX)
	=================================================================================================================================================== */

Responsive.Functions.getTransformX = function (offsetX) {
    var transform = {};

    if (Modernizr.csstransforms3d) {
        transform[Responsive.Vars.bp + "transform"] = "translate3d(" + offsetX + "px, 0px, 0px) scale3d(1,1,1)";
    } // if
    else if (Modernizr.csstransforms) {
        transform[Responsive.Vars.bp + "transform"] = "translate(" + offsetX + "px, 0px)";
    } // else if
    else {
        transform[left] = offsetX;
    } // else
    return transform;
} // Responsive.Functions.getTransformX(offsetX)


/* 	===================================================================================================================================================
	(Function) Responsive.Functions.CheckForFontface()
	=================================================================================================================================================== */

Responsive.Functions.CheckForFontface = function () {

    // check for browsers that return true for font face support, however do not support font icons :(
    if (!!navigator.userAgent.match(/(Android (2.0|2.1))|(Nokia)|(Opera (Mini|Mobi))|(w(eb)?OSBrowser)|(UCWEB)|(Windows Phone)|(XBLWP)|(ZuneWP)/)) {
        $('.no-fontface').show();
        $('.icon-link i, .icon-info, .icon-help-1, .icon-ok, .icon-menu').hide();
        $('.icon-link, .icon-link:active').css({ lineHeight: '27px' });
        $('#mobile-site-header a').width(60);
    }   // if

};   // Responsive.Functions.CheckForFontface


/* 	===================================================================================================================================================
    (Function) Responsive.Functions.ToggleHiddenSlideOut(isNav) 

	isNav = bool - is site navigation
    =================================================================================================================================================== */

Responsive.Functions.ToggleHiddenSlideOut = function (isNav) {

    var transition = 'ease',
		slideSpeed = 300,
		transform = {},
		offsetX = 0,
		transitionFunction = null;


    if (Responsive.$container.is(':not(:animated)') && !Responsive.Vars.animating) {

        Responsive.Vars.animating++;

        if (!Responsive.Functions.IsSlideoutVisible()) {
            Responsive.$container.addClass('slide-out');
            if (isNav) {
                $('#site-navigation').addClass('active');
                offsetX = $('#site-navigation').width();
            } // if
            else {
                $('#mobile-help').addClass('active');
                offsetX = -Math.min($(window).width() * .9, $('body').width() - 62);
            } // else
            $('#feedback-tab').cssAnimate({ 'bottom': '-50px' }, slideSpeed, transition, transitionFunction);
        } // if
        else {
            transitionFunction = function () { Responsive.Functions.ResetSlideout(); };
            $('#feedback-tab').cssAnimate({ 'bottom': '0' }, slideSpeed, transition, transitionFunction);
        } // else

        transform = Responsive.Functions.getTransformX(offsetX);

        Responsive.$container.cssAnimate(transform, slideSpeed, transition, transitionFunction);
        setTimeout(function () { Responsive.Vars.animating--; }, slideSpeed);

    }   // if

};   // Responsive.Functions.ToggleHiddenSlideOut


/* 	===================================================================================================================================================
    (function) Responsive.Functions.ResetSlideout()
    =================================================================================================================================================== */

Responsive.Functions.ResetSlideout = function () {

    Responsive.$container.removeClass('slide-out');
    Responsive.$container.css({ left: '', transform: '' });
    $('#site-navigation, #mobile-help').removeClass('active');

};   // Responsive.Functions.ResetSlideout

/* 	===================================================================================================================================================
	(function) Responsive.Functions.AdjustSlideout()
	=================================================================================================================================================== */

Responsive.Functions.AdjustSlideout = function () {
    var transform = {},
		offsetX = 0;

    if ($('#site-navigation').hasClass('active')) {
        offsetX = $('#site-navigation').width();
    }   // if
    else {
        offsetX = -$('#mobile-help').width();
    }   // else

    transform = Responsive.Functions.getTransformX(offsetX);
    Responsive.$container.css(transform);
};   // Responsive.Functions.AdjustSlideout

/* 	===================================================================================================================================================
	(function) Responsive.Functions.ResizeDropDowns()
	=================================================================================================================================================== */

Responsive.Functions.ResizeDropDowns = function () {
    var maxHeight = window.innerHeight - 65;

    if (Responsive.Vars.IsMobile) {
        $('.level2 li').show();
    }
    else {
        $('.level2, .level3').each(function () {
            var $menu = $(this),
                menuHeight = Responsive.Functions.GetMenuHeight($menu),
                n = 0;

            for (n = $menu.children('li:hidden').size() ; menuHeight < maxHeight - 45 && n > 0; n--) {
                $menu.children('li:hidden').first().show();
                menuHeight = Responsive.Functions.GetMenuHeight($menu);
            }

            if ($menu.children('li:hidden:not(.view-all)').size()) {
                $menu.children('li.view-all:hidden').show();
            }

            var parent = $menu.closest("ul").attr("class");

            if (parent == "level2") {
                for (n = $menu.children('li:visible:not(.view-all)').size() ; menuHeight > maxHeight && n > 0; n--) {
                    $menu.children('li:visible:not(.view-all)').last().hide();
                    menuHeight = Responsive.Functions.GetMenuHeight($menu);
                }
            } else {
                for (n = $menu.children('li:visible:not(.view-all)').size() ; menuHeight + 300 > maxHeight && n > 0; n--) {
                    $menu.children('li:visible:not(.view-all)').last().hide();
                    menuHeight = Responsive.Functions.GetMenuHeight($menu);
                }
            }

            if ($menu.children('li:hidden:not(.view-all)').size()) {
                $menu.children('li.view-all:hidden').show();
            }
            else if (!$menu.children('li:hidden:not(.view-all)').size()) {
                $menu.children('li.view-all.hidden:visible').hide();
            }
        });
    }
};

/* 	===================================================================================================================================================
	(function) Responsive.Functions.GetMenuHeight()
	=================================================================================================================================================== */

Responsive.Functions.GetMenuHeight = function ($menu) {
    var height = 0;
    $menu.children('li:visible').each(function () {
        height += $(this).children('a').first().outerHeight();
    }); // .each()
    return height;
}; // function getChildrenHeight($container)



/* 	===================================================================================================================================================
    (function) Responsive.Functions.SetIsMobile()
    =================================================================================================================================================== */

Responsive.Functions.SetIsMobile = function () {
    var transform = {};
    // to mobile, or not to mobile
    if ($(window).width() > Responsive.Vars.MobileWidth && Responsive.Vars.IsMobile) {
        Responsive.Vars.IsMobile = false;
        $('html').removeClass('isMobile');
        Responsive.Functions.HideMenu();
    }   // if
    else if ($(window).width() <= Responsive.Vars.MobileWidth && !Responsive.Vars.IsMobile) {
        Responsive.Vars.IsMobile = true;
        $('html').addClass('isMobile');
        Responsive.Functions.HideMenu();
    }   // else
    //Responsive.Functions.ResizeDropDowns();
};  // Responsive.Functions.SetIsMobile()


/* 	===================================================================================================================================================
    (function) Responsive.Functions.showFeedback()
    =================================================================================================================================================== */

Responsive.Functions.showFeedback = function () {

    if ($('body').width() < 750 && $('#feedback-tab').size()) {
        $('#feedback-tab').css({ right: '-30px' });
        $('#feedback-tab #feedback-link').css({ display: '' });
        $('#feedback-tab #open-page-tab').css({ display: '' });
    } // if
    else if (typeof wasFeedbackClosed != 'undefined' && wasFeedbackClosed()) {
        $('#feedback-tab #feedback-link').hide();
        $('#feedback-tab #open-page-tab').show();
        $('#feedback-tab').css({ right: '-' + ($('#feedback-tab').width() + 2 - 40) + 'px' });
    } // else if

}; // Responsive.Functions.SetIsMobile()

/* 	===================================================================================================================================================
    (function) Responsive.Functions.showFeedback()
    =================================================================================================================================================== */

Responsive.Functions.SearchSubmit = function (e) {
    var content = $("#SearchTerms").val().toLowerCase(); //get the input value
    window.location.href = "/websearch/index.aspx?SearchTerms=" + content.replace(" ", "+");
} // ResponsiveSearchSubmit(e)
Responsive.Functions.SearchReset = function (e) {
    setTimeout(function () {
        $('#header-search .txt-search').removeClass('failed-validation').find('#SearchTerms').val('').siblings('label').removeClass('inputted');
    }, 300);
}

/* 	===================================================================================================================================================
	(function) Responsive.Functions.createPageMenu()
	
	=================================================================================================================================================== */

Responsive.Functions.createPageMenu = function () {
    var links = [],
		frag = document.createDocumentFragment(),
		icon = document.createElement('i'),
		pageMenu = document.createElement('div'),
		navMenu = document.createElement('ul'),
		a = document.createElement('a'),
		item,
		i = 0,
		newLink;

    if ($('#nav-myaccount').size() || $('#flow-navigation nav').size()) {

        links = $('#nav-myaccount a, #flow-navigation nav a:not(.link-current):not(.link-upcoming)').clone();
        navMenu.className = 'nav-menu';
        icon.className = 'icon-down-open-1 submenu-dropdown-icon mobile';
        pageMenu.id = 'page-menu';
        pageMenu.className = 'sub-menu mobile';

        for (i = 0; i < links.length; i++) {

            if ($('#nav-myaccount').size()) {
                if (window.location.href.toLowerCase().indexOf(links[i].href.toLowerCase()) == -1) {
                    item = document.createElement('li');
                    item.appendChild(links[i]);
                    navMenu.appendChild(item);
                }
            }
            else {
                if (window.location.href.toLowerCase().indexOf(links[links.length - i - 1].href.toLowerCase()) == -1) {
                    item = document.createElement('li');
                    newLink = links[links.length - i - 1];
                    $(newLink).prepend('&nbsp; - ');
                    item.appendChild(newLink);
                    navMenu.appendChild(item);
                }
            }

        }

        pageMenu.appendChild(navMenu);
        frag.appendChild(icon);
        frag.appendChild(pageMenu);


        a.setAttribute('class', 'dropDown-menu-link');
        $('.page-header').not('.no-menu').wrap(a).append(frag);

    }
};

/* 	===================================================================================================================================================
	(function) Responsive.Functions.createMobileQuoteInfo()
		
	=================================================================================================================================================== */

Responsive.Functions.createMobileQuoteInfo = function () {
    var links = [],
		frag = document.createDocumentFragment(),
		icon = document.createElement('i'),
		pageMenu = document.createElement('div'),
		navMenu = document.createElement('ul'),
		item,
		i = 0;

    if ($('#project-summary').size()) {
        $('#mobile-quote #mobile-quote-name').text($('#project-summary .project-name').text());
        $('#mobile-quote #mobile-quote-id').text($('#project-summary .id-label span').text());
        $('#mobile-quote-details-modal .avlModal-header').text($('#project-summary>h2').text());
        $('#mobile-quote-details-modal .avlModal-content').html($('#project-summary>.wrapper').html());
        $('#site-container').append($('#content-container aside .avlModal-container'));
    }
    if ($('.page-wrapper .page-buttons input.continue-button').size()) {
        $('#next-button-mobile').removeClass('disabled').click(function (e) {
            $('.page-buttons input.continue-button')[0].click();
            return false;
        });
    }
    else if ($('#artwork-designtemplate-page #save-button').size()) {
        $('#next-button-mobile').removeClass('disabled').click(function (e) {
            $('#artwork-designtemplate-page #save-button')[0].click();
            return false;
        });
    }
    if ($('.page-wrapper .page-buttons input.secondary-site-button').size()) {
        $('#previous-button-mobile').removeClass('disabled').click(function () {
            $('.page-buttons input.secondary-site-button')[0].click();
            return false;
        });
    }
};

/* 	===================================================================================================================================================
	(function) Responsive.Functions.hasCSS(styles)
	
	styles = obj - {'style': 'value'}

	If the style exists a class will be added to the html tag and the function will return it.
	
	eg: Responsive.Functions.hasCSS({'OverflowScrolling': 'touch'}) or Responsive.Functions.hasCSS({'OverflowScrolling': 'touch', 'width' : 0}) 
	=================================================================================================================================================== */

Responsive.Functions.hasCSS = function (styles) {
    var prefixes = ['webkit', 'moz', 'o', 'ms', ''],
		div = document.createElement('div'),
		overFlowCSS = null,
		computedStyle = null,
		hasIt = '',
		style = null,
		i = 0;

    for (style in styles) {
        document.getElementsByTagName('body')[0].appendChild(div);
        for (i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            div.style[prefix + style] = styles[style];
        }

        // Now check the properties
        computedStyle = window.getComputedStyle(div);

        for (i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            if (!!computedStyle[prefix + style]) {
                hasIt += prefix + style + ' ';
                $('html').removeClass(style).addClass(style);
                break;
            }
        }
    }

    // Cleanup old div elements
    div.parentNode.removeChild(div);
    return hasIt;
}


/* 	===================================================================================================================================================
	Responsive.Functions.CheckForOverflowScrolling()
	=================================================================================================================================================== */

Responsive.Functions.CheckForOverflowScrolling = function () {
    return Responsive.Functions.hasCSS({ 'OverflowScrolling': 'touch' });
};



window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();


Responsive.Functions.AnimLoop = function () {
    requestAnimFrame(Responsive.Functions.AnimLoop);
    Responsive.Functions.ScrollAnimation();
};


Responsive.Functions.ScrollAnimation = function () {
    var newScrollTop = $(window).scrollTop();

    Responsive.Vars.ScrollTop = newScrollTop;
};




/* 	===================================================================================================================================================
	Responsive.Functions.BindIsKeyboard()
	=================================================================================================================================================== */

Responsive.Functions.BindIsKeyboard = function () {
    $('input').on('focus blur', function () {
        $(window).scrollTop(10);
        var keyboard_shown = $(window).scrollTop() > 0;
        $(window).scrollTop(0);

        Responsive.Vars.isKeyboard = keyboard_shown;
    });
};
Responsive.Functions.BindPageLoad = function () {
    FastClick.attach(document.body);
    //Run Initial Functions
    Responsive.Functions.nonAsyncBinding();
    Responsive.Functions.CheckForFontface();
    Responsive.Functions.CheckForOverflowScrolling();
    Responsive.Functions.SetIsMobile();
    Responsive.Functions.ResizeDropDowns();
    Responsive.Functions.AnimLoop();
    Responsive.Functions.InitHeaderSearchInput();

}; //BindPageLoad

Responsive.Functions.InitHeaderSearchInput = function () {
    //main-search
    $("#header-search .search-button").bind("click", Responsive.Functions.HeaderCheckSearch);  // click
    $("#header-search .new-search-button").bind("click", Responsive.Functions.HeaderCheckSearch);  // click
    $("#SearchTerms").unbind("keypress").bind("keypress", blockReturn);
    $("#SearchTerms").unbind("keydown").bind("keydown", blockReturn);
    $("#SearchTerms").val(HeaderSearchMessage);
    $("#SearchTerms").focusin(focusSearch).focusout(unfocusSearch);//focusin & focusout
}; //InitHeaderSearchInput

var HeaderSearchMessage = "Blank CDs, Burners, Get on iTunes, etc.",
    HeaderInvalidMessage = "Enter a Valid Search";

Responsive.Functions.HeaderCheckSearch = function () {
    var alphanumeric = new RegExp("^\s*[a-z0-9]+\s*[a-z0-9]*\s*[a-z0-9]*", "i") //valid reg expression
    content = $("#SearchTerms").val().toLowerCase(); //get the input value

    //If there are any values we don't want
    if (content == HeaderSearchMessage.toLowerCase() ||
        content == HeaderInvalidMessage.toLowerCase() ||
        alphanumeric.test(content) == false ||
        content == "search") { //check validity
        $("#SearchTerms").val(HeaderInvalidMessage);
        $("#SearchTerms").removeClass('user-input');
        $("#SearchTerms").blur();
        return false;
    } //if
    else {
        window.location.href = "/websearch/index.aspx?SearchTerms=" + content.replace(" ", "+");
    }
}; //HeaderCheckSearch

Responsive.Functions.ToggleLoginButton = function () {
    if (Responsive.Vars.IsLoggedIn) {
        $("#login-link").find("span").text("LOGOUT");
        $("#login-link").find("i").removeClass("icon-enter").addClass("icon-exit");
        $("#login-link").attr("href", "/MyAccount/logout.aspx");
    } else {
        $("#login-link").find("span").text("LOGIN");
        $("#login-link").find("i").removeClass("icon-exit").addClass("icon-enter");
        $("#login-link").attr("href", "/MyAccount/login.aspx");
    }
};

function blockReturn(event) {
    if (event.keyCode == 13) {
        event.stopPropagation();
        event.preventDefault();
        $('#SearchButton').click();
        return false;
    }
}// blockReturn(event) 

function unfocusSearch() {
    //if there is no value
    if ($(this).val() == "") {
        $(this).removeClass('user-input');
        $(this).val(HeaderSearchMessage);
    }//if
} //unfocusSearch

function focusSearch() {
    var alphanumeric = new RegExp("^\s*[a-z0-9]+\s*[a-z0-9]*\s*[a-z0-9]*", "i"), //valid reg expression
        content = $("#SearchTerms").val().toLowerCase(); //get the input value
    //If there are any of the default or error values
    if (content == HeaderSearchMessage.toLowerCase() || content == HeaderInvalidMessage.toLowerCase() || alphanumeric.test(content) == false || content == "search") {//check validity
        $(this).val("");
        $(this).addClass('user-input');//#333 no-italic font 
    }//if
} //focusSearch

/* 	===================================================================================================================================================
	Page Load Binding
	=================================================================================================================================================== */

$(document).ready(Responsive.Functions.BindPageLoad);// $(document).ready
