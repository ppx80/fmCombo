/*
 * fmcombo - jQuery plugin 0.1pre
 *
 * Copyright (c) 2011 Fabio Michelucci <fmichelucci@gmail.com>
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */	
(function( $ ){
	
  var settings = {
	url: "",    
	depElement: "",
	nextElement: "",
	firstOption: "-- select --",
	firstValue: "-1",
	stylize: false,
	formatResult: function(v,o){return '<option value="'+v+'">'+o+'</option>';}
	  
  };	

  var methods = {
    init : function(options) {        
      
	    if ( options ) {$.extend( settings, options );}
		$(this).change(function(){
	        $select = $(this);
	        
	        if (settings.nextElement.length > 0)
	        {
				$next = $('#'+options.nextElement);								
		        qs = options.url+'?'+serialaizeParentsValue($select,options.depElement);
		        debug(qs+' - '+options.nextElement );
				getJsonOption($next,qs) 
			}
		});   
	},
	setOption: function(url){
		return this.each(function(){
			$select = $(this);
			getJsonOption($select,url)
		});
	},
    reset : function(elementList) { 
	    if(typeof elementList !== "undefined"){  
			if(elementList.indexOf(',') == -1){ 
				$('#'+elementList).empty();
			}else{
				a = elementList.split(',');
				for(var i=0; i<a.length;i++){$('#'+a(i)).empty();}
			}
		}		    
	}
  };
  //Namespace del plugin
  $.fn.fmcombo = function(method) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.fmcombo' );
    }    
  
  };
  
  //private function
  function getJsonOption(obj,url) {
	    obj.empty();
		var opt='<option value="'+settings.firstValue+'">'+settings.firstOption+'</option>';
		$.getJSON(url,function(data){
				$.each(data,function(key,value){
					opt += settings.formatResult(data[key].v,data[key].o)
				});	
				obj.html(opt);							
		}); 
		  
  }
  function serialaizeParentsValue(obj,str){
	var qs = obj.attr("name")+'='+encodeURIComponent(obj.val());  
	if(typeof str !== "undefined"){  
		if(str.indexOf(',') == -1){ 
			$e = $('#'+str);
			qs += '&'+$e.attr("name")+'='+encodeURIComponent($e.val());
		}else{
			arr = str.split(',');
			for(var i=0; i<arr.length;i++){
		
				$el = $('#'+arr(i));
				qs += '&'+$el.attr("name")+'='+encodeURIComponent($el.val());
			}
		}
	}
	return qs;
  }
  //private function for debugging
  function debug(message) {
    if (window.console && window.console.log)
      window.console.log('PpxCombo: ' + message);
  }
  

})( jQuery );