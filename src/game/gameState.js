GameState = function(){
	var nextPlayer = Math.floor(Math.random()*2)+1;
	var grid = [[0,0,0], [0,0,0], [0,0,0]];

	return {
		nextPlayer : nextPlayer,	
		grid : grid
	}

};

module.exports = {
	GameState: GameState
};