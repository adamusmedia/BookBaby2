


//(function($) {
//$.headerGsuggest = function(settings){ 

//$.headerGsuggest.config = {
//	'debug': false,
//	'url': 'Suggest.aspx',
//	'size': 10,
//	'cacheenabled': true,
//	'cacheaggressive': false,
//	'cachefoward':false, //true - complete cache dataset, false - incomplete cache datasets
//    'casesensitive': false,
//	'sort': true,
//	'css0': {'position':'absolute', 'z-index':'10000000000', 'display':'block'},
//	'css': {'text-align' : 'left', 'background-color':'#ffffff', 'border':'solid 1px #000000', 'margin':'0px', 'font-size':'12px', 'font-family':"Arial, Helvetica, sans-serif", 'cursor':'pointer', 'color':'#313847', 'padding':'0px'},
//	'highlight': '#E1E1E1'
//	};

//if (settings) $.extend($.headerGsuggest.config, settings);

//var fillok = true;
//var cacheinit = true;

//var timerstart = null;
//var timerend = null;

//$.headerGsuggest.cachedata = [];
//$.headerGsuggest.cachekey = "";

//$.headerGsuggest.synctext = false;
//$.headerGsuggest.mouseoverok = false;
//$.headerGsuggest.mousepos = "";

//$.headerGsuggest.setcase = 
//    function(val){
//        if ($.headerGsuggest.config.casesensitive)
//            return val;
//        else
//            return val.toLowerCase();
//    };

//$.headerGsuggest.keydown =
//    function(obj, e){ 
//		clearTimeout($.headerGsuggest.suggestDelay);

//        if (e.which == 38 || e.which == 40){
//            $(obj).next().children("div:eq("+$(obj).attr("suggestPos")+")").blur();
        
//            switch (e.which){
//                case 38: //up
//                    if (parseInt($(obj).attr("suggestPos"))-1 < -1)
//                        $(obj).attr("suggestPos", $(obj).attr("suggestTtl"));
//                    else
//                        $(obj).attr("suggestPos", Math.max(-2, parseInt($(obj).attr("suggestPos"))-1));
//                    break;
                    
//                case 40: //down
//                     if (parseInt($(obj).attr("suggestPos"))+1 > parseInt($(obj).attr("suggestTtl")))
//                        $(obj).attr("suggestPos", "-1");
//                     else   
//                        $(obj).attr("suggestPos", Math.min($(obj).attr("suggestTtl"), parseInt($(obj).attr("suggestPos"))+1));
        
//                     break;
//            }
        
//            $.headerGsuggest.synctext = true;
           
//            $(obj).next().children("div:eq("+$(obj).attr("suggestPos")+")").focus();
//        } else if (e.which == 13){
//           if ($(obj).attr("nosubmit") != null){
//               //$(obj).next().hide();
//               return false;           
//           }    
//        }
//    };
    
//$.headerGsuggest.keyup = 
//    function(obj){
//	   var objval = obj.value;
	   
//	   //console.dir($.headerGsuggest.cachedata);
//	   if ($.headerGsuggest.config.debug)timerstart = new Date().getTime();
	  
//       if (objval == $(obj).attr("suggestLast")) return;

//	   if (objval.length == 0){
//            $(obj).attr("suggestLast", objval);
//            $(obj).next().hide();
//            return;
//        } 
		
//       $(obj).attr("suggestLast", objval);
       
//       var method = obj.form.name + '_' + obj.name;
//       var surl = $.headerGsuggest.config.url + "?method="+method+"&value="+objval+"&callback=?"
//       var data, datat;

//	   //fill() *must* be single threaded via fillok	       
//       function fill(data){
//	   	   while(!fillok){};
//		   fillok = false;
//		   $(obj).next().empty();
//		   //$(obj).next().hide(); *we dont need to hide it unless the results are empty
	   
//	   		if ($.headerGsuggest.config.sort) data.sort();
//	   		// modified by ctk
//	   		// added positioning code to
//	   		// account for page resizing
//            // end mod
            
//            $(obj).attr("suggestTtl", Math.min($.headerGsuggest.config.size, data.length));
//            for (i = 0; i < data.length; i++){
//                $(obj).next().append("<div style=\"padding: 3px;\">" + data[i].substr(0, objval.length) + "<strong>" + data[i].substring(objval.length) + "</strong></div>");
//                if ( i == $.headerGsuggest.config.size ) break;
//            }
            
//            if (i > 0 && !(data.length == 1 && $.headerGsuggest.setcase(data[0]) == $.headerGsuggest.setcase(objval))){
//                $(obj).attr("suggestPos", "-1");
//                //$(obj).next().slideDown("fast");
//				$.headerGsuggest.synctext = false;
//                $.headerGsuggest.mouseoverok = false;
//				$(obj).next().show();
//            } else {
//				$(obj).next().hide();
//			}
			
//			fillok = true;
//       }
       		
//	   //cache roll back -force cache forward if ttl suggest items less than max
//		if (objval.indexOf($.headerGsuggest.cachekey) != 0 || (!$.headerGsuggest.config.cacheforward && !($(obj).attr("suggestTtl") < $.headerGsuggest.config.size))){ 
//	   	   $.headerGsuggest.cachekey = $.headerGsuggest.setcase(objval);
//	   }
//	   //console.log("key: " + $.headerGsuggest.cachekey);
//       if ($.headerGsuggest.cachedata[$(obj).attr("id")+$.headerGsuggest.cachekey] || ($(obj).attr("suggest_value") != null && $(obj).attr("suggest_value").length > 0)){
//		   if (!$.headerGsuggest.cachedata[$(obj).attr("id")+$.headerGsuggest.cachekey] || !$.headerGsuggest.config.cacheenabled){
//		   	   $.headerGsuggest.config.cacheforward = true;
//		   	   datat = eval($(obj).attr("suggest_value"));
//			   if ($.headerGsuggest.config.debug)$("#_debug").html("CACHE INIT<br>"+datat.join("<br>"));
//		   }else{
//		   	   datat = $.headerGsuggest.cachedata[$(obj).attr("id")+$.headerGsuggest.cachekey];	
//			   if ($.headerGsuggest.config.debug)$("#_debug").html(datat.join("<br>"));	   
//		   }
		   
	   	
//           data = [];
//           $.each(datat, function(i, val){
//		   		if ($.headerGsuggest.setcase(val).indexOf($.headerGsuggest.setcase(objval)) == 0){
//                	data.push(val);
//                }
//           })

//		   if ($.headerGsuggest.config.cacheenabled){ $.headerGsuggest.cachedata[$(obj).attr("id")+$.headerGsuggest.setcase(objval)] = data; $.headerGsuggest.cachekey = $.headerGsuggest.setcase(objval)}
//           fill(data); 
//       }else{
//           $.getJSON(surl, function(data){if ($.headerGsuggest.config.cacheenabled){ $.headerGsuggest.cachedata[$(obj).attr("id")+$.headerGsuggest.setcase(objval)] = data; $.headerGsuggest.cachekey = $.headerGsuggest.setcase(objval); if ($.headerGsuggest.config.debug)$("#_debug").html("CACHE INIT<br>"+$.headerGsuggest.cachedata[$(obj).attr("id")+$.headerGsuggest.setcase(objval)].join("<br>"));} fill(data)}); 	   
//       }    

//	   if ($.headerGsuggest.config.debug){
//	   	  timerend = new Date().getTime();
//	      $("#_debug_timer").html(timerend-timerstart);
//	   }
	   
//    };     

//    $("#header-search #SearchTerms").each(function (i) {
//        if (this.id == null || this.id == '')
//            $(this).attr("id", "_g§µggê§†_"+i)
            
//        InitHeaderSuggest("#" + this.id)}
//    );
    
//    function InitHeaderSuggest(id) {
//        var suggest_id = "Header_suggestBox";
//        var suggest_idChildren = "#" + suggest_id + " > *";

//        $(id).attr("autocomplete", "off");
//		$(id).keyup(function(e){if (e.which == 27){ $(this).blur(); $(this).focus(); if (!$.headerGsuggest.config.cacheaggressive){$.headerGsuggest.cachedata=[]; $.headerGsuggest.cachekey=""}} else if (e.which < 37 || e.which > 40) {$.headerGsuggest.suggestDelay = setTimeout("$.headerGsuggest.keyup(document.getElementById('"+$(this).attr("id")+"'))", (!!$.headerGsuggest.cachedata[$(this).attr("id")+$.headerGsuggest.cachekey])?50:(e.which == 13)?0:100);}});
//		$(id).click(function(){$(this).blur(); $(this).focus()});
//        $(id).blur(function(){$.headerGsuggest.mouseout = false; $(this).next().hide("slow"); $(this).attr("suggestPos", "-1");});
//        $(id).attr("suggestPos", "-1");
//        $(id).keydown(function(e){return $.headerGsuggest.keydown(this, e)});
        
//        //set event handlers for suggest-box | no propgation
//        $(suggest_idChildren).live("mouseover", function(e){if (!$.headerGsuggest.mouseoverok) return false; $(this).parent().children("div:eq("+$(this).parent().prev().attr("suggestPos")+")").blur(); $(this).parent().prev().attr("suggestPos", $(this).prevAll().length); $(this).focus(); $.headerGsuggest.synctext=true; return false}); 
//        $(suggest_idChildren).live("mouseout", function(){$(this).blur(); return false;});
//		$(suggest_idChildren).live("focus", function(){$(this).css("background-color", $.headerGsuggest.config.highlight); if($.headerGsuggest.synctext){$(this).parent().prev().attr("value", $(this).text())}; return false;});
//        $(suggest_idChildren).live("blur", function(){$(this).css("background-color", $(this).parent().css("background-color")); $(this).parent().prev().attr("value", $(this).parent().prev().attr("suggestLast")); return false;});
//        $(suggest_idChildren).live("click", function(){$(this).parent().prev().attr("suggestLast", $(this).text()); $(this).blur(); $(this).parent().prev().focus(); return false;});
    
//        //create suggest-box, set width, and position
//        //$(id).after("<div id=\""+suggest_id+"\" style=\"display:none\"></div>");
//		//$(id).next().css($.headerGsuggest.config.css0);
//        //$(id).next().css($.headerGsuggest.config.css);
//        //$(id).next().width('237px');
//        //$(id).next().css("right", '41px');
//        //$(id).next().css("top", '26px');
        
//        $(id).after("<div id=\"" + suggest_id + "\" style=\"display:block\"></div>");
//        $(id).next().css($.headerGsuggest.config.css0);
//        $(id).next().css($.headerGsuggest.config.css);
//        $(id).next().width('688px');
//        $(id).next().css("right", '41px');
//        $(id).next().css("top", '80px');

//    };
//};
//})(jQuery);

//jQuery(document).ready(function(){
//   $(this).mousemove(function(e){
	  
//	  if ($.headerGsuggest.mousepos != e.pageX+'-'+e.pageY){
//      	$.headerGsuggest.synctext = true;
//        $.headerGsuggest.mouseoverok = true;
//	  }
//	  $.headerGsuggest.mousepos = e.pageX+'-'+e.pageY;
//   }); 
//})

////InitHeaderSuggest
//jQuery(document).ready(function(){jQuery.headerGsuggest({ 'debug': true, 'url': '/WebSearch/Suggest.aspx' })});

///*
//I have not decided if I want to add text-range support for autocomplete; my intent
//was to memic the behavior of googles suggest and I feel that I have done this. However
//I may decided to implement this as an optional setting in the future... */