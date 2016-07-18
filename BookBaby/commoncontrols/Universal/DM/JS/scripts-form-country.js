// JavaScript Document

/* TOC

	(OBJECT) countryCache
	((FUNCTION) getCountries()
	(FUNCTION) parseCountries()
	(FUNCTION) loadCountryDropDown()
	(FUNCTION) loadStatesDropDown()
	(FUNCTION) updateStateElement()
	
*/

//  ====================================================================================================
//  (OBJECT) countryCache
//  ====================================================================================================

dmCountryCache = {};

//  ====================================================================================================
//  (FUNCTION) getCountries
//  ====================================================================================================

function getCountries(){
	$.get("/MyAccount/Includes/AllCountries.xml",function(data) { 
		parseCountries(data);
	});
}

//  ====================================================================================================
//  (FUNCTION) parseCountries() - Caches Country and State values in JSON format
//  ====================================================================================================

function parseCountries(countryXml){
	var countryText, countryValue, stateText, stateValue, stateObj;
	stateObj = {};
	if(!countryXml) {
		//no xml
	}else {
		
		//Populates the dmCountryCache object with the country information
		$(countryXml).find('country').each(function() { 
			countryText = $(this).attr("text");
 			countryValue = $(this).attr("value");
			dmCountryCache[countryValue] = {name:countryText,abbr:countryValue};
			$(this).find("state").each(function () { 
				stateText = $(this).attr("text");
				stateValue = $(this).attr("value");
				stateObj[stateValue] = {name:stateText,abbr:stateValue};
			});
			if(stateObj !== undefined) {
				dmCountryCache[countryValue].states = stateObj;
			 	stateObj = {};
			}
		});
	}	
	//Load country data into the dropdown for the first time
	loadCountryDropDown();	
}

//  ====================================================================================================
//  (FUNCTION) loadCountryDropDown() - Populates the Country dropdown
//  ====================================================================================================

function loadCountryDropDown(){
	for(var country in dmCountryCache) {
		$("#country").append("<option value=" + dmCountryCache[country].abbr + ">" + dmCountryCache[country].name + "</option>");	
	}
	//Load the states dropdown for the first time.
	loadStatesDropDown($("select#country option:selected").attr("value"));
}

//  ====================================================================================================
//  (FUNCTION) loadStatesDropDown() - Populates the State dropdown
//  ====================================================================================================

function loadStatesDropDown(country) {
	$("#ddlStates").empty(); //Clear out the states select element first
	if (country == "US") { //US has no default/blank value for the states, adding one manually
	    $("#ddlStates").append("<option value=''>Select A State</option>");
	}
    for(state in dmCountryCache[country].states) {
		$("#ddlSstates").append("<option value=" + dmCountryCache[country].states[state].abbr + ">" + dmCountryCache[country].states[state].name + "</option>");	
	}
}

//  ====================================================================================================
//  (FUNCTION) updateStateElement() - Country dropdown onChange function
//  ====================================================================================================

function updateStateElement() { 
	//Find the selected country.
	var countryValue = $("select#country option:selected").attr("value");
	//Check if the country has states designated in the dmCountryCache object
	var noCountryStates = $.isEmptyObject(dmCountryCache[countryValue].states);
	$("#ddlStates").attr("value", "");
	if(!noCountryStates){ 
		//The country has states, populate other dropdown with states
	    loadStatesDropDown(countryValue);
	    $("#ddlStates").css({ "display": "block", "visibility": "inherit" }); //show the state dropdown
	    $("#txtState").val(""); //reset the textbox to nothing for form submission values

	    $("#txtState").css({ "display": "none", "visibility": "hidden" }).removeClass("req-field"); //
		$("#txtState").parent().removeClass("highlighted-container"); 						        // extra cleanup required to get rid of textbox validation
		$("#txtState").siblings("img.field-status").css("display", "none"); 					    //
		$("#txtState").siblings("div.input-error").css("display", "none");                          //
	}else{
        //The country has no states, swap with the text box.
        $("#ddlStates").prop("selectedIndex", 0); //Reset the dropdown to the empty value
        $("#ddlStates").css({ "display": "none", "visibility": "hidden" });
        $("#txtState").css({ "display": "block", "visibility": "inherit" }).addClass("req-field");
	}
}	

