<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="MasterPage.master" CodeFile="Default.aspx.cs" Inherits="_Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">

<div class="container-fluid">
    <div class="row">
        <section class="jumbotron light hero home-hero mb-0">
            <h1 class="title">New low prices on printed books, same high standards</h1>
            <h2 class="subtitle">Self-publishing your book just got much more affordable.</h2>
            <a href="/book-printing" class="btn btn-center btn-orange btn-lg" role="button" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'hero-button-LearnMore']);">Learn more</a>
            <p class="link"><a href="/quoter/default.aspx" onclick="_gaq.push(['_trackEvent', 'home', 'Click', 'hero-GetPricing']);">Get pricing</a></p>
        </section>
    </div>
</div>


<div class="container-fluid bg-cream">
    <div class="row">
        <section class="container" id="product-selections">

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 p-35 center-text">
                <a href="/ebooks" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'eBook Publishing &amp; Distribution']);">
                    <img class="img-responsive center-block" src="images/home/product-selections-b.png" alt="eBook publishing-Sell your eBook on Amazon, iBooks, and beyond. You keep 100% of net sales." title=":Sell your eBook on Amazon, iBooks, and beyond. You keep 100% of net sales." /></a>
                <h3 class="title-bold">eBook publishing</h3>
                <p>
                    Our eBook-only package includes conversion and distribution for just $149!
                    <br />
                    <a href="/ebooks" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'eBook Publishing &amp; Distribution']);">Learn more</a>
                </p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 p-35 center-text">
                <a href="/book-printing" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'Book Printing &amp; Distribution']);">
                    <img class="img-responsive center-block" src="images/home/product-selections-a.png" alt="Custom-printed books:Hardcover, paperback + trim sizes galore. Quantities from 25 to 5,000 and up." title="Custom-printed books:Hardcover, paperback + trim sizes galore. Quantities from 25 to 5,000 and up." /></a>
                <h3 class="title-bold">Custom-printed books</h3>
                <p>
                    Whether you need 25 or 10,000 books, BookBaby is your best choice.<br />
                    <a href="/book-printing" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'Book Printing &amp; Distribution']);">Learn more</a>
                </p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 p-35 center-text">
                <a href="/print-on-demand" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'Print On Demand']);">
                    <img class="img-responsive center-block" src="images/home/product-selections-c.png" alt="Print-On-Demand:Get everything you need to publish, promote, and sell your book in one package. " title="Print-On-Demand:Get everything you need to publish, promote, and sell your book in one package." /></a>
                <h3 class="title-bold">Print On Demand</h3>
                <p>
                    Sell directly to your readers and make more money with POD & BookShop&trade;.<br />
                    <a href="/print-on-demand" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'Print On Demand']);">Learn more</a>
                </p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 center-text pb-35">
                <h2 class="title-bold">Want to get all three?</h2>
                <p><a href="/complete-self-publishing-package">Learn more about the complete self-publishing package.</a></p>
            </div>

        </section>
    </div>
</div>


<div class="container-fluid bg-dark">
    <div class="row">
        <section class="container" id="">

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 center-text">
                <h2 class="text-right"><em>NEW!</em> Affordable editing for self-published authors</h2>
                <p class="text-right">
                    BookBaby Editing Services is for self-published authors who need premium editing for an affordable price. We’ve negotiated special rates with traditional publishing class editors that allow us to charge prices that are 30% to 50% lower than comparable services.<br />
                    <a href="/book-editing-services" onclick="_gaq.push(['_trackEvent', 'homeB', 'Click', 'Quadrant-editing']);">Learn more</a>
                </p>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 center-text">
                
            </div>


        </section>
    </div>
</div>



</asp:Content>