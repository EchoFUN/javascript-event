/**
 * event.
 *
 */

var test = document.getElementById('test'), test2 = document.getElementById('test2');

var clicksHandle = function() {
  console.log(arguments);
};

evt(test).bind('moves', function() {
  alert(1);
}).bind('clicks', clicksHandle).bind('lefts', function() {
  alert(3);
}).bind('clicks', function() {
  alert(4);
});


evt(test).unbind('clicks', clicksHandle);

evt(test).trigger('clicks', 1, 2, 3);

/*
 $(test).bind('clicks', function(){
 alert('222');
 });

 $(test).trigger('clicks');
 */
