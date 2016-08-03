<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb"  MasterPageFile="../MasterPage.master" Inherits="FPG_Default" %>

<asp:Content runat="server" ContentPlaceHolderID="pageContent">

<div class="container-fluid bg-img bg-free-publishing-guides">
    <div class="container">
        <div class="row">
            <section class="jumbotron light text-left">
                <h1 class="title pt-35">Free Guides For Authors <small class="subhead">Learn how to write, promote, and sell more books with these free guides.</small></h1>
            </section>
        </div>
    </div>
</div>




<div class="container-fluid section-padding-default bg-lt-grey">
    <div class="container">
        <div id="free-publishing-guides" class="row text-left">
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




            
            <div class="col-xs-12">
    		    <h2 class="intro">Bestselling authors and industry pros offer tips on how to make it as a DIY author in today's book marketplace. All these guides are free and easily downloadable as PDF files.</h2>
            </div>


					
            

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-20">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="col-xs-12 col-sm-4 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guide-seven-step-guide-authorpreneurship.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 mb-20">
                <div class="col-sm-12 col-lg-12">
                    <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="Marketing your book on Amazon"><img src="../images/free-guides/free-guides-bundle.png" alt="The path to self-publishing success only takes 7 steps" title="The path to self-publishing success only takes 7 steps" class="img-responsive center-block" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-7 col-lg-8 text-center-mobile">
                        <h3><em>NEW!</em> The Seven Step Guide to Authorpreneurship</h3>
					    <p>The path to self-publishing success only takes 7 steps.
                        <a href="/free-guide/seven-step-guide-to-authorpreneurship" title="The path to self-publishing success only takes 7 steps">Download</a></p>
                    </div>
                </div>
            </div>





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
