describe("tic-tac-node", function() {

  var gameState, gamePlay;

  beforeEach(function() {
    gameState = new GameState();
    gamePlay = new GamePlay(gameState);
  });

  describe("when a new game starts", function() {

    it("there is a next player to play", function() {
      expect(gameState.nextPlayer === 1 || gameState.nextPlayer === 2).toBeTruthy();
    });

    it("the game grid is empty", function() {
      var sum = gameState.grid.reduce(function(seed,b){
        return seed+b.reduce(function(c,d){
          return c+d;
        }, 0);
      }, 0);
      expect(sum).toBe(0);
    });

    it("if user play in position 0:0, it's next player to play and position 0:0 is not empty", function() {
      var firstPlayer = gameState.nextPlayer;

      gamePlay.play(0, 0);
      expect(gamePlay.positionIsEmpty(0,0)).toBeFalsy();
      expect(gameState.nextPlayer === firstPlayer).toBeFalsy();
		});
	});







	// describe("wining condition", function() {

	// 	it("at the begining there is no winner", function() {
	// 	  expect(gamePlay.winner(gameState)).toBe(-1);
	// 	});

 //    it("if same player align verticaly 3 tokens there is a winner", function() {
 //      var firstPlayer = gameState.nextPlayer;
 //      gamePlay.play(0, 0); //p1     
 //      gamePlay.play(1, 1); //p2     
 //      gamePlay.play(0, 1); //p1     
 //      gamePlay.play(1, 0); //p2     
 //      gamePlay.play(0, 2); //p1 wins
 //      expect(gamePlay.winner()).toBe(firstPlayer);
 //    });

 //    it("if same player align horizontaly 3 tokens there is a winner", function() {
 //      var firstPlayer = gameState.nextPlayer;
 //      gamePlay.play(0, 0); //p1     
 //      gamePlay.play(1, 1); //p2     
 //      gamePlay.play(1, 0); //p1     
 //      gamePlay.play(0, 1); //p2     
 //      gamePlay.play(2, 0); //p1 wins
 //      expect(gamePlay.winner()).toBe(firstPlayer);
 //    });
	// });

});