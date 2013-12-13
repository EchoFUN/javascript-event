/**
 * event.
 *
 */

var test = document.getElementById('test'), test2 = document.getElementById('test2');

evt(test).bind('click', function() {
  alert('I am !');
});

// evt(test).trigger('click');

evt(test2).bind('show', function() {
  alert('I am 2 !');
});

evt(test2).unbind('show');
evt(test2).trigger('show');

/*
$(test).bind('clicks', function(){
  alert('222'); 
});

$(test).trigger('clicks');
*/
