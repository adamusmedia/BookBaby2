<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="MasterPage.master" CodeFile="Default.aspx.cs" Inherits="Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">

<div class="container-fluid pb-40 plr-0">
    <div class="container">
        <div class="row">
            <section class="jumbotron light">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <img src="/Images/free-shipping-dec.png" width="372" height="224" class="img-responsive center-block">
				    <h1 class="title black pt-35 mb-20 no-shadow">FREE shipping on all book orders!</h1>
            	    <p class="lead black">Get free ground shipping on any printed book order of 25 to 1,000 units. Any book, any binding, any trim size, any cover option... they all get free shipping!<br><br>
                        Just use code "<strong>FREESHIPBB</strong>" when placing any book order<br>
                    (Orders shipped to US domestic addresses only).<br>
             	    Cannot be combined with any other offer.</p>
            	    <a href="/book-genres-and-styles" class="btn btn-orange btn-lg" role="button">Ready to make a book?</a>
                </div>
            </section>
        </div>

    </div>
</div>






<div class="container-fluid bg-tan ptb-20">
    <div class="container text-center">
        <h2 class="title-bold">BookBaby Shipping Policies</h2>
        <p class="lead">All orders are produced in the USA.</p>
        <div class="article-divider-2"></div>
        
        <p class="large mb-0 mt-30"><strong>USA</strong></p>
        <p class="mb-40">All US orders ship via UPS or motor freight carrier depending on size.</p>

        <p class="large"><strong>Outside USA</strong></p>
        <p class="mb-30">All orders to delivering to destinations outside of the US will ship via DHL. All international shipments ship D.D.U. (Delivery Duty Unpaid). Consignees are responsible for all applicable duties, taxes and import charges at time of delivery.</p>



    </div>
</div>












<div class="container-fluid bg-dk-blue section-padding-default">
    <div class="container">
        <div class="row">
           <h2 class="title-bold white">Now's the time to make your book.</h2>
           <a href="/quoter/confighandler.aspx?webpreconfigid=WPC0000038" class="btn btn-center btn-orange btn-lg" role="button">Get started</a>
        </div>
    </div>
</div>



</asp:Content>