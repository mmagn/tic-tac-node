
var renderBoard = function(gameState){
	var x=0, player=0, board = $('<p>');

	for(var i=0; i<gameState.grid.length; i++){
		for(var j=0; j<gameState.grid[i].length; j++){

			var elt = $('<a>');
			player = gameState.grid[i][j];
			elt.addClass(player ? "player" + player : "");
			elt.attr("data-position", "["+i+","+j+"]");
			board.append(elt);
			x++;

		}
	}
	return board;
}

$(function(){
	var $gameBoard = $('#gameBoard'),
		$gameInfo = $('#gameInfo');

    $gameBoard.on('click', 'a', function(){
        var position = JSON.parse($(this).attr('data-position'));
        
        socket.emit('move', position);
    });

	// Socket section

	var socket = io.connect(location.host);

	socket.emit('new');

	socket.on('updateGame', function(gameState){
		console.log('updateGame > grid', gameState.grid);
		$gameInfo.html('Next player: ' + gameState.nextPlayer);
	    $gameBoard.html(renderBoard(gameState));
	});
    
});