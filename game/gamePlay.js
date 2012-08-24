GamePlay = function(gameState){
	this.positionIsEmpty = function(x, y){
		return !(gameState.grid[x][y]);
	};

	this.togglePlayer = function(){
		gameState.nextPlayer = (gameState.nextPlayer === 1) ? 2 : 1;
	};
	
	this.winner = function(){
		throw "not implemented";
	};

	this.play = function(playerNumber, x, y){
		if (gameState.nextPlayer === playerNumber && this.positionIsEmpty(x, y)){
			gameState.grid[x][y] = gameState.nextPlayer;
			this.togglePlayer();
		};
		return gameState;
	};

	this.resetGame = function(){
		gameState.grid = [[0,0,0], [0,0,0], [0,0,0]];
		this.togglePlayer();
	};
};

module.exports = {
	GamePlay: GamePlay
};