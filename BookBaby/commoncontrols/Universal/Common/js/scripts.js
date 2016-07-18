
/* TOC

    (VARIABLE) ie
	(BINDING)  Document : ready
	(FUNCTION) InitSessionTimeout()
	(FUNCTION) InitFocusElements()
	(FUNCTION) InitSessionExpiredModalLink()
    (FUNCTION) InitSubscriptionLink()
	(FUNCTION) CheckForCookies()
	(FUNCTION) MegaDropDown()
    Footer Email Signup Functions
*/

//  ====================================================================================================
//  (VARIABLE) ie
//  ====================================================================================================

// use as such for Internet Explorer detection:
// if (ie == 7) {}
// if (ie > 8) {}

var ie = (function () {

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());

//  ====================================================================================================
//  (BINDING) Document : ready
//  ====================================================================================================

	// After document load...
$(document).ready(function () {
    // if there are no update panels on the current page, set the session warning and expiration timeouts if there is session
    InitSessionTimeout();
    // give focus to any elements containing the focus class
    InitFocusElements();
    // set the "pageTo" value for the myaccount login link in the session expired modal window
    InitSessionExpiredModalLink();
    // bind the footer's subscription link
    InitSubscriptionLink();
    // check for cookies...
    CheckForCookies();
    MegaDropDown();
    setUpEmailSignupWidth();
});     // ready() 

//  ====================================================================================================
//  (FUNCTION) InitSessionTimeout()
//  ====================================================================================================

	// if there are no update panels on the current page, set the session warning and expiration timeouts if there is session
	function InitSessionTimeout() {
		// determine if there are update panels on the page, if so do not set any session timeouts because they would have been set in the pageLoaded function from the scripts-updatepanels.js file
		if (typeof sessExists === undefined && $(".session-error").size() == 0) {
			// initialize the session timeout handler to start with a refresh timer only is there is a valid session
			// this logic normally executes from the scripts-updatepanels.js file in the pageLoaded function, but if there are no update panels on the current page, it will execute from here 
			if (sessTimeoutExpire > 0 && jsTimeoutNotify == null && jsTimeoutExpire == null) {
				jsTimeoutNotify = setTimeout("TimeoutNotification()", sessTimeoutExpire - 300000);
				jsTimeoutExpire = setTimeout("TimeoutExpiration()", sessTimeoutExpire);
				if (typeof sessTimeoutExtend != "undefined" && sessTimeoutExtend > 0) {
			        jsTimeoutExtend = setTimeout(function() { sessTimeoutExtend = 0; }, sessTimeoutExtend);
			    }
			}   // if
		}   // if
	}   // InitSessionTimeout()

//  ====================================================================================================
//  (FUNCTION) InitFocusElements()
//  ====================================================================================================

	// give focus to any elements containing the focus class
function InitFocusElements() {
    setTimeout(function() {
        $(".give-focus").focus();
    }, 0);
}   // InitFocusElements()


//  ====================================================================================================
//  (FUNCTION) InitSubscriptionLink()
//  ====================================================================================================

	// bind the click event for the subscription link in the footer
	function InitSubscriptionLink() {
	    $("#footer-subscribe-button").bind("click", function () {
	        var destination = "/EmailSubscriptionManager/SubscriptionManager.aspx?email=" + $("#email").val();
	        $(this).attr("href", destination);
	        return true;
	    });
	}   // InitSubscriptionLink()



//  ====================================================================================================
//  (FUNCTION) CheckForCookies()
//  ====================================================================================================

	// check to make sure cookies are enabled...
	function CheckForCookies() {
	    if (are_cookies_enabled()) {
	        $("#no-cookies").css("display", "none");
	        $("#main-content").removeClass("no-cookies-content");
	    } else {
	        $("#no-cookies").css("display", "block");
	        $("#main-content").addClass("no-cookies-content");
		}
	}   // CheckForCookies()

	function are_cookies_enabled() {
	    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
	    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
	        document.cookie = "testcookie";
	        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	    }   // if
	    return (cookieEnabled);
	}   // are_cookies_enabled


//  ====================================================================================================
//  (FUNCTION) MegaDropDown()
//  ====================================================================================================
	
	//Show and hide MegaDropDown Menu
	function MegaDropDown(){
	    var userAgent = navigator.userAgent,
			 IsMobileAgent = false,
             leftPos = 0,
			 browser = new RegExp("android|avantgo|bada\\/|iPhone|mobile|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|symbian|treo|up\\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino", "ig"),
			 vers = new RegExp("1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|e\\-|e\\/|\\-[a-w])|libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|sk\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\\-|2|g)|yas\\-|your|zeto|zte\\-", "ig"),
             ddWidth = 0,
             contentWidth = 980;

        //Test if it is Mobile
		 if (browser.test(userAgent) == true || (userAgent != null && userAgent.length > 3 && vers.test(userAgent.substring(0, 5)))) {
            //If mobile set live.click on main nav to show and hide mega dropdowns.
		     $('#nav-site>ul>li').live('click', function () {
		         $('.mega-ddm').hide();
		         if ($(this).hasClass('mobile-select')) { //Class that hilights nav item when dropdown is shown
		             $('.mobile-select').removeClass('mobile-select');
		         }
		         else {
		             $('.mobile-select').removeClass('mobile-select');
		             leftPos = $(this).position().left;
		             if (leftPos > 400) {
		                 $(this).find('.mega-ddm').css('right', 0);
		             } else {
		                 $(this).find('.mega-ddm').css('left', leftPos);
		             }
		             $(this).find('.mega-ddm').show();
		             $(this).addClass('mobile-select');
		         }
		         return false;

		     });
		 }
         //If it is not mobile use hover to show/hide mega dropdown
		 else {
		     $('#nav-site>ul>li').mouseenter(function () {
		         leftPos = $(this).position().left;
		         //ddWidth = $(this).find('.mega-ddm').outerWidth();
		         if (leftPos > 400) { // 980 - ddWidth) {
		             $(this).find('.mega-ddm').css('right', 0);
		         } else {
		             $(this).find('.mega-ddm').css('left', leftPos);
		         }
		         $(this).find('.mega-ddm').show();
		     });
			 $('#nav-site>ul>li').mouseleave(function () {
				 $(this).find('.mega-ddm').hide();
			 });
		 }
	} //MegaDropDown()

/*  ====================================================================
        Footer Email Signup Functions
    =================================================================== */

	function setUpEmailSignupWidth() {
	    $('#txtEmailMask').width($(window).width() - 33);
	    $(window).on('resize', function (e) {
	        $('#txtEmailMask').width($(window).width() - 33);
	    });
	}

    function signupBBP(e){
        var button=this;
        this.form.action='https://www.pages04.net/discmakers-cdbaby/Web_Leads_Masterlist/Footer?Source=BBPFOOTER&initialsource=BBPFOOTER&vs=NGRkZGEwMDYtYjFmZi00YTE3LWE3MGUtYzIyY2UyNGRiMmMxOzsS1'; 
        button.onclick = null;
        setTimeout(function () { button.click() }); 
    }  