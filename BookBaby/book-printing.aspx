<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ebooks.aspx.vb"  MasterPageFile="MasterPage.master" Inherits="EBooks_Default" %>

<asp:Content runat="server" ContentPlaceHolderID="pageContent">



<div class="container-fluid bg-img bg-book-printing">
    <div class="container">
        <div class="row">
            <section class="jumbotron">
                <h1 class="title no-shadow">Custom book printing and binding at prices you can afford</h1>
                <h2 class="subtitle no-shadow">Whether you need 25 or 10,000 books, BookBaby is your best choice.</h2>
                
                <a href="/book-genres-and-styles" onClick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-viewbookstyles']);" class="btn btn-center btn-orange btn-lg" role="button">View book styles</a>
                <p class="link"><a class="link-orange" href="/quoter/default.aspx" onClick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-getpricing']);">Get pricing</a></p>
            </section>
        </div>
    </div>
</div>




<div class="container-fluid ptb-40">
        <section class="container">

            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 center-text">
                <a href="/book-editing-services">
                    <img class="img-responsive center-block" src="/Images/book-printing-suboffer-editing.jpg" alt="NEW! Editing Services" title="NEW! Editing Services" /></a>
                <h3 class="title-bold">NEW! Editing Services</h3>
                <p>Finally. Affordable editing for self-published authors. <br />
                    <a href="/book-editing-services" onClick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-editing-services']);">Learn more</a></p>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 center-text">
                <a href="/book-formatting">
                    <img class="img-responsive center-block" src="/Images/book-printing-suboffer1.jpg" alt="Books with great cover design and book formatting are the ones that sell" title="Make your book cover stand out with book cover design services" /></a>
                <h3 class="title-bold">Book design services</h3>
                <p>Book cover and interior book design & formatting<br />
                <a class="link-orange" href="/book-formatting" onClick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-cover-design']);">Learn more</a></p>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 center-text">
                <a href="/single-book-printing" onClick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-single-book-print']);">
                    <img src="/Images/book-printing-suboffer2.jpg" alt="eBooks 101" title="eBooks 101" class="img-responsive center-block" /></a>
                <h3 class="title-bold">Print a book for just $19!</h3>
                <p>Print one copy of your book—any trim size, any binding—for just $19.<br />
                <a class="link-orange" href="/single-book-printing">Learn more</a></p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        	    <h3 class="title-bold">Add Print On Demand and eBooks to your order.</h3>
                <p><a class="link-orange" href="/complete-self-publishing-package" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-CSPP']);">Learn more about the Complete Self-Publishing Package.</a></p>
            </div>

        </section>
</div>



    
    
    
    
<div class="container-fluid bg-lt-blue ptb-40">
    <div class="container">

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-40">
            <h2 class="title-bold">What kind of book are you making?</h2>
            <p><a class="link-orange" href="/book-genres-and-styles" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-see-all-book-styles']);">See all book styles</a></p>
        </div>

        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2">
	        <a href="/cookbooks" class="book-styles" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'homeB-kind-of-book-cook']);"><img src="/Images/book-printing-what-book1.jpg" alt="Cookbook" title="Cookbook" class="img-responsive center-block" />Cookbook</a>
        </div>
        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2">
	        <a href="/childrens-book-printing" class="book-styles" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'homeB-kind-of-book-childrens']);"><img src="/Images/book-printing-what-book2.jpg" alt="Children’s Book" title="Children’s Book" class="img-responsive center-block" />Children’s Book</a>
        </div>
        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2">
	        <a href="/photo-book-printing" class="book-styles" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'homeB-kind-of-book-photo']);"><img src="/Images/book-printing-what-book3.jpg" alt="Photo Book" title="Photo Book" class="img-responsive center-block" />Photo Book</a>
        </div>
        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2">
	        <a href="/yearbook-printing" class="book-styles" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'homeB-kind-of-book-yearbook']);"><img src="/Images/book-printing-what-book4.jpg" alt="Yearbook" title="Yearbook" class="img-responsive center-block" />Yearbook</a>
        </div>
        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2">
	        <a href="/art-book-printing" class="book-styles" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'homeB-kind-of-book-art']);"><img src="/Images/book-printing-what-book5.jpg" alt="Art Book" title="Art Book" class="img-responsive center-block" />Art Book</a>
        </div>
        <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2">
	        <a href="/novel-printing" class="book-styles" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'homeB-kind-of-book-novel']);"><img src="/Images/book-printing-what-book6.jpg" alt="Novel" title="Novel" class="img-responsive center-block" />Novel</a>
        </div>
            
    </div>
</div>



    
    
    
    
<div class="container-fluid bg-tan ptb-40 pre-offset-100">
    <div class="container">

        <div class="col-xs-12 col-sm-3 col-md-2 col-lg-2">
	        <img src="/Images/free-shipping-truck.png" class="img-responsive center-block mt-20" alt="Free Shipping" title="Free Shipping">
        </div>

        <div class="col-xs-12 col-sm-9 col-md-10 col-lg-10 text-left text-center-mobile">
            <h2 class="title-bold">Free Shipping!</h2> 
            <p class="intro">New low prices AND <a href="/shipping">free ground shipping</a> on any printed book order of 25 to 1,000 units? We must really like you.</p>
        </div>
            
    </div>
</div>





<div class="container-fluid bg-green pb-m-20">
    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-sm-12 col-mg-12 col-lg-12 offset-icon-100">
                <a href="/guarantee" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-guarantee1']);"><img src="/Images/book-printing-guarantee-icon.png" alt="BookBaby Guarantee - Your satisfaction is our number one goal." title="BookBaby Guarantee - Your satisfaction is our number one goal."></a>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-9 sc-mt-o-10 text-left">
                <h2 class="title-bold white text-center-xs-sm">We know you’ll be happy with our work. In fact, we guarantee it.</h2>
                <p class="intro white text-center-xs-sm">When you get your book printed with BookBaby, you can expect the printing industry’s best quality.</p>
                <p class="white text-center-xs-sm mmb-40">BookBaby delivers truly premium quality books — we back it up with our 100% Satisfaction Guarantee. If you’re not completely delighted with your books you pay nothing. <a href="/guarantee" class="link-orange" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'book-printing-guarantee2']);">Learn more</a></p>
            </div>

            <div class="hidden-xs hidden-sm col-md-4 col-lg-3 offset-top-165">
                <img src="/Images/book-printing-testimonial.jpg" />
            </div>

        </div>
    </div>
</div>


<div class="container-fluid bg-blue-books ptb-40">
    <div class="container">

        <h2 class="title-bold blk-shadow white">Premium Book Printing</h2>
        <p class="blk-shadow white">Whether you need 25 or 10,000 books, BookBaby is your best choice. </p>
        <a href="/wholesale-book-printing" class="btn btn-center btn-orange btn-l" onclick="_gaq.push(['_trackEvent', 'bookprinting', 'Click', 'bookprinting-learnmore']);">Learn more</a>

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
