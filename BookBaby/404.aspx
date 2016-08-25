<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="MasterPage.master" CodeFile="Default.aspx.cs" Inherits="Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">



<div class="container-fluid bg-img bg-error plr-0">
    <div class="container plr-0">
        <section class="jumbotron pt-0 pb-0">  
            <div class="col-xs-12 col-sm-5 col-md-6 col-lg-6 hidden-xs">
                <img src="/Images/404-hamlet.png" width="526" height="500" alt="error 404" title="error 404" class="img-responsive media-right" style="float:right">
            </div>
            <div class="col-xs-12 col-sm-7 col-md-6 col-lg-6 error-mt-30 text-left plr-0 text-left text-center-xs">
                <h1 class="error-title"><span class="visible-xs-error">D</span>on't be so dramatic.<br>It's just a 404 error.</h1>
                <p class="lead errorsub">Seriously, this is nothing to lose your head over. The page you are looking for simply cannot be found. The address may be incorrect or that page has been dethroned.</p>
                <p><a href="/" class="btn btn-orange btn-lg" role="button">Continue viewing the site</a></p>
            </div>
        </section>
    </div>
</div>

    
</asp:Content>