var valueOutput = function( element ) {
    var value = element.value;
    var output = element.parentNode.getElementsByTagName( 'output' )[ 0 ];
    output.innerHTML = value;
};

var percentageMatchX = [ 0 ];
var approachPercentageMatch = [ 0 ];
var approachTagFetchTime = [ 0 ];
var groundTagFetchTime = [ 0 ];
var ramUsageRSS = [ 0 ];
var ramUsageHeapTotal = [ 0 ];
var ramUsageHeapUsed = [ 0 ];
var $element = $( '[type="range"]' );

for( var i  = $element.length - 1; i >=0; i -- )
    valueOutput( $element[i] );

$(document).on( 'change', 'input[type="range"]', function( e ) {
    valueOutput( e.target );
} );

$element.rangeslider( {
    polyfill : false
} );

var drawGraph = function() {
    $( '#percentageMatchGraph' ).html( "" );
    var totalWidth = $( '#percentageMatchGraph' ).width();
    var graphBoxWidth = totalWidth / 2;
    var graphBoxHeight = 400;
    var graphBoxPadding = 20;
    var textattr = {
        font: "20px 'Fontin Sans', Fontin-Sans, sans-serif",
        fill: 'rgb(62, 62, 62)'
    };

    var graphLabels = selectedApproaches;

    $( '#percentageMatchGraph' ).css( 'height', ( 2 * graphBoxHeight ) + 'px' );

    var r = Raphael( "percentageMatchGraph" );
    r.text( graphBoxWidth / 2 + graphBoxPadding, graphBoxPadding, "Percentage Match Graph" ).attr( textattr );
    r.text( graphBoxWidth / 2 + graphBoxPadding, graphBoxHeight - 20 - graphBoxPadding, "time( in minutes ) -->" ).attr( {
        font: "15px 'Fontin Sans', Fontin-Sans, sans-serif",
        fill: 'rgb( 62, 62, 62 )'
    } );
    var percentageMatchGraph = r.linechart( graphBoxPadding , 2 * graphBoxPadding + 20 + 18 * graphLabels.length, graphBoxWidth - 2 * graphBoxPadding, graphBoxHeight - 4 * graphBoxPadding - 40 - 18 * graphLabels.length, [ percentageMatchX ], [ approachPercentageMatch ], {
        nostroke: false,
        axis: "0 0 1 1",
        symbol: "circle",
        smooth: true
    } ).hoverColumn( function () {
        this.tags = r.set();
        for (var i = 0, ii = this.y.length; i < ii; i++) {
            this.tags.push( r.tag( this.x, this.y[ i ], this.values[ i ], 160, 10 ).insertBefore( this ).attr( [ { fill: "#fff" }, { fill: this.symbols[i].attr("fill") } ] ) );
        }
    }, function () {
        var temp = this.tags && this.tags.remove();
    } );

    percentageMatchGraph.labels = r.set();
    var x = graphBoxPadding;
    var  h = 2 * graphBoxPadding + 20;
    for( var i = 0; i < graphLabels.length; i ++ ) {
        var clr = percentageMatchGraph.lines[ i ].attr( "stroke" );
        percentageMatchGraph.labels.push( r.set() );
        percentageMatchGraph.labels[ i ].push( r.circle( x + 5, h, 5 ).attr( {
            fill: clr,
            stroke: "none"
        } ) );
        percentageMatchGraph.labels[ i ].push( r.text( x + 20, h, graphLabels[ i ] ) ).attr( {
            font: "15px 'Fontin Sans', Fontin-Sans, sans-serif",
            'text-anchor': "start",
            fill: clr
        } );
        h += 18;
    }


    r.text( 3 * graphBoxWidth / 2 + graphBoxPadding, graphBoxPadding, "Tag Fetch Time").attr( textattr );
    r.text( 3 * graphBoxWidth / 2 + graphBoxPadding, graphBoxHeight - 20 - graphBoxPadding, "time( in minutes ) -->" ).attr( {
        font: "15px 'Fontin Sans', Fontin-Sans, sans-serif",
        fill: 'rgb( 62, 62, 62 )'
    } );

    var tagGraphLabels = [];
    for( var i = 0; i < graphLabels.length; i ++ ) {
        tagGraphLabels.push( graphLabels[ i ] );
        tagGraphLabels.push( graphLabels[ i ] + " ground truth" );
    }

    var tagFetchGraph = r.linechart( graphBoxWidth + graphBoxPadding, 2 * graphBoxPadding + 20 + 18 * tagGraphLabels.length, graphBoxWidth - 2 * graphBoxPadding, graphBoxHeight - 4 * graphBoxPadding - 40 - 18 * tagGraphLabels.length, [ percentageMatchX ], [ approachTagFetchTime, groundTagFetchTime ], {
        nostroke: false,
        axis: "0 0 1 1",
        symbol: "circle",
        smooth: true
    } ).hoverColumn(function () {
        this.tags = r.set();
        for (var i = 0, ii = this.y.length; i < ii; i++) {
            this.tags.push( r.tag( this.x, this.y[ i ], this.values[ i ], 160, 10 ).insertBefore( this ).attr( [ { fill: "#fff" }, { fill: this.symbols[i].attr("fill") } ] ) );
        }
    }, function () {
        var temp = this.tags && this.tags.remove();
    } );

    tagFetchGraph.labels = r.set();
    x = graphBoxPadding + graphBoxWidth;
    h = 2 * graphBoxPadding + 20;
    for( var i = 0; i < tagGraphLabels.length; i ++ ) {
        var clr = tagFetchGraph.lines[ i ].attr( "stroke" );
        tagFetchGraph.labels.push( r.set() );
        tagFetchGraph.labels[ i ].push( r.circle( x + 5, h, 5 ).attr( {
            fill: clr,
            stroke: "none"
        } ) );
        tagFetchGraph.labels[ i ].push( r.text( x + 20, h, tagGraphLabels[ i ] ) ).attr( {
            font: "15px 'Fontin Sans', Fontin-Sans, sans-serif",
            'text-anchor': "start",
            fill: clr
        } );
        h += 18;
    }

    r.text( graphBoxWidth / 2 + graphBoxPadding, graphBoxHeight + graphBoxPadding, "Ram Usage Graph" ).attr( textattr );
    r.text( graphBoxWidth / 2 + graphBoxPadding, 2 * graphBoxHeight - 20 - graphBoxPadding, "time( in minutes ) -->" ).attr( {
        font: "15px 'Fontin Sans', Fontin-Sans, sans-serif",
        fill: 'rgb( 62, 62, 62 )'
    } );
    var ramUsageLabels = [ 'Resident Set Size', 'Heap Used', 'Total Heap' ];
    var ramUsageGraph = r.linechart( graphBoxPadding , 2 * graphBoxPadding + 20 + 18 * ramUsageLabels.length + graphBoxHeight, graphBoxWidth - 2 * graphBoxPadding, graphBoxHeight - 4 * graphBoxPadding - 40 - 18 * ramUsageLabels.length, [ percentageMatchX ], [ ramUsageRSS, ramUsageHeapUsed, ramUsageHeapTotal ], {
        nostroke: false,
        axis: "0 0 1 1",
        symbol: "circle",
        smooth: true
    } ).hoverColumn( function () {
        this.tags = r.set();
        for (var i = 0, ii = this.y.length; i < ii; i++) {
            this.tags.push( r.tag( this.x, this.y[ i ], this.values[ i ], 160, 10 ).insertBefore( this ).attr( [ { fill: "#fff" }, { fill: this.symbols[i].attr("fill") } ] ) );
        }
    }, function () {
        var temp = this.tags && this.tags.remove();
    } );

    ramUsageGraph.labels = r.set();
    x = graphBoxPadding;
    h = 2 * graphBoxPadding + 20 + graphBoxHeight;
    for( var i = 0; i < ramUsageLabels.length; i ++ ) {
        var clr = ramUsageGraph.lines[ i ].attr( "stroke" );
        ramUsageGraph.labels.push( r.set() );
        ramUsageGraph.labels[ i ].push( r.circle( x + 5, h, 5 ).attr( {
            fill: clr,
            stroke: "none"
        } ) );
        ramUsageGraph.labels[ i ].push( r.text( x + 20, h, ramUsageLabels[ i ] ) ).attr( {
            font: "15px 'Fontin Sans', Fontin-Sans, sans-serif",
            'text-anchor': "start",
            fill: clr
        } );
        h += 18;
    }

};

setInterval( function fetchTrends() {
    $.post( '/fetch_trends', {
	'sourceName' : dataSource,
	'approachList' : JSON.stringify( { 'list' : selectedApproaches } ),
    }, function ( data ) {
        console.dir( data );
	    if ( data ) {
	        var html = '<table><tr><td colspan = "2">Trends</td></tr><tr><td> ' + dataSource + ' </td><td> Ground Truth </td></tr>';
	        var tags = data.approaches[ 0 ].tags;
	        var groundTruth = data.groundTruth.tags;
	        for( var i = 0; i < tags.length; i ++ ) {
		        html += '<tr><td>' + tags[ i ].text + '</td><td>' + ( i < groundTruth.length ? groundTruth[ i ].text : '' ) + '</td></tr>';
	        }
	        html += '</table>';
	        $( '#trend_list' ).html(  html );
            percentageMatchX.push( percentageMatchX[ percentageMatchX.length - 1 ] + 1  );
            approachPercentageMatch.push( data.approaches[ 0 ].percentageMatch );
            approachTagFetchTime.push( data.approaches[ 0 ].time );
            groundTagFetchTime.push( data.groundTruth.time );
            ramUsageRSS.push( data.memoryUsage.rss / 1000000 );
            ramUsageHeapTotal.push( data.memoryUsage.heapTotal / 1000000 );
            ramUsageHeapUsed.push( data.memoryUsage.heapUsed / 1000000 );
            drawGraph();
	    }
    } );
        return fetchTrends;
}(), 30000 );

$( '#cronSchedule' ).val( cronSchedulingTime ).change();
$( '#dataRate' ).val( dataRateValue ).change();

$( '#cronSchedule' ).change( function() {
    $.post( '/sink/changeScoreRate', { scoreRate : $( '#cronSchedule' ).val() } );
} );

$( '#dataRate' ).change( function() {
    $.post( '/source/data_rate' , { scoreRate : $( '#dataRate' ).val() } );
} );
