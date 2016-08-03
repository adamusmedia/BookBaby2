﻿<%@ Page Language="VB" AutoEventWireup="false" CodeFile="privacy.aspx.vb"  MasterPageFile="MasterPage.master" Inherits="Privacy_Default" %>

<asp:Content runat="server" ContentPlaceHolderID="pageContent">



<div class="container-fluid bg-img bg-privacy">
    <div class="container">
        <div class="row">
            <section class="jumbotron light text-left">
                <h1 class="title pt-35">BookBaby Privacy Policy</h1>
            </section>
        </div>
    </div>
</div>




<div class="container-fluid section-padding-default">
    <div class="container">
        <div class="row text-left">
        <div class="col-xs-12">
    		<h2>We care about how your personal information is used and shared. We take your privacy seriously.</h2>
        </div>
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


		<div id="contract-text" class="col-xs-12 text-left">
			<p>Please read the following to learn more about our privacy policy. By visiting the BookBaby managed domains (including, but not limited to, www.bookbaby.com) and websites or domain name, or any other linked pages, features, content, or application services offered from time to time by BookBaby in connection therewith (collectively, the "Website"), submitting information, or using any of our services, you acknowledge that you accept the practices and policies outlined in this privacy policy (the "Privacy Policy").</p>

			<h3 class="title-bold">WHAT DOES THIS PRIVACY POLICY COVER?</h3>    
			<p>This Privacy Policy covers BookBaby's treatment of information that BookBaby gathers when you are accessing BookBaby's Website as a consumer and when you use BookBaby services as a customer (the "Information"). Also, this Privacy Policy covers BookBaby's treatment of your information that BookBaby's business partners share with BookBaby. This Privacy Policy does not apply to the practices of third parties that BookBaby does not own or control (such as third-party websites that you may access from the Website), or to individuals that BookBaby does not employ or manage.</p>

			<h3 class="title-bold">WHAT INFORMATION DOES BOOKBABY COLLECT?</h3>
			<p>The Information we gather from consumers and customers enables BookBaby to personalize and improve our services and to allow our consumers and customers to set up accounts on the Website. In connection with the Website, we request and display some Information to other consumers and visitors of the Website, which allows consumers to identify authors and goods on the Website. We collect the following types of information from our consumers and customers.</p>

			<h3 class="title-bold">Information You Provide to Us:</h3>
			<p>We receive and store any information you enter on our Website or provide to us in any other way. The types of Information collected include, without limitation, your full name, email address, mailing address, phone number, IP address, browser information, password, contact information, credit card or bank account information, transactional information based on your activities on the Website, and media consumed on the Website including, but not limited to, media viewed (including eBooks), played, downloaded, uploaded, and shared. You can choose not to provide us with certain information, but then you may not be able to take advantage of many of our special features.</p>

			<h3 class="title-bold">Information Collected Automatically:</h3>
			<ul class="disc-list">
				<li>We receive and store certain types of information whenever you interact with our Website or services. BookBaby automatically receives and records information on our server logs from your browser including your IP address, BookBaby cookie information, the page you requested, and the media you have consumed (e.g., viewed, played, downloaded, uploaded, and shared).</li>
				<li>Generally, our service automatically collects usage information, such as the numbers and frequency of visitors to our site and its components, similar to TV ratings that indicate how many people watched a particular show. This type of data enables us to figure out how often consumers use parts of the Website or services so that we can make the Website appealing to as many consumers as possible, and improve those services.</li>
			</ul>

			<h3 class="title-bold">What About Cookies?</h3>
			<ul class="disc-list">
				<li>Cookies are alphanumeric identifiers that we transfer to your computer's hard drive through your browser to enable our systems to recognize your browser and tell us how and when pages in our site are visited and by how many people. BookBaby cookies do not collect Information, and except as necessary to investigate claims of fraud or other misconduct or as otherwise necessary to track purchases for purposes of calculating credit under our affiliate program, we do not combine the general information collected through cookies with other personal Information to tell us who you are or what your screen name or email address is. </li>
				<li>Most browsers have an option for turning off the cookie feature, which will prevent your browser from accepting new cookies, as well as (depending on the sophistication of your browser software) allowing you to decide on acceptance of each new cookie in a variety of ways. We strongly recommend that you leave the cookies activated, however, because cookies enable you to take advantage of some of our Website's most attractive features.</li>
				<li>Ads and offers appearing on the Website may be delivered to consumers and customers by our advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by BookBaby and does not cover the use of cookies by any advertisers or other third parties with whom BookBaby may work. BookBaby does not access or control such third party cookies; please refer to those companies' privacy policies.</li>
			</ul>

			<h3 class="title-bold">HOW DOES BOOKBABY USE MY INFORMATION?</h3>
			<p>The Information you provide is used for purposes such as responding to your requests for certain products and services, customizing the content you see, communicating with you about specials, sales offers, and new features, and responding to problems with our services.</p>
			<p>BookBaby may use all of the Information that we collect from our users to understand usage trends and consumer and customer preferences, to improve the way the Website works and looks, to improve our marketing and promotional efforts, and to create new features and functionalities.</p>
			<p>BookBaby may use automatically collected information and cookies information to: (a) remember your information so that you will not have to re-enter it during your visit or the next time you visit the Website; (b) provide custom, personalized advertisements, content, and information; (c) monitor the effectiveness of our marketing campaigns; and (d) monitor aggregate usage metrics such as total number of visitors and pages viewed. </p>
			<p>BookBaby may use your email address or other personally identifiable information to you promotional or marketing information or to provide you with information about a specific program or feature you have elected to participate in or receive information about.</p>

    
			<h3 class="title-bold">WILL BOOKBABY SHARE ANY OF THE INFORMATION IT RECEIVES?</h3>
			<p>Information about our customers is an integral part of our business, and we may share such Information with our corporate parent or other affiliated entities. Except as expressly described below, we neither rent nor sell your Information to other people or nonaffiliated companies. We may share your Information when we have your permission, and we may share your Information under the following circumstances:
			We provide Information, (i) to the content owners (e.g., authors and publishers) that relates to their fans/readers (e.g., regarding which fans are consuming and sharing what pieces of media at what levels), subject to the ability of such fans to opt-out of promotional communications, and (ii) we may provide aggregate information to our partners about how our consumers or customers, collectively, use our site (e.g., we share this type of statistical data so that our partners also understand how often people use their services and our Website, so that they, too, may provide you with an optimal online experience). For the avoidance of doubt, when you purchase a particular author's eBook, that author will receive your name and e-mail address unless you opt-out of disclosing this information. An author will also be able to identify the web page or link (included e-mail addresses to the extent a link was embedded in an e-mail) from which you have been referred to an author's page on BookBaby.</p>
			<p><strong>Affiliated Authors and Rightsholders We Do Not Control</strong>: We are affiliated and work closely with a variety of authors and rightsholders (e.g., publishers, independent authors, print co-ops, etc.) In certain situations, these businesses sell items to you through BookBaby's Website, for example, the publishers, authors and other artists from which you purchase or use products or services through the Website. In other situations, BookBaby provides services, or sells products jointly with affiliated businesses. We will share Information that is related to such transactions with that affiliated business unless you expressly opt-out of such disclosure.</p>
			<p><strong>Third Party Service Providers</strong>: We employ other companies and people to perform tasks on our behalf and need to share your information with them to provide products or services to you. Examples of such information include, without limitation, fulfilling orders, delivering packages, sending postal mail and email, analyzing data, processing credit card information, and providing customer service. Unless we tell you differently, such third party service providers do not have any right to use Information we share with them beyond what is reasonably necessary to assist us. You hereby consent to our sharing of Information for the above purposes.</p>
			<p><strong>Business Transfers</strong>: If BookBaby, or all or any portion of its business or assets, are acquired, sold, or otherwise transferred, including in any merger or other transaction, or in the unlikely event that BookBaby goes out of business or enters bankruptcy, consumer and customer Information would be one of the assets that is transferred to or acquired by the successor or acquirer (or a third party through bankruptcy). You acknowledge and agree that such transfers may occur in any of these circumstances, and that any acquirer or successor or other party acquiring all or any portion of BookBaby's business or assets may continue to use your Information as set forth in this policy.</p>
			<p><strong>Protection of BookBaby and Others</strong>: We may release Information when we believe in good faith that release is necessary to comply with any applicable laws, rules or regulations; enforce or apply our conditions of use and other agreements; or protect the rights, property, or safety of BookBaby, our employees, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction.</p>
			<p><strong>Opt-In for Promotions</strong>: We do not share personally identifiable information with other third-party organizations for their marketing or promotional use without your consent or except as part of a specific program or feature for which you will have the ability to opt-in.</p>
			<p><strong>With Your Consent</strong>: Except as set forth above, you will be notified when your Information may be shared with third parties, and will have the option of preventing the sharing of this information.</p>
   
			<h3 class="title-bold">IS INFORMATION ABOUT ME SECURE?</h3>
			<p>Your BookBaby account Information is protected by a password for your privacy and security. You need to protect unauthorized access to your account and Information by selecting and protecting your password appropriately and limiting access to your computer and browser by signing off after you have finished accessing your account. If you share your password or your Information with others, remember that you are responsible for all actions taken in the name of your account. If you lost control of your password, you may lose substantial control over your Information and may be subject to legally binding actions taken on your behalf. Therefore, if you password has been compromised for any reason, you should immediately notify BookBaby and change your password.</p>
			<p>BookBaby attempts to protect user information to ensure that user account information is kept private; however, BookBaby cannot guarantee or ensure the security of user account information. Not even the U.S. government appears capable of securing highly sensitive personal and national security information from unauthorized access, use, and exploitation. Unauthorized entry or use by third parties, hardware or software failure, and other factors may compromise the security of user information at any time, including your Information.</p>
    
			<h3 class="title-bold">WHAT INFORMATION CAN I ACCESS?</h3>
			<p>BookBaby may allow you to access certain information about you through the member dashboard (for artists), and/or customer accounts, for the purpose of viewing, and in certain situations, updating that information.</p>
    
			<h3 class="title-bold">WHAT CHOICES DO I HAVE?</h3>
			<ul class="disc-list">
				<li>As stated previously, you can always opt not to disclose Information to us; provided, however, that in order to purchase goods from us as a customer or to make goods available for sale as a client, you will have to provide us with Information. If you are unwilling to provide Information, then you cannot purchase or sell goods through the BookBaby managed domains. </li>
				<li>You are able to add or update certain information on pages, such as those listed in the "What Information Can I Access" section above. When you update information, however, we often maintain a copy of the unrevised information in our records.</li>
				<li>You may request deletion of your BookBaby account by contacting BookBaby's customer support at info@bookbaby.com. Please note that some information may remain in our records after deletion of your account.</li>
				<li>You will be able to opt-out of receiving e-mail notices or solicitations from BookBaby or our affiliates by responding to a link included in each e-mail notice or solicitation.</li>
			</ul>
    
			<h3 class="title-bold">CHANGES TO THIS PRIVACY POLICY</h3>
			<p>BookBaby may revise this Privacy Policy from time to time. The most current version of the policy will govern our use of your Information and will always be available at <a href="http://www.bookbaby.com/privacy" class="highlight">http://www.bookbaby.com/privacy</a>. If we make a change to this policy that, in our sole discretion, is material, we will notify you via an e-mail notice to the e-mail address associated with your account. You and all consumers and customers are bound by any changes to the Privacy Policy when you or they use the Website after such changes have been first posted.</p>

			<h3 class="title-bold">THIRD PARTY ADVERTISERS; LINKS TO OTHER SITES</h3>
			<p>The Website contains links to other sites, including the sites of the authors, publishers and other artists from which you purchase or use products or services through the Website. BookBaby is not responsible for the privacy policies and/or practices on other sites (including the authors, publishers and other artists from which you purchase or use products or services through the Website). When linking to another site you should read the privacy policy stated on that site. This Privacy Policy only governs information collected on the Website.</p>
    
			<h3 class="title-bold">CHILDREN</h3>
			<p>Consistent with the federal Children's Online Privacy Protection Act of 1998 ("COPPA"), we will never knowingly collect personally identifiable information from anyone under the age of thirteen (13) without requiring parental consent. Any person who provides their personal information to BookBaby through the Website represents that they are 13 years of age or older. </p>
    
			<h3 class="title-bold">NOTE TO INTERNATIONAL USERS</h3>
			<p>The Website is hosted in the United States. If you are a customer or client accessing the Website from the European Union, Asia, or any other region with laws or regulations governing personal data collection, use, and disclosure, that differ from United States laws, then please note that you are transferring your personal data to the United States which does not have the same data protection laws as the EU and other regions.</p>
			<p>By providing your personal data to BookBaby through the Website, you consent to:</p>
			<ul class="disc-list">
				<li>the use of your personal data for the uses identified above in accordance with the Privacy Policy; and</li>
				<li>the transfer of your personal data to the United States as indicated above.</li>
			</ul>
			<p><em>Last Updated January 18, 2011</em></p>
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
