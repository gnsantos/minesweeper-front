const BASE_URL = "http://whispering-atoll-52291.herokuapp.com";
var BOARD_ID = null;

$(document).ready(function(){
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

	var makeMove = function(row, col, successCallback, errorCallback) {
		var route = '/move';

		var req = {
			'row': row,
			"col": col,
			'board_id': BOARD_ID
		};

		$.ajax({
			'type': 'POST',
			'url': BASE_URL + route,
			"headers": {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT'
			},
			'data': JSON.stringify(req),
			'crossDomain': true,
			'dataType': 'json',
			'success': successCallback,
			'error': errorCallback
		});
	};

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

	$('#start-btn').on('click', function(){
		var callback = function(response){
			var cells = response.cells;
			var rows = response.rows;
			var cols = response.cols;
			var nbombs = response.bombs;

			BOARD_ID = response.id;

			var tableContentHtml = buildTableHTML(rows, cols, cells);
			$('#table').html(tableContentHtml);
			$('#start-btn').html("Restart");
			$('#status').html("Game Ongoing");
			$('#bombs').html(nbombs);
		}

		startGame(callback, function(){alert('error')})
	});

	$('table').on('click', 'td', function(){
		var colIndex = $(this).parent().children().index($(this));
		var rowIndex = $(this).parent().parent().children().index($(this).parent());

		var successCallback = function(response){
			console.log(response);
			var cells = response.cells;
			var rows = response.rows;
			var cols = response.cols;

			var tableContentHtml = buildTableHTML(rows, cols, cells);
			$('#table').html(tableContentHtml);

			if (response.status === "lost") {
				alert('You clicked a bomb!');
				$("#status").html("Game Lost");
			}
		};

		var errorCallback = function(resp){
			console.log(resp);
			alert('Invalid Move!');
		};

		makeMove(rowIndex, colIndex, successCallback, errorCallback);
	});
});
