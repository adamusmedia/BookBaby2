<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="MasterPage.master" CodeFile="Default.aspx.cs" Inherits="Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">





<div class="container-fluid bg-lt-blue ptb-40">
    <div class="container">
        <section class="jumbotron light text-center">
            <h1 class="title black no-shadow">Search results </h1>
        </section>
    </div>
</div>




<div class="container text-left p-20 ptb-40">
    
    <section class="section-1 blue" id="search-section-1">
            <div class="content-wrapper">

                <section class="breadcrumbs transition">
                    <div class="content-wrapper">

                        <a href="/" title="">Disc Makers</a>
                        <span class="divider"></span>
                        <span>Search results</span>

                    </div><!-- .content-wrapper -->
                </section> <!-- /end .breadcrumbs -->
                
                
                <div id="search-results-form">
                    <div class="search-box-container">
                                <input name="ctl00$cphContent$searchQuery" type="text" value="test" id="ctl00_cphContent_searchQuery" class="searchbox textbox no-sisy" suggest="yes" data-validation="req-field" autocomplete="off" suggestpos="-1"><div id="_suggestBox" style="position: relative; z-index: 100; display: none; border: 1px solid rgb(0, 0, 0); background-color: rgb(255, 255, 255);"></div>
                        </div>

                  
                      <a href="#" title="" class="btn btn-orange btn-search" id="btnSearch">
                        <span>Search</span>
                    </a>			
                </div>

            </div>
        </section>




    <div class="pagination-container active" id="pagination-container1">
        <span class="page-label">Page</span>
        <a class="page current-page">1</a>
        <a class="page">2</a>
        <a class="page">3</a>
        <a class="page">4</a>
        <a class="page">5</a>
        <a class="page">6</a>
        <a class="page">7</a>
        <a class="page">8</a>
        <a class="page">9</a>
        <a class="page">10</a>
    </div>


    


    <a href="http://abc.com/hc/en-us/articles/209637837-Test-pressings" class="results-item">
        <span class="h2 black"><b>Test</b> pressings – Do you have a question? We've got answers.</span>
        <span class="block-link-orange font-weight-normal">http://abc.com/hc/en-us/articles/209637837-Test-pressings</span>
        <span class="body-copy">All orders receive 4 <b>test</b> pressings. <b>Test</b> pressings ship approximately 4 weeks after approval of your art proofs. <b>Test</b> pressings are...</span>
    </a>


</div>

</asp:Content>

