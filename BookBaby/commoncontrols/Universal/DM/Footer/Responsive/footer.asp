		    </section>
            
            <!--#include virtual = "/commoncontrols/universal/dm/footer/responsive/footer.htm"-->
            
        </div><!-- #site-container -->
       <input type="hidden" id="avlBrand" value="0" />
    <%
        Address = curDomainURL() & "/FootBundles.aspx"
            

        url = Address
        set xmlhttp = CreateObject("MSXML2.ServerXMLHTTP") 
        xmlhttp.open "GET", url, false 
        xmlhttp.send "" 
        Response.write xmlhttp.responseText 
        set xmlhttp = nothing 
    %>

    <!-- #include virtual="/includes/google-remarketing-code.asp" -->

    <script type="text/javascript">
        $(document).ready(function () {
            $('.lazySliderContainer').reallyLazySlider();
        });
    </script>

</body>
</html>
