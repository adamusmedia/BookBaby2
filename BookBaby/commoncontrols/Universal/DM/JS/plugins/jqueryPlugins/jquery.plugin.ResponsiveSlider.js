; (function ($, window, document, undefined) {
	//====================================================================================================
	//	Adds a cssAnimate function to jquery
	//		-	Works the same as the jquery.animate function and recieves the same parameters
	//		-	The parameters aside from transforms(the styles and values to be animated ) are optional
	//		-	Fallback to jquery.animate if css transitions are not supported
	//
	//====================================================================================================

    jQuery.fn.startSlider = function (files, automatic, time, slideDirection) {
    	
        if (typeof automatic != 'booleen') {
            slideDirection = time;
            time = automatic;
            automatic = true;
        }

		//Adjust for optional inputs
    	if (typeof time != 'number') {
    	    slideDirection = time;
    		time = 400;
    	}
    	if (typeof slideDirection != 'string') {
    	    slideDirection = 'left';
    	}

		//return this for jquery chaining
    	return this.each(function () {
    	    var $container = $(this),
    	        l = typeof files == object ? files.length: 0,
                n;
    	    if(l){
    	        for (n = 1; n < 4; n++) {
    	            $container.append('<div id="n" class="slide" style="background-image:' + files[(l + n - 2) % l] + ';" ></div>');
    	        }


                $container.addClass('responsive-slider-active');
    	    }
    	    else{
    	        $container.addClass('responsive-slider-failed');
    	    }
    	});
    };
    jQuery.fn.cssAnimate.hasTransitions = false;

	//Test for css transitions
	//Use Modernizr if available
    if (typeof Modernizr != 'undefined' && typeof Modernizr.csstransitions != 'undefined') {
    	jQuery.fn.cssAnimate.hasTransitions = Modernizr.csstransitions;
    }
    	//Else test the style for transitions
    else {

    	var s = document.createElement('p').style;

    	jQuery.fn.cssAnimate.hasTransitions = 'transition' in s ||
					  'WebkitTransition' in s ||
					  'MozTransition' in s ||
					  'msTransition' in s ||
					  'OTransition' in s;
    }

})(jQuery, window, document);
