PlayerIdentity = function(_number, _guid){
	this.number = _number;
	this.guid = _guid;
};

PlayerIdentityManager = function(){
	var players = [];

	this.getPlayers = function(){
		return players;
	};

	this.generateGuid = function() {
	    var S4 = function() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    };
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};

	this.createPlayer = function(){
		var nextNumber = this.getNextNumberAvailable();
		if (!nextNumber) {
			return undefined;
		};
		var guid = this.generateGuid();
		var newPlayer = new PlayerIdentity(nextNumber, guid);
		players.push(newPlayer);
		return newPlayer;
	};

	this.getNextNumberAvailable = function(){
		if (!this.getPlayerByNumber(1)) {
			return 1;
		}else if (!this.getPlayerByNumber(2)) {
			return 2;
		};
		return undefined;
	}

	this.getPlayerByGuid = function(guid){
		return players.filter(function(item){ return item.guid === guid })[0];
	};

	this.getPlayerByNumber = function(number){
		return players.filter(function(item){ return item.number === number })[0];
	};

	this.countPlayers = function(){
		return players.length;
	};

	this.deletePlayerByGuid = function(guid){
		players = players.filter(function(element){
			return element.guid !== guid;
		});
	};
};

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

	this.play = function(playerNumber, x, y){
		if (gameState.nextPlayer === playerNumber && this.positionIsEmpty(x, y)){
			gameState.grid[x][y] = gameState.nextPlayer;
			this.togglePlayer();
		};
		return gameState;
	};
};

// getGameState = function(ip){
// 	return new GameState();
// };


module.exports = {
	GamePlay: GamePlay,
	GameState: GameState,
	PlayerIdentity: PlayerIdentity,
	PlayerIdentityManager: PlayerIdentityManager
};