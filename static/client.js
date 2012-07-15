
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
	var $gameBoard = $('#gameBoard');

    $gameBoard.on('click', 'a', function(){
        console.log(this,$(this));
    });

	// Socket section

	var socket = io.connect(location.host);

	socket.emit('new');
	
	socket.on('initGame', function(data){
	    $gameBoard.html(renderBoard(data.gameState));
	});
    
});