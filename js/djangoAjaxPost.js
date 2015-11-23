// djangoAjaxPost.js
// A jQuery plugin that posts Django form content to server via AJAX
// version 1.0, Nov. 2015
// by Tom Symonds

(function($) {

    $.djangoAjaxPost = function(element, options) {

        var defaults = {
            postUrl: '',                                        // Post URL
            postData: '',                                       // Post data {}

            overlayMessage: 'Requesting...',                    // Overlay message during post
            overlaySuccess: 'Success',                          // Success message on overlay
            overlayGif: 'img/loading.gif',                   // Loading gif location
            successMessage: 'Thank you.',                       // Replace form text with success message

            prependOverlayTo: 'body',                           // Prepend element to

            initalDelay: 800,                                   // This delay shows the overlay message for this duration
            successDelay: 300,                                  // This delay shows the success message for this duration
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
                
            // Create overlay HTML if does not already exist
            if ($('#overlay').length == 0){
                var overlayHTML = '<div class="ajaxOverlay"><div><img src="' + plugin.settings.overlayGif + '"/><span class="ajaxOverlayText">' + plugin.settings.overlayMessage + '</span></div></div>';
                var overlay = $(overlayHTML);
                overlay.prependTo($(plugin.settings.prependOverlayTo));
            }

            // As per Django documentation
            // https://docs.djangoproject.com/en/1.7/ref/contrib/csrf/
            $.ajaxSetup({ 
                beforeSend: function(xhr, settings) {
                    function getCookie(name) {
                        var cookieValue = null;
                        if (document.cookie && document.cookie != '') {
                            var cookies = document.cookie.split(';');
                            for (var i = 0; i < cookies.length; i++) {
                                var cookie = jQuery.trim(cookies[i]);
                                // Does this cookie string begin with the name we want?
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    } 
                    return cookieValue;
                    }
                    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        // Only send the token to relative URLs i.e. locally.
                        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                    }
                } 
            });

            // Make the AJAX request
            $.ajax({
                url : plugin.settings.postUrl, 
                data : plugin.settings.postData, 
                type : "POST", 

                success : function(json) {                     
                    // set time out to delay the overlay text, so user can see it
                    setTimeout(function () {
                        // update the overlay text to show the success message
                        $('.ajaxOverlayText').text(plugin.settings.overlaySuccess);

                        // set time out to show success message
                        setTimeout(function () {
                            // hide the overlay 
                            overlay.hide();
                            // set the success message in the form
                            $element.after(plugin.settings.successMessage)
                            // hide the rest of the form
                            $element.hide();

                        }, plugin.settings.successDelay);
                    
                    }, plugin.settings.initalDelay);
                },

                error : function(xhr,errmsg,err) {
                    console.log(xhr.status + ": " + xhr.responseText);
                }
            });
 
        }

        plugin.init();

    }

    $.fn.djangoAjaxPost = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('djangoAjaxPost')) {
                var plugin = new $.djangoAjaxPost(this, options);
                $(this).data('djangoAjaxPost', plugin);
            }
        });

    }

})(jQuery);


