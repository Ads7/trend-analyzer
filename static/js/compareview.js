$(function(){
//Get the table
table = $('table');

   $.getJSON('./temp.json', function(data) {
    $.each(data, function(i, d) {
    output = "";
    output += "<tr>";    
    for (j=0;j<4;j++){

    	output += "<td>";
    		output += d[j];
    		output += "</td>";
    	}
    	output += "</tr>";
    	table.children("tbody").append(output);
    	console.log(d);
    });
    

	});
table.children("tbody").each(function() {
        var $this = $(this);
        var newrows = [];

        $this.find("tr").each(function(){
            var i = 0;

            $(this).find("td").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $(""); }
                newrows[i].append($(this));
            });
        });

        $this.find("tr").remove();
        $.each(newrows, function(){
            $this.append(this);
        });
    });


});

