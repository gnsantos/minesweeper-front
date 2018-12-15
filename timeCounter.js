setInterval( function(){
  var time = $('#time').html();
  if($("#start-btn").html() !== 'Start' && $('#status').html() !== 'Game Lost') {
    $("#time").html(++time);
  }
}, 1000);
