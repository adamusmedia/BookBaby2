
/* TOC

    (VARIABLE) ie
	(BINDING)  Document : ready
    (FUNCTION) InitHeaderSearchInput()

*/
var DMScripts = {};

DMScripts.Functions = {};

DMScripts.Functions.InitLoginLink = function () {
    $("li.login-link").find("a").attr("href", $("#txtLoginLink").val());
    $("li.login-link").find("span").text($("#txtLoginLabel").val());
    if ($("li.login-link").find("span").text().toLowerCase() === "logout") {
        $("li.login-link").find("i").removeClass("icon-enter").addClass("icon-exit");
    } else {
        $("li.login-link").find("i").removeClass("icon-exit").addClass("icon-enter");
    }
}; // DMScripts.Functions.InitLoginLink


//  ====================================================================================================
//  (BINDING) Document : ready
//  ====================================================================================================

	// After document load...
    $(document).ready(function () {
        InitHeaderSearchInput();
        DMScripts.Functions.InitLoginLink();
    });     // ready() 

//  ====================================================================================================
//  (FUNCTION) InitHeaderSearchInput()
//  ====================================================================================================
    var HeaderSearchMessage = "Blank CDs, Burners, Get on iTunes, etc.",
        HeaderInvalidMessage = "Enter a Valid Search";
    function HeaderCheckSearch() {

        var alphanumeric = new RegExp("^\s*[a-z0-9]+\s*[a-z0-9]*\s*[a-z0-9]*", "i") //valid reg expression
            content = $("#SearchTerms").val().toLowerCase(); //get the input value

        //If there are any values we don't want
        if (content == HeaderSearchMessage.toLowerCase() || content == HeaderInvalidMessage.toLowerCase() || alphanumeric.test(content) == false || content == "search") {//check validity
            $("#SearchTerms").val(HeaderInvalidMessage);
            $("#SearchTerms").removeClass('user-input');
            $("#SearchTerms").blur();
            return false;
        } //if
        else {
            window.location.href = "/websearch/index.aspx?SearchTerms=" + content.replace(" ", "+");
        }
    } //HeaderCheckSearch()
    function blockReturn(event) {
        if (event.keyCode == 13) {
            event.stopPropagation();
            event.preventDefault();
            $('#SearchButton').click();
            return false;
        }
    }// blockReturn(event) 
    function focusSearch() {
        var alphanumeric = new RegExp("^\s*[a-z0-9]+\s*[a-z0-9]*\s*[a-z0-9]*", "i"), //valid reg expression
            content = $("#SearchTerms").val().toLowerCase(); //get the input value
        //If there are any of the default or error values
        if (content == HeaderSearchMessage.toLowerCase() || content == HeaderInvalidMessage.toLowerCase() || alphanumeric.test(content) == false || content == "search") {//check validity
            $(this).val("");
            $(this).addClass('user-input');//#333 no-italic font 
        }//if
    }

    function unfocusSearch() {
        //if there is no value
        if ($(this).val() == "") {
            $(this).removeClass('user-input');
            $(this).val(HeaderSearchMessage);
        }//if
    }
    // if there are no update panels on the current page, set the session warning and expiration timeouts if there is session
    function InitHeaderSearchInput() {
        //main-search
        $("#header-search .search-button").bind("click", HeaderCheckSearch);  // click
        $("#header-search .new-search-button").bind("click", HeaderCheckSearch);  // click
        $("#SearchTerms").unbind("keypress").bind("keypress",blockReturn);
        $("#SearchTerms").unbind("keydown").bind("keydown", blockReturn);
        $("#SearchTerms").val(HeaderSearchMessage);
        $("#SearchTerms").focusin(focusSearch).focusout(unfocusSearch);//focusin & focusout
    }   // InitHeaderSearchInput

