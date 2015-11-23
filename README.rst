djangoAjaxPost
=====================

A simple plugin I've made, as I found myself reusing this code time and time again. I use for Django forms, as due to the CSRF token, you have to add in a few extra lines of code to make an AJAX post.

More info here: https://docs.djangoproject.com/en/1.8/ref/csrf/

I've adapted the plugin to overlay the page with a loading gif, and remove form buttons on successful post.


Quick Start
-----------

Load jQuery::

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

Load js file::

  <script src="djangoAjaxPost.min.js"></script>

Link style::

  <link rel="stylesheet" href="djangoAdminPostStyle.css">


Example usage::

  $(function() { 
    $('#myForm').on('submit', function(event){
      event.preventDefault();
      formData = {
        'name' : $('input[name=name]').val(),
        'email' : $('input[name=email]').val()
      }
      $(this).djangoAjaxPost({
        postUrl: myPostUrl,
        postData: formData
      });
    });
  });


API
-----------

The below are the default settings::

  postUrl: '',                            // Post URL
  postData: '',                           // Post data {}
  overlayMessage: 'Requesting...',        // Overlay message during post
  overlaySuccess: 'Success',              // Success message on overlay
  overlayGif: '../img/loading.gif',       // Loading gif location
  successMessage: 'Thank you.',           // Replace form text with success message
  prependOverlayTo: 'body',               // Prepend element to
  initalDelay: 800,                       // This delay shows the overlay message for this duration
  successDelay: 300,                      // This delay shows the success message for this duration

