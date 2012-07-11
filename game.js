GameStatus = function(){
	var nextPlayer = Math.floor(Math.random()*2)+1;
	var grid = [[0,0,0], [0,0,0], [0,0,0]];

	return {
		nextPlayer : nextPlayer,	
		grid : grid
	}

};

GamePlay = function(gamestatus){

	this.positionIsEmpty = function(x, y){
		return !gamestatus.grid[x][y];
	};

	this.togglePlayer = function(){
		gamestatus.nextPlayer = (gamestatus.nextPlayer === 1) ? 2 : 1;
	};

	this.play = function(x, y){
		if (this.positionIsEmpty(x, y)){
			gamestatus.grid[x][y] = gamestatus.nextPlayer;
			this.togglePlayer();
		};
		return gamestatus;
	};
};