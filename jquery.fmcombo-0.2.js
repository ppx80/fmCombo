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


  // Plugin defaults settings added as a property on plugin function.		
  $.fn.fmcombo.defaults = {
      source: null,    
	  depElements: [],
	  nextElement: null,
	  firstOption: { Value:'-1',Text:'-- select --'},
	  afterLoad: function () { },
	  onEmptySource: function () { },
	  childs:[]  
  };

  var opts = $.extend({}, $.fn.fmcombo.defaults, options); 
  	  	   	      	   	   	
  var $fmcombo = {
	  
	source: null,  				
	
	formatResult: function(data){
		  var opt='<option value="'+settings.firstValue+'">'+settings.firstOption+'</option>'
		  $.each(data,function(key,value){
				opt += '<option value="'+data[key].Value+'">'+data[key].Text+'</option>';
			});		
		  return opt;
	},
		
	initSource: function(obj,elements,request){	
			
	  	   if($.isArray(request)){
		  	  
		  	  $fmcombo.source = $fmcombo.formatResult(request);
		  	   
		   } else if (typeof request === "string"){
			   var url = request+$fmcombo.serialize(obj,elements)
			   
				self.xhr = $.ajax({
					url: url,
					dataType: "json",
					async: false,
					success: function (data) {

					    if (data.length > 0) {
					        $fmcombo.source = $fmcombo.formatResult(data);
					    }
					    else
					    {
					        settings.onEmptySource.call(this);
					    }
					},
					error: function(){alert('Si sono verificati errori!')}
				});
							   
		   } else if ($.isFunction(settings.source))settings.source.call($)  
	},  
	  
    init : function(options) {        
			     	       		
		if ( options ) {$.extend(settings, options );}
		
		$(this).change(function(){					   			
			$sel = $(this);
			//debug($sel.attr("name"));
			$fmcombo.initSource($sel, options.depElements, options.source);    	    
			$(options.nextElement).html($fmcombo.source).focus();	
			$fmcombo.sanitazeChilds(options.childs);
		    //$.isFunction(options.afterSelect)? options.afterSelect.call($): null	
			settings.afterSelect.call(this);
		});
	},
	
	serialize: function(obj,elements){
		var qs = '?'+obj.attr("name")+'='+encodeURIComponent(obj.val());	
		if($.isArray(elements)){
			$.each(elements, function(key,value){
				
				$e = $(value);
				qs += '&'+$e.attr("name")+'='+encodeURIComponent($e.val());
				});
		} else if (typeof elements === "string"){
			debug('Dep is string')
			qs += '&'+$(elements).attr("name")+'='+encodeURIComponent($(elements).val())
		} 
		return qs;	
	},
	
	sanitazeChilds: function(elements){
	
		if($.isArray(elements)){
			$.each(elements, function(key,value){
				
				$(value).empty()
				});
		} else if (typeof elements === "string"){
			$(elements).empty()
		}
		
	}	
  };
  //Plugin namespace
  $.fn.fmcombo = function(method) {

    // Method calling logic
    if ( $fmcombo[method] ) {
      return $fmcombo[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {	   
      return $fmcombo.init.apply( this, arguments );      
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.fmcombo' );
    }    
  
  };
  
  $.fn.fmcombo.format = function(data){
  	var opt='<option value="'+settings.firstValue+'">'+settings.firstOption+'</option>'
		  $.each(data,function(key,value){
				opt += '<option value="'+data[key].Value+'">'+data[key].Text+'</option>';
			});		
		  return opt;
  };
  
  //private function for debugging
  function debug(message) {
    if (window.console && window.console.log)
      window.console.log('fmCombo: ' + message);
  }
  

})( jQuery );