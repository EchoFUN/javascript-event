/**
 * event.
 *
 */

var test = document.getElementById('test'), test2 = document.getElementById('test2');

evt(test).bind('click', function() {
  alert('I am !');
});

evt(test).unbind('click');

/*
$(test).bind('clicks', function(){
  alert('222'); 
});

$(test).trigger('clicks');
*/
