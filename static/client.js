
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
};

var whoToPlay = function(identity, gameState){
	return identity.number === gameState.nextPlayer ? "It's your turn." : "Opponent turn.";
};

$(function(){
	var identity,
		gameState,
		$gameBoard = $('#gameBoard'),
		$gameInfo = $('#gameInfo');

    $gameBoard.on('click', 'a', function(){
        var position = JSON.parse($(this).attr('data-position'));
        if(identity.number == gameState.nextPlayer){
        	socket.emit('move', position);
        };
    });

	// Socket section

	var socket = io.connect(location.host);

	socket.emit('new');

	socket.on('updateGame', function(data){
		gameState = data.gameState;
		if (data.identity) {
			identity = data.identity;
			$('#gameBoard').addClass('player'+identity.number);
		};

		// console.log('updateGame > data', data);
		$gameInfo.html(whoToPlay(identity, gameState));
	    $gameBoard.html(renderBoard(gameState));
	});
    
});