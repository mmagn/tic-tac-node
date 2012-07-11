describe("tic-tac-node", function() {

  var gameStatus, gamePlay;

  beforeEach(function() {
    gameStatus = new GameStatus();
    gamePlay = new GamePlay(gameStatus);
  });

  describe("when a new game starts", function() {

    it("there is a next player to play", function() {
      expect(gameStatus.nextPlayer === 1 || gameStatus.nextPlayer === 2).toBeTruthy();
    });

    it("the game grid is empty", function() {
      var sum = gameStatus.grid.reduce(function(a,b){
        return a+b.reduce(function(c,d){
          return c+d;
        }, 0);
      }, 0);
    });

    it("if user play in position 0:0, it's next player to play and position 0:0 is not empty", function() {
      var firstPlayer = gameStatus.nextPlayer;

      gamePlay.play(0, 0);
      expect(gamePlay.positionIsEmpty(0,0)).toBeFalsy();
      expect(gameStatus.nextPlayer === firstPlayer).toBeFalsy();
    });

  });

});