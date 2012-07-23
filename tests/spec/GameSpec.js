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

    beforeEach(function() {
      pim = new PlayerIdentityManager();
    });

    it("a new player gets a GUID", function() {
      var newPlayer = pim.createPlayer();
      expect(newPlayer).toNotBe(undefined);
    });

    it("player counter is correct", function() {
      pim.createPlayer();
      expect(pim.countPlayers()).toBe(1);
      pim.createPlayer();
      expect(pim.countPlayers()).toBe(2);
    });

    it("getPlayerByGuid returns a player by his guid", function() {
      var newPlayer = pim.createPlayer();
      var retrievedPlayer = pim.getPlayerByGuid(newPlayer.guid);
      expect(retrievedPlayer.number).toBe(newPlayer.number);
    });

    it("2 players have differents guid and number", function() {
      var newPlayer = pim.createPlayer();
      var newPlayer2 = pim.createPlayer();
      expect(newPlayer.guid).toNotBe(newPlayer2.guid);
      expect(newPlayer.number).toNotBe(newPlayer2.number);
    });

    it("it can not be more than 2 players", function() {
      var newPlayer = pim.createPlayer();
      var newPlayer2 = pim.createPlayer();
      var newPlayer3 = pim.createPlayer();
      expect(newPlayer).toBeDefined();
      expect(newPlayer2).toBeDefined();
      expect(newPlayer3).toBeUndefined();
    });

    it("remove player impact player number", function() {
      var newPlayer = pim.createPlayer();
      var newPlayer2 = pim.createPlayer();
      expect(pim.countPlayers()).toBe(2);
      pim.deletePlayerByGuid(newPlayer.guid);
      expect(pim.countPlayers()).toBe(1);
    });

    it("remove player function removes specified player not the other", function() {
      var newPlayer = pim.createPlayer();
      var newPlayer2 = pim.createPlayer();
      pim.deletePlayerByGuid(newPlayer.guid);
      expect(pim.countPlayers()).toBe(1);
      expect(pim.getPlayerByGuid(newPlayer2.guid)).toBeDefined();
      expect(pim.getPlayerByGuid(newPlayer.guid)).toBeUndefined();
    });

    it("after removing player, when a new player arrives he gets a different number", function() {
      var newPlayer = pim.createPlayer();
      var newPlayer2 = pim.createPlayer();
      pim.deletePlayerByGuid(newPlayer.guid);
      var newPlayer3 = pim.createPlayer();
      expect(newPlayer3).toBeDefined();
      expect(newPlayer3.number).toNotBe(newPlayer2.number);
    });

    it("getPlayerByNumber returns a player by his number", function() {
      var newPlayer = pim.createPlayer();
      var retrievedPlayer = pim.getPlayerByNumber(newPlayer.number);
      expect(newPlayer.guid).toBe(retrievedPlayer.guid);
    });

    it("getNextNumberAvailable returns a number available for a new player", function() {
      expect(pim.getNextNumberAvailable()).toBe(1);
      pim.createPlayer(); //player1
      expect(pim.getNextNumberAvailable()).toBe(2);
      pim.createPlayer(); //player2
      expect(pim.getNextNumberAvailable()).toBeUndefined();
    });

    it("a new player gets a number (1 or 2)", function() {
      var newPlayer = pim.createPlayer();
      var newPlayer2 = pim.createPlayer();
      expect(newPlayer.number).toBe(1);
      expect(newPlayer.number === 1 || newPlayer.number === 2).toBeTruthy();
      expect(newPlayer2.number).toBe(2);
      expect(newPlayer2.number === 1 || newPlayer2.number === 2).toBeTruthy();
      pim.deletePlayerByGuid(newPlayer.guid)
      var newPlayer1 = pim.createPlayer();
      expect(newPlayer1.number === 1 || newPlayer1.number === 2).toBeTruthy();
    });

  });

  describe("GamePlay tests", function(){

    it("when reseting a game, the grid is empty", function(){
      gamePlay.play(gameState.nextPlayer, 0, 0);
      gamePlay.play(gameState.nextPlayer, 0, 1);

      gamePlay.resetGame();
      var sum = gameState.grid.reduce(function(seed,b){
        return seed+b.reduce(function(c,d){
          return c+d;
        }, 0);
      }, 0);
      expect(sum).toBe(0);
    });

    it("when reseting a game, next player to play changes", function(){
      var np = gameState.nextPlayer;
      gamePlay.resetGame();
      expect(np).toNotBe(gameState.nextPlayer);
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