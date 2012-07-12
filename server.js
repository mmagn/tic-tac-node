var application_root = __dirname,
    express = require("express"),
    path = require("path");
var app = express.createServer(),
    io = require('socket.io').listen(app);

app.configure(function(){
  // the bodyParser middleware parses JSON request bodies
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "static")));
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
  socket.on('new', function () {
    ip = socket.handshake.address.address;
    console.log('new user ip: ', ip);
    socket.emit('message', {message: 'your ip is '+ip}); 
  });
});