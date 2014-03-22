'use strict';

// Setting the Database and the Port
var dbname = process.env.DBNAME;
var port = process.env.PORT || 4000;

// Defining All Necessary Tools
var express    = require('express');
var app = express();
var passport   = require('passport');
var less       = require('express-less');
var session    = require('express-session');
var RedisStore = require('connect-redis')(session);
var initMongo  = require('./lib/init-mongo'); // Connecting To The DB
var initRoutes = require('./lib/init-routes');
var LocalStrategy = require('passport-local').Strategy;
//var flash      = require('connect-flash');
//var isLoggedIn = require('./lib/isLoggedIn');

require('./config/passport')(passport); // Pass Passport for Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); // Set Up for Jade Templating

// ------------------ Pipeline Begins
app.use(initMongo.connect); // Connecting To The DB
app.use(initRoutes);
app.use(express.logger(':remote-addr -> :method :url [:status]')); // Logs Requests to the Console
app.use(express.favicon());
app.use(express.static(__dirname + '/static'));
app.use('/less', less(__dirname + '/less'));
app.use(express.bodyParser()); // Get Information From HTML Forms
app.use(express.methodOverride());
app.use(express.cookieParser()); // Read Cookies - Needed For Auth
app.use(express.session({
  store : new RedisStore({host: 'localhost', port: 6379}),
  secret: 'contextualizing-your-every-experience', // Session Secret
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
// Required for Passport
app.use(passport.initialize());
app.use(passport.session()); // Persistent Login Sessions
//app.use(isLoggedIn);
app.use(app.router);
// ------------------ Pipeline Ends

// ------------------ Launch App
var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;
