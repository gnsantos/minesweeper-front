$(document).ready(function(){
	$('#start-btn').on('click', function(){
		var rows = 18;
		var cols = 25;

		var range_rows = [...Array(rows).keys()];
		var range_cols = [...Array(cols).keys()];

		var rowHtml='';
		$.each(range_rows,function(i, x){
		 rowHtml += '<tr>'
		 $.each(range_cols, function(j, y){
				rowHtml+='<td>' + '?' + '</td>';
		 });
		 rowHtml += '</tr>'
	 });

		$('#table').html(rowHtml);
		$('#start-btn').html("Restart");
		$('#status').html("Game Ongoing");
	});
});
