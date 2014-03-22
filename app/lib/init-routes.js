'use strict';

var d = require('../lib/request-debug');
var passport = require('passport');
//var FacebookStrategy = require('passport-facebook').Strategy;
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var birthday = require('../routes/birthday');
  var users = require('../routes/users');

  app.get('/', d, home.index);
  app.get('/login', d, users.login);
  app.get('/signup', d, users.signup);
  app.get('/logout', d, users.logout);
  app.get('/show/:id', d, users.show);
  app.post('/signup', d, passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup'
  }));
  app.post('/birthday', d, birthday.create);
  console.log('Routes Loaded');
  fn();
}

