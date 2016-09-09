<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="MasterPage.master" CodeFile="Default.aspx.cs" Inherits="Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">

    <div class="container-fluid bg-img bg-book-trim">
        <div class="container">
            <div class="row">
                <section class="jumbotron light">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <h1 class="title pt-35 mb-0">Standard Book Sizes and Book Printing Options</h1>
                        <h2 class="subtitle mt-0">Choose the cover, book binding style, and custom trim size that works best for your printed book.</h2>
                        <a href="/quoter/default.aspx" class="btn btn-orange btn-center btn-lg mb-30" role="button">Make your book</a>
                    </div>
                </section>
            </div>

        </div>
    </div>


    <div class="container-fluid bg-img bg-brown-texture ptb-40">
        <div class="container">
            <h3 class="title-bold white">What's your style? What's your genre?</h3>
            <p class="lead white">There's nothing like seeing your work in print for the very first time. We’ve got you covered with a large and robust selection of affordable book printing options. Review the choices below to decide what your next masterpiece will look like and create your unique book today.</p>
        </div>
    </div>


    <div class="container-fluid bg-lt-grey ptb-40">
        <div class="container">
            <h2 class="title-bold">Book Cover styles</h2>
            <p class="">BookBaby offers both hardcover and softcover book options. There is a 24-page count minimum for our hard case bindings. Hardcover books can also be covered with a dust jacket, a removable paper cover used to protect a book from dirt or damage.</p>
            <div class="clearfix mb-30"></div>

            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-center">
                <img src="../Images/book-printing-soft-cover.jpg" width="300" height="185" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10">
                <p class="mb-0">Soft cover</p>
                <p><a href="#">more info</a></p>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-center">
                <img src="../Images/book-printing-hard-cover.jpg" width="300" height="185" alt="Hard cover book" title="Hard cover book" class="img-responsive center-block mb-10">
                <p class="mb-0">Soft cover</p>
                <p><a href="#">more info</a></p>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-center">
                <img src="../Images/book-printing-hard-cover-with-jacket.jpg" width="300" height="185" alt="Hard cover book with jacket" title="Hard cover book with jacket" class="img-responsive center-block mb-10">
                <p class="mb-0">Soft cover</p>
                <p><a href="#">more info</a></p>
            </div>
            
            <div class="article-divider clearfix"></div>
            
            <h2 class="title-bold">Standard Trim Sizes</h2>
            <p class="">Deciding which trim size will best suit your book can be confusing, especially given all the industry-standard but completely unhelpful trim size names, like "US Trade" and "Digest." We've put together our genre recommendations, based on industry standards, to help you choose a trim size that makes it clear to the reader what they're buying. Here are our most popular standard book sizes.</p>
            
            <div class="article-divider clearfix"></div>



        	<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
       	     <img src="../Images/book-printing-pocket-book.jpg" width="214" height="207" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">4.25" X 6.87"</p>
              <p class="book-item-title">Pocket book</p>
              <span>more info</span>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
       	    	<img src="../Images/book-printing-digest.jpg" width="214" height="207" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">5.5" X 8.5"</p>
              <p class="book-item-title">Digest</p>
              <span>more info</span>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
             <img src="../Images/book-printing-us-trade.jpg" width="214" height="207" alt="Hard cover book" title="Hard cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">6" X 9"</p>
              <p class="book-item-title">US trade</p>
            <span>more info</span>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
             <img src="../Images/book-printing-small-square.jpg" width="214" height="207" alt="Hard cover book with jacket" title="Hard cover book with jacket" class="img-responsive center-block mb-10" />
            <p class="book-item-size">7.5" X 7.5"</p>
              <p class="book-item-title">Small square</p>
             <span>more info</span>
            </div>
            
            
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
       	    <img src="../Images/book-printing-square.jpg" width="214" height="234" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">8.5" X 8.5"</p>
              <p class="book-item-title">Square</p>
             <span>more info</span>
          </div>
           
           <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
       	    <img src="../Images/book-printing-square.jpg" width="214" height="234" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">10" X 10"</p>
              <p class="book-item-title">Large Square</p>
             <span>more info</span>
          </div>
           
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
       	    <img src="../Images/book-printing-landscape.jpg" width="214" height="234" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">9" X 7"</p>
              <p class="book-item-title">Landscape</p>
            <span>more info</span>
          </div>
          
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
       	    <img src="../Images/book-printing-landscapelarge.jpg" width="214" height="234" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">11" x 8.5"</p>
              <p class="book-item-title">Landscape</p>
            <span>more info</span>
          </div>
            
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
       	    <img src="../Images/book-printing-landscapelarge.jpg" width="214" height="234" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">12" x 9"</p>
              <p class="book-item-title">Landscape</p>
            <span>more info</span>
          </div>
          
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
           <img src="../Images/book-printing-comic-book.jpg" width="214" height="234" alt="Hard cover book" title="Hard cover book" class="img-responsive center-block mb-10" />
              <p class="book-item-size">6.625" X 10.25"</p>
              <p class="book-item-title">Comic book</p>
              <span>more info</span>
          </div>
          
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
             <img src="../Images/book-printing-us-letter.jpg" width="214" height="234" alt="Hard cover book with jacket" title="Hard cover book with jacket" class="img-responsive center-block mb-10" />
            <p class="book-item-size">8.5" X 11"</p>
              <p class="book-item-title">US letter</p>
             <span>more info</span>
          </div>
          
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
             <img src="../Images/book-printing-us-letter.jpg" width="214" height="234" alt="Hard cover book with jacket" title="Hard cover book with jacket" class="img-responsive center-block mb-10" />
            <p class="book-item-size">8" X 10"</p>
              <p class="book-item-title">Portrait</p>
             <span>more info</span>
          </div>
          
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 book-item">
             <img src="../Images/book-printing-us-letter.jpg" width="214" height="234" alt="Hard cover book with jacket" title="Hard cover book with jacket" class="img-responsive center-block mb-10" />
            <p class="book-item-size">9" X 12"</p>
              <p class="book-item-title">Large Portrait</p>
             <span>more info</span>
          </div>

            
            <div class="article-divider clearfix"></div>
            
            
            <h2 class="title-bold">Custom Book Binding Options</h2>
            <p class="mb-30">Whether you want a flexible perfect bound paperback, a spiral bound cookbook, or a saddle-stitched wedding program, we offer many custom book binding options to give your book the look and feel you want. Not sure which binding style is right for your book? Each style is explained in detail below.</p>


            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 book-item">
                <img src="../Images/book-printing-perfect-binding.jpg" width="130" height="110" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Perfect binding</p>
                <span>more info</span>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 book-item">
                <img src="../Images/book-printing-saddle-stitched.jpg" width="130" height="110" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Saddle stitching</p>
                <span>more info</span>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 book-item">
                <img src="../Images/book-printing-black-spiral.jpg" width="130" height="110" alt="Hard cover book" title="Hard cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Black spiral</p>
                <span>more info</span>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 book-item">
                <img src="../Images/book-printing-black-comb.jpg" width="130" height="110" alt="Hard cover book with jacket" title="Hard cover book with jacket" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Black comb</p>
                <span>more info</span>
            </div>


            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 book-item">
                <img src="../Images/book-printing-adhesive-case.jpg" width="130" height="110" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Adhesive case wrap</p>
                <span>more info</span>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2 book-item">
                <img src="../Images/book-printing-adhesive-case-jacket.jpg" width="130" height="110" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Adhesive case wrap and Dust jacket</p>
                <span>more info</span>
            </div>

            
            <div class="article-divider clearfix"></div>
            
            
            <h2 class="title-bold">Book Cover Finishes</h2>
            <p class="mb-30">Grab your reader's attention with a professionally designed book cover finished with a soft matte or polished gloss.</p>


            <div class="col-xs-12 col-sm-6 col-md-4 col-md-push-2 col-lg-3 col-lg-push-3 book-item">
                <img src="../Images/book-printing-gloss.jpg" width="201" height="264" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Gloss film lamination</p>
                <span>more info</span>
            </div>


            <div class="col-xs-12 col-sm-6 col-md-4 col-md-push-2 col-lg-3 col-lg-push-3 book-item">
                <img src="../Images/book-printing-matte.jpg" width="200" height="264" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Matte finish</p>
                <span>more info</span>
            </div>

            
            <div class="article-divider clearfix"></div>
            
            
            <h2 class="title-bold">Interior Text Print Type & Image Printing</h2>
            <p class="mb-30">Grab your reader's attention with a professionally designed book cover finished with a soft matte or polished gloss.</p>


            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 book-item">
                <img src="../Images/book-printing-text-bw.jpg" width="349" height="223" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Black & White interior text & image printing</p>
                <span>more info</span>
            </div>


            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 book-item">
                <img src="../Images/book-printing-text-color.jpg" width="349" height="223" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-10" />
                <p class="book-item-title-binding">Full color interior text & image printing</p>
                <span>more info</span>
            </div>

            
            <div class="article-divider clearfix"></div>
            
            
            <h2 class="title-bold">Interior Text Paper Stock Options</h2>
            <p class="mb-30">Your pages should look as good as the words written on them. The art of choosing the right paper stock is tricky, but it will ultimately define the feel and quality of your book, depending on your budget and production time. Uncoated paper stock has a rough, natural feel to it and is recommended for more traditional books without imagery. Coated paper stock reflects more light and has a slicker feel. It’s a popular choice for photography, art, comic and children’s books.</p>
            
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-15 col-md-15 col-lg-15 book-item">
                <img src="../Images/book-printing-stock-500-92.jpg" width="131" height="168" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-20">
                <p class="book-item-title-paper-stock">500 PPI, 92 Opacity, SFI Certified</p>
                <p class="book-item-title-paper-stock-weight">Uncoated &amp; Off-white</p>
                <p class="book-item-title-paper-stock-details">Best for lengthy novels and books without imagery.</p>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-15 col-md-15 col-lg-15 book-item">
                <img src="../Images/book-printing-stock-420-94.jpg" width="130" height="168" alt="Hard cover book" title="Hard cover book" class="img-responsive center-block mb-20">
                <p class="book-item-title-paper-stock">420 PPI, 94 Opacity, SFI Certified</p>
                <p class="book-item-title-paper-stock-weight">Uncoated &amp; Off-white</p>
                <p class="book-item-title-paper-stock-details">Best for lengthy novels, prose and non-fiction.</p>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-15 col-md-15 col-lg-15 book-item">
                <img src="../Images/book-printing-stock-500-93.jpg" width="130" height="168" alt="Hard cover book with jacket" title="Hard cover book with jacket" class="img-responsive center-block mb-20">
                <p class="book-item-title-paper-stock">500 PPI, 93 Opacity, SFI Certified</p>
                <p class="book-item-title-paper-stock-weight">Uncoated &amp; White</p>
                <p class="book-item-title-paper-stock-details">Best for lengthy novels and extended text.</p>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-15 col-md-15 col-lg-15 book-item">
                <img src="../Images/book-printing-stock-667-91.jpg" width="130" height="168" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-20">
                <p class="book-item-title-paper-stock">667 PPI. 91 Opacity, SFI Certified</p>
                <p class="book-item-title-paper-stock-weight">Coated &amp; White</p>
                <p class="book-item-title-paper-stock-details">Best used in magazines, comic books and digests.</p>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-sm-15 col-md-15 col-lg-15 book-item">
                <img src="../Images/book-printing-stock-455-95.jpg" width="130" height="168" alt="Soft cover book" title="Soft cover book" class="img-responsive center-block mb-20"> 
                <p class="book-item-title-paper-stock">455 PPI, 95 Opacity, SFI Certified</p>
                <p class="book-item-title-paper-stock-weight">Heaviest &amp; White</p>
                <p class="book-item-title-paper-stock-details">Best for photos and full color printing books.</p>
            </div>
                

            
            <div class="article-divider clearfix"></div>
            
            
            <h2 class="title-bold">Word Count</h2>
            <p class="mb-30">Our recommended word count for the most popular styles of books.</p>        



            
            <div class="table-res mt-20 mb-40">
                

                <table class="table table-bordered res mob-fix book-trim-sizes">
                    <thead>
                        <tr>
                            <th class="bg-t-blue"><span>Word Count</span></th>
                            <th class="bg-t-blue"><span>POCKET BOOK pages</span></th>
                            <th class="bg-t-blue"><span>DIGEST pages</span></th>
                            <th class="bg-t-blue"><span>TRADE pages</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="bg-lt-blue"><span>10,000</span></td>
                            <td><span>30-75</span></td>
                            <td><span>25-50</span></td>
                            <td><span>25-50</span></td>
                        </tr>
                        <tr>
                            <td class="bg-lt-blue"><span>20,000</span></td>
                            <td><span>80-150</span></td>
                            <td><span>50-100</span></td>
                            <td><span>50-100</span></td>
                        </tr>
                        <tr>
                            <td class="bg-lt-blue"><span>30,000</span></td>
                            <td><span>100-150</span></td>
                            <td><span>125-150</span></td>
                            <td><span>75-150</span></td>
                        </tr>
                        <tr>
                            <td class="bg-lt-blue"><span>50,000</span></td>
                            <td><span>200-300</span></td>
                            <td><span>150-250</span></td>
                            <td><span>150-250</span></td>
                        </tr>
                        <tr>
                            <td class="bg-lt-blue"><span>70,000</span></td>
                            <td><span>250-375</span></td>
                            <td><span>250-350</span></td>
                            <td><span>200-300</span></td>
                        </tr>
                        <tr>
                            <td class="bg-lt-blue"><span>100,000</span></td>
                            <td><span>400-500</span></td>
                            <td><span>350-450</span></td>
                            <td><span>300-400</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <em>Based on 11pt font (9pt for Pocket size), 1.5 line spacing, no images.</em>

        </div>
    </div>




    <div class="container-fluid bg-dk-blue section-padding-default">
        <div class="container">
            <div class="row">
                <h2 class="title-bold white">Ready to get published? Create your book right now!</h2>                
                <a href="/quoter/default.aspx" class="btn btn-center btn-orange btn-lg">Get started</a>
            </div>
        </div>
    </div>


</asp:Content>

