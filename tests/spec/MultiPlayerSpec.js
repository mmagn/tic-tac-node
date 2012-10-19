describe("multi player manager", function() {

  var multiPlayerManager, player1;

  beforeEach(function() {
    multiPlayerManager = new MultiPlayerManager();
    player1 = {
      username: 'toto'
    };
    player2 = {
      username: 'titi'
    };
  });

  describe("when multi player manager is initialized", function() {

    it("there is nobody connected", function() {
      expect(multiPlayerManager.getPlayers().length).toBe(0);
    });
    
  });

  describe("when a player is connecting", function() {
    var result1;

    beforeEach(function() {
      result1 = multiPlayerManager.addPlayer(player1);
    });

    it("he's in server's list", function() {
      expect(multiPlayerManager.getPlayers()[0].username).toBe('toto');
    });

    it("he gets 'true' if it succeeded", function() {
      expect(multiPlayerManager.getPlayers().length).toBe(1);
      expect(result1).toBe(true);
    });

    it("he can be searchable", function() {
      expect(multiPlayerManager.getPlayerByUsername('toto').username).toBe('toto');
      expect(multiPlayerManager.getPlayerByUsername('titi')).toBeFalsy();
    });

    it("if the username is already used, subscription failed and he gets a 'false'", function() {
      result1b = multiPlayerManager.addPlayer(player1);
      expect(multiPlayerManager.getPlayers().length).toBe(1);
      expect(result1b).toBe(false);
    });

    it("if the username isn't used, subscription succeded and he gets a 'true'", function() {
      result2 = multiPlayerManager.addPlayer(player2);
      expect(multiPlayerManager.getPlayers().length).toBe(2);
      expect(result2).toBe(true);
    });

    it("he has no board and is available for playing", function() {
      expect(result1.board).toBe(undefined);
      var gamers = multiPlayerManager.getPlayersAvailable();
      expect(gamers.length).toBe(1);
    });

    describe("when a player is disconnecting", function() {

      it("he's removed from the list", function() {
        multiPlayerManager.removePlayer(player1);
        expect(multiPlayerManager.getPlayers().length).toBe(0);
      });
      
    });
    
  });

});