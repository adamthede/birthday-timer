(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#enterbirthday').click(updateBirthday);
  }

  function updateBirthday(event){
    var data = $('#birthday').serialize();
    console.log('SERIALIZED: ', data);
    var type = 'POST';
    var url = '/birthday';
    var success = updateBirthdayDom;

    $.ajax({url:url, data:data, type:type, success:success});

    event.preventDefault();
  }

  function updateBirthdayDom(data){
    var currentDate = new Date();
    var birthDate = new Date(data.birthday[0].formattedBirthday);
    console.log('HUMAN READABLE JARGON -----------------------');
    var timeAgo = moment(birthDate).fromNow();
    console.log('TIME AGO: ', timeAgo);
    var calendarTime = moment(birthDate).calendar();
    console.log('CALENDAR: ', calendarTime);
    console.log('READABLE RANGE PLUGIN -----------------------');
    var preciseDiff = moment(birthDate).preciseDiff(currentDate);
    console.log(preciseDiff);
    console.log('---------------------------------------------');
    console.log('BIRTHDATE: ', birthDate);
    console.log('NOW: ', currentDate);
    var $div = $('<div>');
    $div.text(preciseDiff);
    $('#age').append($div);
  }

})();

