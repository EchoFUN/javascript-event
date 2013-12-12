/**
 * event.
 *
 */

var test = document.getElementById('test'); 

$(test).on('test', function() {
	
});
$(test).on('test2', function() {
	
});
$(test).on('test3', function() {
	
});


setTimeout(function() {
	$(test).trigger('test3');
}, 3000);


// wapper(test).bind('')
