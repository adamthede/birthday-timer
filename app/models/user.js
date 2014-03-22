'use strict';

module.exports = User;
var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');

function User(user){
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.facebook = {};
  this.twitter = {};
  this.google = {};
}

User.prototype.register = function(fn){
  var self = this;

  hashPassword(self.password, function(hashedPassword){
    self.password = hashedPassword;
    insert(self, function(err){
      fn(err);
    });
  });
};

function hashPassword(password, fn){
  bcrypt.hash(password, 8, function(err, hash){
    fn(hash);
  });
}

function insert(user, fn){
  users.findOne({email:user.email}, function(err, userFound){
    if(!userFound){
      users.findOne({name:user.name}, function(err, userFound){
        if(!userFound){
          users.insert(user, function(err, record){
            fn(err);
          });
        }else{
          fn();
        }
      });
    }else{
      fn();
    }
  });
}

User.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  users.findOne({_id:_id}, function(err, record){
    if(record){
      fn(err, _.extend(record, User.prototype));
    }else{
      fn(null);
    }
  });
};

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, user){
    if(user){
      bcrypt.compare(password, user.password, function(err, result){
        if(result){
          fn(_.extend(user, User.prototype));
        }else{
          fn();
        }
      });
    }else{
      fn();
    }
  });
};
