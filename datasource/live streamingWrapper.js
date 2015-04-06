var twitter = require('ntwitter');

var fetch =function(options){

var twit = new twitter({
  consumer_key: 'CKyoQr2oeu2FWrV56FdKDfLPV',
  consumer_secret: 'Bsht8NUhoFSa2aZUOx3qhB1iASFKLyU8OVJ23WJ5Pn5BtHHe79',
  access_token_key: '2797653344-vHFJiAJNjgRKSd3u19sCDYdKxAmWUbYfxUqRmSZ',
  access_token_secret: '1A8v36wdDP3jeHFMSI3DJqw3N84joqCnoXh30xMFY4kYz'
});

twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'}, function(stream) {
  stream.on('data', function (data) {
    if( options['callback'] ){
    	options['callback']({'data':data});
    }
    else {
    	console.log("callback stated false")
    }
  });
});
}
exports.fetch = fetch;
