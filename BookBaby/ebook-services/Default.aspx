<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb"  MasterPageFile="../MasterPage.master" Inherits="EBookServices_Default" %>

<asp:Content runat="server" ContentPlaceHolderID="pageContent">



<div class="container-fluid bg-img bg-ebooks">
    <div class="container">
        <div class="row">
            <section class="jumbotron light mb-0">
                <h1 class="title pt-35">Everything you need to create, promote, and sell eBooks</h1>
                <h2 class="subtitle">You could write a book on all the things we do to help authors self-publish eBooks</h2>
                <a href="/quoter/confighandler.aspx?webpreconfigid=WPC0000038" class="btn btn-center btn-orange btn-lg" role="button" onclick="_gaq.push(['_trackEvent', 'ebooks', 'Click', 'hero-button-GetStarted'])">Get started</a>
                <p class="link"><a class="link-white" href="http://www.bookbaby.com/ebook-services">Learn more</a></p>
            </section>
        </div>
    </div>
</div>




<div class="container-fluid">
    <div class="row">
        <section class="container pt-35">


            
            <div id="fb-root"></div>
            <script>
	            $('#like').html('');
	            (function (d, s, id) {
	            var js, fjs = d.getElementsByTagName(s)[0];
	            if (d.getElementById(id)) return;
	            js = d.createElement(s); js.id = id;
	            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	            fjs.parentNode.insertBefore(js, fjs);
	            }(document, 'script', 'facebook-jssdk'));
	            $(window).load(function () {
		            if (typeof FB !== 'undefined') {
			            $("#like").html('<fb:like href="http://bookbaby.com' + window.location.pathname + '" layout="button_count" show_faces="false" width="65" action="like" font="segoe ui" colorscheme="light" />');
			            FB.XFBML.parse(document.getElementById('like'));
		            }
	            });
            </script>

            <!-- Markup -->
            <div id="privacy-social-icons" class="col-xs-12 text-left">
	            <span id="like">
		            <fb:like href="http://bookbaby.com" layout="button_count" show_faces="false" width="65" action="like" font="segoe ui" colorscheme="light" />		
	            </span>
	            <a href="https://twitter.com/share" class="twitter-share-button" data-via="bookbaby">Tweet</a>
	            <script>!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + '://platform.twitter.com/widgets.js'; fjs.parentNode.insertBefore(js, fjs); } }(document, 'script', 'twitter-wjs');</script>

	            <!-- Place this tag where you want the +1 button to render. -->
	            <div class="g-plusone" data-size="medium"></div>

	            <!-- Place this tag after the last +1 button tag. -->
	            <script type="text/javascript">
		            (function () {
			            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
			            po.src = 'https://apis.google.com/js/plusone.js';
			            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
		            })();
	            </script>
                <div style="clear:both;"></div>
            </div><!-- social icons -->









        </section>
    </div>
</div>



    
    
    
    
<div class="container-fluid bg-cream">
    <div class="container">

             
 
            
    </div>
</div>



<div class="container-fluid bg-dk-blue section-padding-default">
    <div class="container">
        <div class="row">
           <h2 class="white">Now's the time to make your book.</h2>
           <a href="/quoter/confighandler.aspx?webpreconfigid=WPC0000038" class="btn btn-center btn-orange btn-lg" role="button">Get started</a>
        </div>
    </div>
</div>



<div class="container-fluid bg-lt-blue-testimonial section-padding-default">
    <div class="container">
        <div class="row">
           <h2 class="white">Now's the time to make your book.</h2>
           <a href="/quoter/confighandler.aspx?webpreconfigid=WPC0000038" class="btn btn-center btn-orange btn-lg" role="button">Get started</a>
        </div>
    </div>
</div>





<!--
<div class="container-fluid">
    <div class="container">
        <div class="row">
            <br />
        </div>
    </div>
</div>
-->


</asp:Content>
