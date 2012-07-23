var application_root = __dirname,
    express = require("express"),
    path = require("path");
var app = express.createServer(),
    io = require('socket.io').listen(app),
    game = require('./game');

console.log("game : ", game);

app.configure(function(){
  // the bodyParser middleware parses JSON request bodies
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use("/static", express.static(path.join(application_root, "static")));
  // app.use("/static", express.static(__dirname + '/static'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('views', path.join(application_root, "views"));
  app.set('view engine', 'ejs')
});

app.get('/', function(req, res){
    var locals = {};
    locals.title = "tic-tac-node";
    res.render('layout', locals);
});

app.listen(3000);

var counter = 0,
    playerIdentityManager = new PlayerIdentityManager(),
    currentGameState = new GameState();

io.sockets.on('connection', function (socket) {

  var currentGamePlay,
      currentPlayer;

  var updateClient = function(){
    var data = {
      gameState: currentGameState
    };
    socket.broadcast.emit('updateGame', data);
    data.identity = socket.handshake.identity
    socket.emit('updateGame', data);
  };

  socket.on('new', function () {
    var currentPlayer = playerIdentityManager.createPlayer();
    if (currentPlayer) {
      var ip = socket.handshake.address.address;
      socket.handshake.identity = currentPlayer;

      updateClient();
    }else{
      console.log("to much players"); // to fix
    }
  });

  socket.on('move', function (position) {
    currentGamePlay = new GamePlay(currentGameState);
    currentGamePlay.play(socket.handshake.identity.number, position[0], position[1])
    updateClient();
  });

  socket.on('reset', function () {
    currentGamePlay = new GamePlay(currentGameState);
    currentGamePlay.resetGame();
    updateClient();
  });

  socket.on('disconnect', function () {
    if(socket.handshake.identity){
      playerIdentityManager.deletePlayerByGuid(socket.handshake.identity.guid);
    }
    updateClient();
  });
});