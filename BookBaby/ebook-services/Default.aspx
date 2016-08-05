<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb"  MasterPageFile="../MasterPage.master" Inherits="EBookServices_Default" %>

<asp:Content runat="server" ContentPlaceHolderID="pageContent">



<div class="container-fluid bg-lt-blue-2 plr-0">
    <div class="container plr-0">
        <section class="jumbotron mb-0">

			<div class="col-xs-12 col-sm-7 col-md-7 col-lg-6 text-left text-center-mobile">
				<p class="h1-leadin">eBOOK PUBLISHING &amp; CONVERSION</p>
				<h1 class="alt">The complete eBook self-publishing package</h1>
				<h2 class="alt">Everything you need: eBook conversion, promotion & distribution for just $149</h2>
				
                <a href="/quoter/confighandler.aspx?webpreconfigid=WPC0000038" class="btn btn-orange btn-lg" onclick="_gaq.push(['_trackEvent', 'ebook-publishing', 'Click', 'button-GetPublishedNow-top']);">Get started</a>

			</div>
			<div class="hidden-xs col-sm-5 col-md-5 col-lg-6">
				<img class="img-responsive" src="/images/package-free-hero-newlowprice.png" width="500" height="391" />
			</div>

        </section>
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


            <h2 class="title-big-bold">Keep 100% of your net sales with the easiest, most robust eBook publishing package available</h2>
            <p class="larger mt-20 mb-20"><strong>Package includes:</strong></p>
            
            
              <table class="table col-2">
                  <thead>
                      <tr>
                          <td class="thead" colspan="2"><h3>PUBLISHING</h3></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td class="col-2-title"><span>eBook File conversion</span></td>
                          <td class="col-2-copy"><span>Conversion professionals will convert your Word, PDF or other popular digital document to produce the highest quality files for viewing on every eReader, tablet and smartphone.</span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>Graphics conversion</span></td>
                          <td class="col-2-copy"><span>Conversion of graphic elements: charts, graphs, tables, drawings, photographs and more. Add $2 per graphic plus base conversion charge.</span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>eBook Proof</span></td>
                          <td class="col-2-copy"><span>We’ll send you an ePub file for your review in 6 to 8 business days.<br /> (NOTE: This is NOT a galley proof for editing. Any non-formatting file corrections at this stage will incur charges.) </span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>QC check</span></td>
                          <td class="col-2-copy"><span>Every file is checked and re-checked by our digital publishing experts to ensure your eBook works perfectly on every eReader.</span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>Free customer service support </span></td>
                          <td class="col-2-copy"><span>Give our experts a call with all your publishing questions at 1-877-961-6878 (Monday - Friday, 9am to 5pm EDT)</span></td>
                      </tr>
                  </tbody>
              </table>

            
              <table class="table col-2">
                  <thead>
                      <tr>
                          <td class="thead" colspan="2"><h3>PROMOTION</h3></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td class="col-2-title"><span>Discoverability</span></td>
                          <td class="col-2-copy"><span>Get premium listings on Goodreads, Noisetrade, BookDaily, and Bublish — free!</span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>Guaranteed FREE reviews</span></td>
                          <td class="col-2-copy"><span>From Reader’s Favorite, Story Cartel, and more. <a href="/bookpromo">Learn more about BookPromo™</span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span><span class="orange">NEW!</span> Free Metadata Updates</span></td>
                          <td class="col-2-copy"><span>It’s how you optimize and fine tune your eBook sales efforts! Change your pricing, author bio, book description and more for no charge.</span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span><span class="orange">NEW!</span> Keyword Guide</span></td>
                          <td class="col-2-copy"><span>A BookBaby exclusive. A step-by-step guide to choosing the best Amazon search keywords.</span></td>
                      </tr>
                  </tbody>
              </table>

            
              <table class="table col-2">
                  <thead>
                      <tr>
                          <td class="thead" colspan="2"><h3>SELLING</h3></td>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td class="col-2-title"><span>Global Distribution</span></td>
                          <td class="col-2-copy"><span>We will distribute your eBook to a self-publishing industry best 60+ stores in 170 countries, including Amazon, B&N, and iBooks. <a href="/ebook-distribution">See our complete list</a></span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>BookShop™</span></td>
                          <td class="col-2-copy"><span>A sales page for your book, BookShop™ lets you sell direct to your readers and earn more for each sale. <a href="/bookshop">Learn more</a></span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>You keep 100%</span></td>
                          <td class="col-2-copy"><span>You keep 100% of your net sales from our online retail partners. BookBaby takes no commission! </span></td>
                      </tr>
                      <tr>
                          <td class="col-2-title"><span>Get paid weekly</span></td>
                          <td class="col-2-copy"><span>You set your pay point and as soon as your account balance hits that point we’ll pay you the following Monday.</span></td>
                      </tr>
                  </tbody>
              </table>


            <div class="col-xs-12 mtb-50">
                <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8 text-left text-center-mobile">
					<h2 class="title-bold">Need Fixed Layout?</h2>
					<p class="subhead">Fixed layout formatting for iBooks, add $199 </p>
					<p>Perfect for children’s books, graphic novels, and cookbooks, fixed layout is needed when it’s important that the images and text appear in a specific and consistent way. <a href="/fixed-layout-ebooks">Learn more.</a></p>
                </div>
                <div class="col-xs-12 col-sm-3 col-md-4 col-lg-4">
                	<img src="/images/ebook-publishing-fixed.png" class="img-responsive center-block mmt-20" />
                </div>
            </div>


            <div class="article-divider clearfix mp-0"></div>


            <div class="col-xs-12 mtb-50">
                <div class="col-xs-12 col-sm-9 col-md-8 col-lg-8 text-left text-center-mobile">
					<h2 class="title-bold">ISBN</h2>
					<p class="subhead">Add a unique ISBN for $29</p>
					<p>An ISBN is a unique identifier for your book, providing publishing information and giving retailers a way to report your book’s sales. Bookstores simply cannot sell your book unless you’ve got one. Important: You will need a separate ISBN for your printed books if you are planning on selling them in stores. Simply add an ISBN when checking out.</p>
                </div>
                <div class="col-xs-12 col-sm-3 col-md-4 col-lg-4">
                	<img src="/images/ebook-publishing-isbn.png" class="img-responsive center-block mmt-20" />
                </div>
            </div>






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
           <img src="/Images/quote-icon.png" width="73" height="57" class="img-responsive center-block">
           <p class="testimonial">“The people working on converting the eBooks truly care about the quality of the finished product. The support staff answered all my questions and helped me navigate this fast-changing eBook landscape.”
               <span><strong>— Don Trowden</strong>, Normal Family</span>
           </p>
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
