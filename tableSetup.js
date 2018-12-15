const BASE_URL = "http://whispering-atoll-52291.herokuapp.com";
var BOARD_ID = null;

$(document).ready(function(){
	var buildTableHTML = function(rows, cols) {
		var range_rows = [...Array(rows).keys()];
		var range_cols = [...Array(cols).keys()];

		var rowHtml='';
		$.each(range_rows,function(i, x){
		 rowHtml += '<tr>';
		 $.each(range_cols, function(j, y){
				rowHtml+='<td>' + '?' + '</td>';
		 });
		 rowHtml += '</tr>';
	 });

		return rowHtml;
		console.log(rowHtml);
	};

	var startGame = function(successCallback, errorCallback) {
    var route = '/start';
    $.ajax({
			'type': 'GET',
			'url': BASE_URL + route,
			"headers": {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT'
			},
			'crossDomain': true,
			'dataType': 'json',
			'success': successCallback,
      'error': errorCallback
		});
  };

	$('#start-btn').on('click', function(){
		var callback = function(){
			var tableContentHtml = buildTableHTML(15, 15);
			$('#table').html(tableContentHtml);
			$('#start-btn').html("Restart");
			$('#status').html("Game Ongoing");
		}

		startGame(callback, function(){alert('error')})
	});
});
