

function InitForm() {
    // Add the status images to the inputs requiring validation
    InsertStatusImages();
    // Bind input focus
    BindInputLabelHighlight();
	// Bind real-time validation
	BindRealTimeVal();
	// StyleCustomInputs the hcekboxes and radio buttons
	StyleCustomInputs();
	// 
}   // InitForm()


function InsertStatusImages() {
	$(".rt-field").each( function() {
	    $(this).after($("<img>", {
            'class':'field-status',
            'src':'/images/pass.png'}));
    });
}   // InsertStatusImages()

function BindInputLabelHighlight() {
    $(".textbox, .textarea, .dropdown").focus(function () {
        if ($(this).parent().hasClass("input-container")) { $(this).parent().find("label").addClass("active-label"); }
    });
    $(".textbox, .textarea, .dropdown").blur(function () {
        if ($(this).parent().hasClass("input-container")) { $(this).parent().find("label").removeClass("active-label"); }
    });
}   // BindInputLabelHighlight()

function BindRealTimeVal() {
    $(".rt-field").blur(function () {
		var currField = $(this);
		ShowInputChecking(currField);
	
		$(currField).animate({ opacity:1 }, 500, function() {
			checkRequiredFields(currField.parent(),true);
		});
    });
}   // BindRealTimeVal()

function StyleCustomInputs() {
    $(".checkbox, .checkbox input, .radio, .radio input").each(function(i){
	    if($(this).is('[type=checkbox],[type=radio]')){ 
		    
		    var inputElement = $(this);
			
		    // get the associated label using the input's id
		    var label = $('label[for='+inputElement.attr('id')+']');
			
		    //get type, for classname suffix 
		    var inputType = (inputElement.is('[type=checkbox]')) ? 'checkbox' : 'radio';
			
		    // wrap the input + label in a div 
		    $('<div class="custom-'+ inputType +'"></div>').insertBefore(inputElement).append(inputElement, label);
			
		    // find all inputs in this set using the shared name attribute
		    var allInputs = $('input[name='+inputElement.attr('name')+']');
			
		    // necessary for browsers that don't support the :hover pseudo class on labels
		    label.hover(
			    function(){ 
				    $(this).addClass('hover'); 
				    if(inputType == 'checkbox' && inputElement.is(':checked')){ 
					    $(this).addClass('checkedHover'); 
				    } 
			    },
			    function(){ $(this).removeClass('hover checkedHover'); }
		    );
			
		    //bind custom event, trigger it, bind click,focus,blur events					
		    inputElement.bind('updateState', function(){	
			    if (inputElement.is(':checked')) {
				    if (inputElement.is(':radio')) {				
					    allInputs.each(function(){
						    $('label[for='+$(this).attr('id')+']').removeClass('checked');
					    });		
				    };
				    label.addClass('checked');
			    }
			    else { label.removeClass('checked checkedHover checkedFocus'); }
										
		    })
		    .trigger('updateState')
		    .click(function(){ 
			    $(this).trigger('updateState'); 
		    })
		    .focus(function(){ 
			    label.addClass('focus'); 
			    if(inputType == 'checkbox' && inputElement.is(':checked')){ 
				    $(this).addClass('checkedFocus'); 
			    } 
		    })
		    .blur(function(){ label.removeClass('focus checkedFocus'); });
		    
		    inputElement.animate({ opacity: 0 }, 1000, function() {
				$(this).fadeIn(500);
			});

	    }
    });
}
