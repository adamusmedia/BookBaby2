		    </section>
            
            <!--#include virtual = "/commoncontrols/universal/dm/footer/responsive/footer.htm"-->
            
        </div><!-- #site-container -->
       <input type="hidden" id="avlBrand" value="0" />


<script src="/CommonControls/Universal/Common/JS/libs/underscore.js"></script>
<script src="/CommonControls/Universal/Common/JS/libs/xdate.js"></script>
<script src="/CommonControls/ResponsiveForms/js/jquery-ui-1.10.3.custom.min.js"></script>
<script src="/CommonControls/Universal/Common/JS/libs/jquery.ui.touch-punch.min.js"></script>
<script src="/CommonControls/Universal/Common/js/libs/jquery.easing.1.3.js"></script>
<script src="/CommonControls/Universal/Common/js/libs/jquery.scrollTo-min.js"></script>
<script src="/CommonControls/Universal/Common/js/libs/jquery.flash.js"></script>
<script src="/CommonControls/Universal/Common/js/plugins/jqueryPlugins/jquery.plugin.cssAnimate.js"></script>
<script src="/CommonControls/Universal/Common/js/plugins/avlmodal/jquery.avlmodal.js"></script>
<script src="/CommonControls/Universal/Common/JS/Plugins/CanvasLoader/canvasloader-min.js"></script>
<script src="/CommonControls/Universal/dm/js/scripts-dmresponsive.js"></script>
<script src="/CommonControls/Universal/Common/js/libs/fastclick.js"></script>
<script src="/CommonControls/Universal/Common/js/libs/jquery.hammer.js"></script>
<script src="/CommonControls/Feedback/JS/FeedbackScripts.js"></script>
<script src="/CommonControls/ResponsiveForms/js/jquery.customSelect.min.js"></script>
<script src="/CommonControls/ResponsiveForms/js/json2.js"></script>
<script src="/CommonControls/ResponsiveForms/js/validation.js"></script>
<script src="/CommonControls/ResponsiveForms/js/scripts.js"></script>
<script src="/CommonControls/Universal/Common/js/scripts-preload.js"></script>
<!--<script src="/CommonControls/Universal/Common/JS/scripts-livechat.js"></script>-->
<script src="/CommonControls/Universal/Common/JS/plugins/lazySlider/jquery.lazySlider.js"></script>


<script type="text/javascript">
	Responsive.Vars.IsLoggedIn = "<%=Request.Cookies("LOGIN")%>"=="true";
	$(document).ready(function () {
		$('.lazySliderContainer').reallyLazySlider();
		Responsive.Functions.ToggleLoginButton();
	});
</script>