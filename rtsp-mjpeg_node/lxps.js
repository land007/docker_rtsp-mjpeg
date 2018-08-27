const WebSocket = require('ws');
const fs = require('fs');
var Canvas = require('canvas')
, Image = Canvas.Image
, canvas = new Canvas(200, 200)
, ctx = canvas.getContext('2d');

//const tf = require('@tensorflow/tfjs');
//require('@tensorflow/tfjs-node');
//const posenet = require('@tensorflow-models/posenet');

//const heapdump = require('heapdump');

//const save = function () {
//  gc();
//  heapdump.writeSnapshot('./1/' + Date.now() + '.heapsnapshot');
//}

var _time = 50;
var requestAnimationFrame = function(callback) {
       setInterval(callback, _time);
//       requestAnimationFrame(callback);
//	callback();
//    setTimeout(() => {
//    	   requestAnimationFrame(callback);
//    }, 1);
};
var data=fs.readFileSync(__dirname+"/src/jsmpeg.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/video-element.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/player.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/buffer.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/ajax.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/ajax-progressive.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/websocket.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/ts.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/decoder.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/mpeg1.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/mp2.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/canvas2d.js","utf-8");
//console.log(data);
eval(data);
data=fs.readFileSync(__dirname+"/src/mpeg1.js","utf-8");
//console.log(data);
eval(data);
//data=rf.readFileSync(__dirname+"/src/webaudio.js","utf-8");
//console.log(data);
//eval(data);

data=fs.readFileSync(__dirname+"/demo_util.js","utf-8");
//console.log(data);
eval(data);


//var ws = new WebSocket('ws://10.2.0.44:8100');
//
//ws.on('open', function open() {
//  ws.send('something');
//});
//
//ws.on('message', function incoming(data) {
//  console.log(data);
//});
var new_uri = 'ws://10.2.0.44:8100';
var player = new JSMpeg.Player(new_uri, {
    canvas: canvas,
    audio: false,
    disableGl: true
       //videoBufferSize: 2 * 512 * 1024
});






var STREAM_SECRET = process.argv[2],
STREAM_PORT = process.argv[3] || 8081,
WEBSOCKET_PORT = process.argv[4] || 8082,
RECORD_STREAM = false;

//Websocket Server
var socketServer = new WebSocket.Server({port: WEBSOCKET_PORT, perMessageDeflate: false});
socketServer.connectionCount = 0;
socketServer.on('connection', function(socket, upgradeReq) {
socketServer.connectionCount++;
console.log(
	'New WebSocket Connection: ', 
	(upgradeReq || socket.upgradeReq).socket.remoteAddress,
	(upgradeReq || socket.upgradeReq).headers['user-agent'],
	'('+socketServer.connectionCount+' total)'
);
socket.on('close', function(code, message){
	socketServer.connectionCount--;
	console.log(
		'Disconnected WebSocket ('+socketServer.connectionCount+' total)'
	);
});
});
socketServer.broadcast = function(data) {
socketServer.clients.forEach(function each(client) {
	if (client.readyState === WebSocket.OPEN) {
		client.send(data);
	}
});
};







//setTimeout(() => {
var oldLength = 0;
setInterval(() => {
	let data = canvas.toDataURL();
//	if(oldLength == data.length) {
//		console.log('c');
//	}
//	oldLength = data.length;
//  console.log(oldLength);
//	socketServer.broadcast(data);
	canvas.toDataURL('image/jpeg', function(err, jpeg) {
		if(oldLength == data.length) {
			console.log('c');
		}
		console.log(oldLength);
		oldLength = jpeg.length;
		socketServer.broadcast(jpeg);
	});
//       save();
//       var content = '<img src="' + canvas.toDataURL() + '" />';
//       fs.writeFile('./test222.html', content, function(err){
//    	   if(err)
//    		   throw err;
//    	   console.log('写文件操作成功');
//       });
}, _time);





