/**
 * event.
 *
 */

var test = document.getElementById('test'), test2 = document.getElementById('test2');

evt(test).bind('clicks', function(data) {
  alert('I am !');
});

evt(test).trigger('clicks', 1, 2, 3);

/*
$(test).bind('clicks', function(){
  alert('222'); 
});

$(test).trigger('clicks');
*/
