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
	}

	$('#start-btn').on('click', function(){
		var tableContentHtml = buildTableHTML(15, 15);
		$('#table').html(tableContentHtml);
		$('#start-btn').html("Restart");
		$('#status').html("Game Ongoing");
	});
});
