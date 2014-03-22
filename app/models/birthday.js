'use strict';

module.exports = Birthday;
var birthdays = global.nss.db.collection('birthdays');

function Birthday(birthday){
  this.birthday = new Date(birthday.birthday);
  this.timezoneOffset = birthday.DropDownTimezone * 1;
  this.formattedBirthday = birthday.formattedBirthday ? birthday.formattedBirthday : undefined;
}

Birthday.prototype.insert = function(fn){
  birthdays.insert(this, function(err, record){
    fn(record);
  });
};

Birthday.prototype.convertPerTimezone = function(){
  var offset = this.timezoneOffset * -1;
  var o = this.birthday;
  var update = o.getTime();
  var n = new Date(update + (3600000*offset));
  console.log('--------------------n-------------------');
  console.log(n);
  this.formattedBirthday = n;
};

Birthday.prototype.update = function(fn){
  birthdays.update({_id:this._id}, this, function(err, count){
    fn(err, count);
  });
};

