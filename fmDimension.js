/*
 * fmDimension - jQuery plugin 0.1pre
 *
 * Copyright (c) 2013 Fabio Michelucci <fmichelucci@gmail.com>
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */	
(function( $ ){
	
	var settings = {      
		dimension: 'h',          //Per default la dimensione da calcolare è la larghezza w, h: height, w&h entambe le dimensioni
		depElements: { horizontal:[], vertical:[]},          //Elementi da considerare durante il calcolo
		perfercScrollbar: false		
	};
		      	   	   	
	var $fmdimension = {

		reference: $(window),

		computeHeight: function(ref, vertical ){

			var $h = ref.height(), l = vertical.length, h = 0;

			if ( l > 0 ) {
				for (var i = 0; i < l; i++) {
					h += $(vertical[i]).innerHeight();
				}
			}
			return $h-h;
			  
		},

		computeWidth: function( ref, horizontal ){

			var $w = ref.width(), l = horizontal.length, w = 0;

			if ( l > 0 ) {
				for (var i = 0; i < l; i++) {
					w += $(horizontal[i]).innerWidth();
				}
			}
			return $w-w;
		},

		setDimension: function( element, options ){

			if ( options ) { $.extend( settings, options )};

			switch( options.dimension ) { 

				case 'w': 
					element.innerWidth( $fmdimension.computeWidth( $fmdimension.reference, options.depElements.horizontal ) -15);
				break; 

				case 'h': 
					element.innerHeight( $fmdimension.computeHeight( $fmdimension.reference, options.depElements.vertival ) );
				break;  

				case 'w&h': 
					element.innerHeight( $fmdimension.computeHeight( $fmdimension.reference, options.depElements.vertical ) );
					element.innerWidth( $fmdimension.computeWidth( $fmdimension.reference, options.depElements.horizontal ) );
				break;  

				default: 
					element.innerHeight( $fmdimension.computeHeight( $fmdimension.reference, options.depElements.vertical ) ); 
			}

		},

		run: function( options ){

			var _self = $(this);

			$fmdimension.setDimension( _self, options );
			$fmdimension.reference.resize( function(){
				$fmdimension.setDimension( _self, options );
			});

			return _self;
		}

	};
  	//Plugin namespace
	$.fn.fmdimension = function(method) {

		// Method calling logic
		if ( $fmdimension[method] ) {

			return $fmdimension[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));

		} else if ( typeof method === 'object' || ! method ) {	

			return $fmdimension.run.apply( this, arguments );    

		} else {

			$.error( 'Method ' +  method + ' does not exist on jQuery.fmdimension' );
		}    

	};
    
})( jQuery );