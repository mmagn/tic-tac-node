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

var counter = 0;
var playerIdentityManager = new PlayerIdentityManager();

io.sockets.on('connection', function (socket) {

  var currentGameState,
      currentGamePlay;

  var updateClient = function(){
    var data = {
      pim : playerIdentityManager.getPlayers(),
      identity : socket.handshake.identity,
      gameState: currentGameState
    };
    socket.emit('updateGame', data);
    socket.broadcast.emit('updateGame', data);
  };

  socket.on('new', function () {
    var newPlayer = playerIdentityManager.createPlayer();
    if (newPlayer) {
      var ip = socket.handshake.address.address;
      socket.handshake.identity = newPlayer;
      console.log('new identity: ', socket.handshake.identity);

      currentGameState = getGameState(ip);

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

  socket.on('disconnect', function () {
    if(socket.handshake.identity){
      playerIdentityManager.deletePlayerByGuid(socket.handshake.identity.guid);
    }
    updateClient();
  });
});