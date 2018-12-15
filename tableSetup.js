const BASE_URL = "http://whispering-atoll-52291.herokuapp.com";
var BOARD_ID = null;

$(document).ready(function(){
	var buildTableHTML = function(rows, cols, cells) {
		var range_rows = [...Array(rows).keys()];
		var range_cols = [...Array(cols).keys()];

		var rowHtml='';
		$.each(range_rows,function(i, x){
		 rowHtml += '<tr>';
		 $.each(range_cols, function(j, y){
			 	var cell = cells[i*cols + j]
				if(cell.seen) {
					rowHtml+='<td class=clicked>' + cell.content + '</td>';
				}
				else {
					rowHtml+='<td>' + '?' + '</td>';
				}
		 });
		 rowHtml += '</tr>';
	 });

		return rowHtml;
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
		var callback = function(response){
			var cells = response.cells;
			var rows = response.rows;
			var cols = response.cols;
			boardID = response.id;

			var tableContentHtml = buildTableHTML(rows, cols, cells);
			$('#table').html(tableContentHtml);
			$('#start-btn').html("Restart");
			$('#status').html("Game Ongoing");
		}

		startGame(callback, function(){alert('error')})
	});
});
