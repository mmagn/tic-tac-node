var _ = typeof _ === "undefined" ? require("underscore") : _ ;

MultiPlayerManager = function(){
	var players = [];
	var boards = [];

	this.getPlayerByUsername = function(username){
		return _.find(players, function(item){
			return item.username == username; 
		});
	};

	this.getPlayers = function(){
		return players;
	};

	this.addPlayer = function(player){
		if (this.getPlayerByUsername(player.username)) {
			return false;
		};
		players.push(player);
		return true;
	};

	this.removePlayer = function(player){
		players = players.filter(function(item){
			return item.username !== player.username;
		});
		return players;
	};

	this.getPlayersAvailable = function(){
		return players.filter(function(item){
			return typeof item.board === "undefined";
		});
	};

};

module.exports = {
	MultiPlayerManager: MultiPlayerManager
};