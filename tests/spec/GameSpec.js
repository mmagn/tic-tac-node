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

      gamePlay.play(firstPlayer, 0, 0);
      expect(gamePlay.positionIsEmpty(0,0)).toBeFalsy();
      expect(gameState.nextPlayer === firstPlayer).toBeFalsy();
		});

	});

  describe("ui tests", function() {

    it("when a game starts, there is not playerClass", function() {
      var board = renderBoard(gameState);
      expect(board.find('.player1').length).toBe(0);
      expect(board.find('.player2').length).toBe(0);
    });

    it("when p1 played, there is a box checked for p1", function() {
      gameState.nextPlayer = 1;
      gamePlay.play(1, 2, 1);
      var board = renderBoard(gameState);
      expect(board.find('.player1').length).toBe(1);
      var box = JSON.parse(board.find('.player1').attr('data-position'));
      expect(box[0]).toBe(2);
      expect(box[1]).toBe(1);
      expect(board.find('.player2').length).toBe(0);
    });

    it("player can know who turn is", function() {
      gameState.nextPlayer = 1;
      var info = whoToPlay(gameState, {number:1});
      expect(info).toBe("It's your turn.");
    });

  });

  describe("playerIdentityManager tests", function() {

    it("a new player gets a GUID", function() {
      var pim = new PlayerIdentityManager();
      var newPlayer = pim.createPlayer();
      expect(newPlayer).toNotBe(undefined);
    });

    it("player counter is correct", function() {
      var pim = new PlayerIdentityManager();
      pim.createPlayer();
      expect(pim.countPlayers()).toBe(1);
      pim.createPlayer();
      expect(pim.countPlayers()).toBe(2);
    });

    it("getPlayer returns a player by his guid", function() {
      var pim = new PlayerIdentityManager();
      var newPlayer = pim.createPlayer();
      var retrievedPlayer = pim.getPlayer(newPlayer.guid);
      console.log(retrievedPlayer, newPlayer);
      expect(retrievedPlayer.number).toBe(newPlayer.number);
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