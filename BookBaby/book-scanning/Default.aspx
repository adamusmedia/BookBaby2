<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb"  MasterPageFile="../MasterPage.master" Inherits="BookScanning_Default" %>

<asp:Content runat="server" ContentPlaceHolderID="pageContent">

<div class="container-fluid bg-img bg-book-scanning">
    <div class="container">
        <div class="row">
            <section class="jumbotron light">
                <div class="col-xs-8 col-sm-9 col-md-8 col-lg-8 text-left">
                    <h1 class="title pt-35">Book Scanning Services <small class="subhead">Transfer any paper book to a clear, searchable PDF and editable Word document.</small></h1>
                </div>
            </section>
        </div>
    </div>
</div>


<div class="container-fluid section-padding-default">
    <div class="container">
        <div id="book-scanning" class="row text-left">
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


            <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8 mb-20">

                <h2>Bound Book Scanning</h2>
                <p>We talk to a lot of authors who want to publish an eBook, but only have a printed version of their book. They need a way to get the necessary electronic files, such as a .pdf or .doc, to get started.</p>
                <p>Here's the solution to their problem: <a href="http://www.boundbookscanning.com/" target="_blank" title="Bound Book Scanning">Bound Book Scanning</a>, a mail-in book scan service. They offer affordable methods of transferring any paper book to a clear, searchable PDF and editable Word doc. Bound Book Scanning uses professional-grade equipment, careful handling, and customized processing to ensure top quality results. There's no minimum order and they offer fast turnaround times.</p>
                <h2>Fast and Affordable</h2>
                <p>You can get an instant quote for your scanning project at the Bound Book Scanning website. Each book is just $13.95 plus $.06 per page. For the average 200 page book, that's just $25.95. Once you mail in your materials, they'll digitize your book and send you your files in just 1-2 days.</p>

            </div>

            <div class="col-xs-10 col-xs-offset-1 col-xs-mt-20 col-sm-4 col-md-4 col-lg-3 side-special-offer text-center-mobile"> <!--  col-sm-offset-1 col-md-offset-1 col-lg-offset-1 -->
                <img class="abs-top-right" src="/images/ebook-scanning-special-offer.png">
                <h3 class="title-bold pb-20">SAVE 10% on your order</h3>
                <p class="pb-20"><a href="http://www.boundbookscanning.com/">Bound Book Scanning</a> is a BookBaby partner! Use the code BOOKBABYD10 at checkout!</p><a href="http://www.boundbookscanning.com/" target="_blank"><img alt="Bound Book Scanning" class="img-responsive center-block mb-20" src="/Images/book-scanning-logo.gif" title="Bound Book Scanning"></a>
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
