// un joueur arrive il donne son nom, il rentre dans la liste


MultiPlayerManager = function(){
	var players = [];

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

};