var ticTacNode = {};

ticTacNode.renderBoard = function(gameState){
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

ticTacNode.whoToPlay = function(identity, gameState){
	return identity.number === gameState.nextPlayer ? "it's your turn." : "it's your opponent to play.";
};

$(function(){
	
	/*var identity,
		gameState,
		$gameBoard = $('#gameBoard'),
		$gameInfo = $('#gameInfo'),
		$resetButton = $('#reset');

    $gameBoard.on('click', 'a', function(){
        var position = JSON.parse($(this).attr('data-position'));
        if(identity.number == gameState.nextPlayer){
        	socket.emit('move', position);
        };
    });

    $resetButton.on('click', function(){
    	if(confirm('Do you want to reset the game ?')){
    		socket.emit('reset');
    	}
    });*/

	// Socket section

	var socket = io.connect();

	var playerName = "";

	while(!playerName){
		playerName = prompt('Player name','');
	}

	/*$gameInfo.html(playerName).append(', <small></small>');*/

	socket.emit('new', playerName);

	socket.on('updatePlayers', function(players){
		console.log(players);
	});

	/*socket.on('updateGame', function(data){
		gameState = data.gameState;
		if (data.identity) {
			identity = data.identity;
			$('#gameBoard').addClass('player'+identity.number);
		};

		// console.log('updateGame > data', data);
		$gameInfo.find('small').html(ticTacNode.whoToPlay(identity, gameState));
	    $gameBoard.html(ticTacNode.renderBoard(gameState));
	});*/
    
});