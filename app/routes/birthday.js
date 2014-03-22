'use strict';

var Birthday = require('../models/birthday');
var moment = require('moment');

exports.create = function(req, res){
  var birthday = new Birthday(req.body);
  birthday.convertPerTimezone();
  console.log(birthday);
  birthday.insert(function(birthday){
    res.send({birthday:birthday, moment:moment});
  });
};

