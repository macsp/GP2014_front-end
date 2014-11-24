function searchByName()
{
	var dataString = {"searchname":input_search_field.value, "FLAG":"search_name"};
	
	input_search_field.value="";
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data == "name not found")
	    	{
	    		console.log("cenascenas");
	    	}
	    	
	    	else
	    	{
	    		console.log(data);
	    	}
	 	}
	});
}


function getChartData()
{
	var dataString = {"FLAG":"chartdata"};
	var chartData;
	$.ajax({
		type: "GET",
	    data:dataString,
	    url: "SearchServlet",
	    success: function(data)
	    {
	    	if (data != null)
	    	{
	    		//console.log(data);
	    		//console.log(JSON.parse(data));
	    		chartData = JSON.parse(data);
	    	}
	    },
	    async:false
	});

	return chartData;
}



function importLinksByUrl(){
	var import_link = $('#url_input_id').val();
	
	var matches = import_link.match( /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
	//celso: https?:\/\/)?(www\.)?(youtu\.be\/|youtube\.com\/)?((.+\/)?(watch(\?v=|.+&v=))?(v=)?)([\w_-]{11})(&.+)?(\?list=([\w_-]{13}))?(\?t=[0-9]*s)?(\\?.+)?(be\/|v=|\/v\/|\/embed\/|\/watch\/)([\w_-]{11}
		
	if (matches)
	{
	    alert('valid');
	}
	else{
		alert('vai levar na peida');
	}

}




function drawChart() {
	
	console.log(serverdata);
	
	var googlevalues =  [[ '', 	'',	{'type': 'string', 'role': 'style'}]];
	var i;
	
	//console.log(serverdata);
	for(i=0;i<serverdata.length;i++){
		if(serverdata[i].arousal>0 && serverdata[i].valence>0)
			googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: red}']);
		else if(serverdata[i].arousal>0 && serverdata[i].valence<0)
			googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: blue}']);
		else if(serverdata[i].arousal<0 && serverdata[i].valence>0)
			googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: yellow}']);
		else if(serverdata[i].arousal<0 && serverdata[i].valence<0)
			googlevalues.push([serverdata[i].arousal,serverdata[i].valence,'point { fill-color: green}']);
	}
	
	
  /*var data = google.visualization.arrayToDataTable([
    [ 'Valence', 	'Arousal',	{'type': 'string', 'role': 'style'}],
    [ 0.5,     		0.5, 		'point { fill-color: red}'],
    [ 0.2,     		0.5, 		'point { fill-color: blue}'],
    [ 0.7,     		-1, 		'point { fill-color: green}'],
    [ -0.8,    		-0.4,		'point { fill-color: black}'],
    [ 0.1,     		1,			'point { fill-color: pink}'],
	[ -0.6,    		-0.6,		'point { fill-color: brown}']
  ]);*/
  
  var data = google.visualization.arrayToDataTable(googlevalues);

  var options = {
    /*title: 'Age vs. Weight comparison',*/
    hAxis: {title: 'Valence', minValue: -1, maxValue: 1},
    vAxis: {title: 'Arousal', minValue: -1, maxValue: 1},
    legend: 'none',
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function importFile(){
	
	var file = document.getElementById('file-input').files[0];
	if (!file) {
		//nao tem ficheiro
		return;
	}

	var reader = new FileReader();
	reader.onload = function(e) {
		var contents = e.target.result;
		console.log(contents);
		var urls = contents.split("\n");
		var urlconf = new Array() ;
		$.each(urls, function(index, value) {
			var matches = value.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
			if (matches){
				console.log('valido');
				urlconf.push(value);
			}
			else
				console.log('invalido');
		});
		
		var dataString = {"FLAG":"importfile", "text":JSON.stringify(urlconf)};
		
		$.ajax({
			type: "GET",
		    data:dataString,
		    url: "SearchServlet",
		    success: function(data)
		    {
		    	if (data == "name not found")
		    	{
		    		console.log("cenascenas");
		    	}
		    	
		    	else
		    	{
		    		console.log(data);
		    	}
		 	}
		});

	};
	reader.readAsText(file);
	  
	  

	
}
