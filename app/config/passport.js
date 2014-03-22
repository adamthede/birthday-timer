// config/passport.js

'use strict';

// Load What We Need
var LocalStrategy = require('passport-local').Strategy;

// Load The User Model
var User = require('../models/user');

module.exports = function(passport){
  // Serialize User for the Session
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  // Deserialize User
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    pasReqToCallback : true
  },
  function(req, email, password, done){
    process.nextTick(function(){
      User.findByEmailAndPassword(email, password, function(err, user){
        if(err){
          return done(err);
        }else if(user){
          return done(null, false);
        }else{
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = password;
          newUser.register(function(err){
            if(err){
              throw err;
            }else{
              return done(null, newUser);
            }
          });
        }
      });
    });
  }));
};
