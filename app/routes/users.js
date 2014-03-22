'use strict';

var User = require('../models/user');

exports.login = function(req, res){
  res.render('users/login', {title: 'Login'});
};

exports.signup = function(req, res){
  res.render('users/signup', {title: 'Register'});
};

exports.show = function(req, res){
  User.findById(req.params.id, function(showUser){
    res.render('users/show', {title: 'User Profile Page', showUser:showUser});
  });
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};
