GameState = function(){
	var nextPlayer = Math.floor(Math.random()*2)+1;
	var grid = [[0,0,0], [0,0,0], [0,0,0]];

	return {
		nextPlayer : nextPlayer,	
		grid : grid
	}

};

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

	this.play = function(x, y){
		if (this.positionIsEmpty(x, y)){
			gameState.grid[x][y] = gameState.nextPlayer;
			this.togglePlayer();
		};
		return gameState;
	};
};

getGameState = function(ip){
	return new GameState();
};


module.exports = {
	GamePlay: GamePlay,
	GameState: GameState,
	getGameState: getGameState
};