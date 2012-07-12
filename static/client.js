$(function(){
	$('#gameBoard').find('a').click(function(){

		console.log(this,$(this));
	});
});

var socket = io.connect(location.host);
socket.emit('new');
socket.on('message', function(data){
    $('#info').html(data.message);
});