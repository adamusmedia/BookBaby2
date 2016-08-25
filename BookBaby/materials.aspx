<%@ Page Language="VB" AutoEventWireup="false" CodeFile="free-publishing-guides.aspx.vb"  MasterPageFile="MasterPage.master" Inherits="free_publishing_guides" %>

<asp:Content runat="server" ContentPlaceHolderID="pageContent">




<div class="container-fluid bg-img bg-wood-panel">
    <div class="container">
        <div class="row">
            <section class="jumbotron light">
                <h1 class="title text-center pb-30">BookBaby Materials License Form</h1>
            </section>
        </div>
    </div>
</div>


    <div class="container-fluid bg-cream ptb-40">
        <div class="container">
            <p>We are considering using your project in our marketing materials including without limitation, using photographs of your project in our catalogs, website, brochures, ads, videos, and in our designer’s portfolios. If this is agreeable to you, please read the materials license carefully and submit.</p>

            <div class="article-divider"></div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-left">
				<p><strong>MATERIALS LICENSE</strong></p>
                <ol class="num-list">
				    <li>I give and grant to BookBaby and its affiliates and successors and assigns (collectively, the "Licensees") the right to use and publish photos or representations of the project referenced above, and any photographs and/or testimonials provided by me (collectively, the "Materials"), in connection with Licensees' marketing and general promotion of its business activities and products. I release the Licensees from any and all claims of every kind and nature whatsoever on account of, ensuing from, or in connection with such use.</li>

				    <li>I agree that no advertising or promotional materials of Licensee using my Materials needs to be submitted to me for approval.</li>

				    <li>I warrant and represent that I am over the age of 18, that I am the true and rightful owner of the Materials and that I have the right and authority to enter into this license and to grant the rights herein provided, and that this license does not in any way conflict with any existing commitment on my part or the rights of any third party, and the Materials are free from any claims, threatened or pending, of any third parties whatsoever.</li>

				    <li>Nothing herein will constitute any obligation on Licensees' part to in any way use, promote or publish the Materials.</li>

				    <li>This license constitutes the entire agreement and understanding between the parties with respect to the subject matter hereof and supersedes all prior negotiations, correspondence, and agreements, whether oral or written.</li>
                </ol>
				<p><strong>IN WITNESS WHEREOF, I have executed this License as of the date indicated on the right.</strong></p>
            </div>
            

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-left yb-form">
 
                
	            <div id="container_EMAIL" class="input-container">
		            <label for="control_EMAIL">Email address</label>
		            <input type="text" name="Email" id="control_EMAIL" label="Email address" class="req-email textbox txt-email">
	            </div>
               <div id="container_COLUMN1" class="input-container">
		            <label for="control_COLUMN1">Full name</label>
		            <input type="text" name="fullname" id="control_COLUMN1" label="Full name" class="req-field textbox txt-email">
                </div>
                <div id="container_COLUMN1" class="input-container">
		            <label for="control_COLUMN1">Today's Date</label>
		            <input type="text" name="phone" id="control_COLUMN1" label="Phone" class="req-field textbox txt-name">
                </div>
                <div id="container_COLUMN1" class="input-container">
		            <label for="control_COLUMN1">Writer/Author Name</label>
		            <input type="text" name="school" id="control_COLUMN1" label="School" class="req-field textbox txt-email">
                </div>
                <div id="container_COLUMN1" class="input-container">
		            <label for="control_COLUMN1">Title of book</label>
		            <input type="text" name="titleofbook" id="control_COLUMN1" label="Title of book" class="req-field textbox txt-email">
                </div>
	            <div id="container_COLUMN2" class="input-container">
		            <label for="control_COLUMN2">Sales Order Number</label>
		            <input type="text" name="numberofbooks" id="control_COLUMN2" label="Number of books" class="req-field textbox txt-numbers">
	            </div>
    
    
               <div style="position: relative; overflow: hidden; width: 300px;">
		            <button type="submit" class="btn btn-orange btn-lg" onclick="this.form.action='https://www.pages04.net/discmakers-cdbaby/Yearbooks'; return checkRequiredFields($('.form'));">Submit</button>
	            </div>    
                <input type="hidden" name="source" id="Text1" class="textInput defaultText" value="YEARBOOK-BBWEB">
	            <input type="hidden" name="initialsource" id="Text1" class="textInput defaultText" value="YEARBOOK-BBWEB">
	            <input type="hidden" name="formSourceName" value="StandardForm">

                <p class="mt-20">By submitting this form you are agreeing to the terms above.</p>
            
                                               
            </div>
        </div>
    </div>

    
</asp:Content>