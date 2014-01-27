/*
 * fmcombo - jQuery plugin 0.2
 *
 * Copyright (c) 2014 Fabio Michelucci <fmichelucci@gmail.com>
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */	
(function( $ ){
  	
    //Plugin namespace
    $.fn.fmcombo = function(options) {

        var opts = $.extend({}, $.fn.fmcombo.defaults, options);

        return this.change(function () {

            _self = $(this);
            
            var v = _self.val();

            if (v == opts.firstOption.Value || v == null || v == "") {

                removeOptionsFrom(opts.nextElement);
                removeOptionsFrom(opts.childs);
            }
            else {
                if ($.isArray(opts.source)) {

                    $(opts.nextElement).html($.fn.fmcombo.format(opts.firstOption, opts.source)).focus();

                } else if (typeof opts.source === "string") {

                    var url = opts.source + serialize(_self, opts.depElements)

                    self.xhr = $.ajax({
                        url: url,
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            if (data.length > 0) {
                                $(opts.nextElement).html($.fn.fmcombo.format(opts.firstOption, data)).focus();
                                opts.onAfterDataLoad.call(this);
                            }
                            else {
                                opts.onEmptySource.call(this);
                            }
                        },
                        error: function () { debug('Error ajax load'); }
                    });

                } else if ($.isFunction(opts.source)) opts.source.call($)
            }            
        });        
    };

    // Plugin defaults settings added as a property on plugin function.		
    $.fn.fmcombo.defaults = {
        source: null,
        depElements: [],
        nextElement: null,
        firstOption: { Value: '-1', Text: '-- select --' },
        onAfterDataLoad: function() { },
        onEmptySource: function () { },
        childs: []
    };
  
    $.fn.fmcombo.format = function(firstOption,source){
        var opt = '<option value="' + firstOption.Value + '">' + firstOption.Text + '</option>';
        $.each(source,function(key,value){
            opt += '<option value="'+source[key].Value+'">'+source[key].Text+'</option>';
        });		
        return opt;
    };
  
    //private function 
    function dataLoad(obj, elements, input, callback) {

        if ($.isArray(input)) {

            optionsData = input;

        } else if (typeof input === "string") {
            var url = input + serialize(obj, elements)
            self.xhr = $.ajax({
                url: url,
                dataType: "json",
                async: false,
                success: function (data) {

                    if (data.length > 0) {
                        optionsData = data;
                    }
                    else {
                        callback.call(this);
                    }
                },
                error: function () { debug('Error ajax load');}
            });

        } else if ($.isFunction(input)) input.call($)
    }

    function serialize(obj, elements) {
        var qs = '?' + obj.attr("name") + '=' + encodeURIComponent(obj.val());
        if ($.isArray(elements)) {
            $.each(elements, function (key, value) {

                $e = $(value);
                qs += '&' + $e.attr("name") + '=' + encodeURIComponent($e.val());
            });
        } else if (typeof elements === "string") {
            debug('Dep is string')
            qs += '&' + $(elements).attr("name") + '=' + encodeURIComponent($(elements).val())
        }
        return qs;
    }

    function removeOptionsFrom(elements) {

        if ($.isArray(elements)) {
            $.each(elements, function (key, value) {

                $(value).empty()
            });
        } else if (typeof elements === "string") {
            $(elements).empty()
        }
    }

    function debug(message) {
        if (window.console && window.console.log)
            window.console.log('fmCombo: ' + message);
    }
  

})( jQuery );