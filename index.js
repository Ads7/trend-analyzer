var server = require( "./server" );
var router = require( "./router" );

var handle = {
    "sink" : "./datacontroller/AppController",
    "source" : "./datasource/AppController",
    "default" : "./RequestController",
    "approach" : "./RequestController",
    "static" : "./RequestController",
    "fetch_trends" : "./RequestController"
};

server.start( router.route, handle );

exports.handle = handle;
exports.staticDirectory = __dirname + '/static/';
exports.templateDirectory = __dirname + '/templates/';
