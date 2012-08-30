var application_root = __dirname,
		_ = require("underscore"),
		path = require("path"),
		express = require('express');

var app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

var game = {
	gamePlay: require('./src/game/gamePlay'),
	gameState: require('./src/game/gameState'),
	playerIdentity: require('./src/game/playerIdentity'),
	playerIdentityManager: require('./src/game/playerIdentityManager')
};

var multiPlayer = {
	gamePlay: require('./src/multiPlayer/multiPlayerManager')
};

console.log("server is listening at http://127.0.0.1:3000");

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

var counter = 0,
		multiPlayerManager = new MultiPlayerManager(),
		currentGameState = new GameState();

io.sockets.on('connection', function (socket) {
	var connection = {};
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

	var client = {
		askUsername: function(){
			socket.emit('askUsername');
		},

		updatePlayers : function(){
			var playersToBroadcast = multiPlayerManager.getPlayers();
			console.info(playersToBroadcast.length + ' active connection(s)');
			socket.broadcast.emit('updatePlayers', playersToBroadcast);
			socket.emit('updatePlayers', playersToBroadcast);
		}
	};

	socket.on('new', function () {
			client.updatePlayers();
			client.askUsername();
	});

	socket.on('tellUsername', function (username) {
		var player = {username: username};
		if(multiPlayerManager.addPlayer(player)){
			connection.player = player;
			client.updatePlayers();
			socket.emit('waitForOpponent');
		}else{
			client.askUsername();
		}
	});

	socket.on('disconnect', function () {
		if(connection.player){
			multiPlayerManager.removePlayer(connection.player)
			client.updatePlayers();
			connection.player = undefined;
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
});

server.listen(3000);