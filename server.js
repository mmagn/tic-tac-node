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

io.sockets.on('connection', function (socket) {

  var currentGameState,
      currentGamePlay,
      playerIdentityManager = new playerIdentityManager();

  var updateClient = function(){
    console.log('emit > updateClient :', currentGameState);
    socket.emit('updateGame', currentGameState);
  };

  socket.on('new', function () {
    ip = socket.handshake.address.address;
    console.log('new user ip: ', ip);

    currentGameState = getGameState(ip);

    updateClient();
  });

  socket.on('move', function (position) {
    console.log("player is moving :", position);
    currentGamePlay = new GamePlay(currentGameState);
    
    currentGamePlay.play(position[0], position[1])

    updateClient();
  });
});