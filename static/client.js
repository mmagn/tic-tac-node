var updateBoard = function(gameState){
	var x=0, player=0;
	for(var i=0; i<gameState.length; i++){
		for(var j=0; j<gameState[i].length; j++){
			player = gameState[i][j];
			elements.eq(x).attr("class", player ? "player" + player : "");
			x++;
		}
	}
	console.log(output);
}