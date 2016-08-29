<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="MasterPage.master" CodeFile="Default.aspx.cs" Inherits="Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">




<div class="container-fluid bg-img bg-wood-panel pb-30">
    <div class="container">
        <div class="row">
            <section class="jumbotron light">
                <h1 class="title text-center mt-0">BookBaby Customer Reviews</h1>
                <p class="subhead">Want to publish your book with confidence? With BookBaby you can.</p>
            </section>
        </div>
    </div>
</div>


<div class="container">
    <div class="row col-xs-12 col-sm-12 col-md-12 col-lg-12 text-left">
        <section id="reviews-wrapper">
            <div class="trustpilot-widget" data-locale="en-US" data-template-id="539adbd6dec7e10e686debee" data-businessunit-id="4f5a56f600006400051390aa" data-style-height="1600px" data-style-width="980px" data-stars="4,5"></div>
        </section>
    </div>
</div>


<div class="container-fluid bg-dk-blue section-padding-default">
    <div class="container">
        <div class="row">
           <h2 class="title-bold white">See what BookBaby can do for you.</h2>
           <a href="/pricing" class="btn btn-center btn-orange btn-lg" role="button">Get started</a>
        </div>
    </div>
</div>

</asp:Content>