var express = require('express');
var mysql = require('mysql');
var ws = require('ws').Server;
var app = express();
var data = new Array();

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

//数据库连接
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456'
});

/*
connection.connect();
connection.query('use procons');
connection.query('select * from storage',function selectCb(err,results,fields){
	if (err) {
		throw err;
	}
	if (results) {
		for (var i = 0; i<results.length; i++) {
			data[i]=results[i].turn+'    '+results[i].id+'  '+results[i].num+'  '+results[i].sum;
		}
	}
});
connection.end();
*/

//websocket连接
var server = new ws({host:"127.0.0.1",port:3000});
server.on('connection',function(ws) {
	console.log('new connection founded successfully');
	//接收数据并处理
	ws.on('message',function(e) {
		if (e==1) {
			connection.connect();
			connection.query('use procons');
			connection.query('select * from storage',function selectCb(err,results,fields){
				if (err) {
					throw err;
				}
				if (results) {
					for (var i = 0; i < results.length; i++) {
						data[i] = results[i].turn+'    '+results[i].id+'  '+results[i].num+'  '+results[i].sum;
						ws.send(data[i]);
					}
				}
			});
			connection.end();				
		}
/*		if (e==2) {
			connection.connect();
			connection.query('use procons');
			connection.query('truncate table storage',function(err,result){
				if (err) {
					throw err;
				}
				if (result) {
					ws.send(null);
				}
			});
			connection.end();
		}		
*/
	});	
});
console.log('websocket-server running...');

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});



/*

//var ws = require('websocket');
var http = require('http');

var url = 'ws://127.0.0.1:12010/updates';

var WebSocket = function(url) {
	this.options = parseUrl(url);
	this.connect();
};
WebSocket.prototype.onopen = function() {
	
};
WebSocket.prototype.setSocket = function() {
	this.socket = socket;
	this.socket.on('data',this.receiver);
}
WebSocket.prototype.connect = function() {
	var that = this;
	var key = new Buffer(this.options.protocolVersion + '-' + Date.now()).toString('base64');
	var shasum = crypto.createHash('sha1');
	var expected = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');

	var options = {
		port:this.options.port,
		host:this.options.hostname,
		headers:{
			'Connection':'Upgrade',
			'Upgrade':'websocket',
			'Sec-WebSocket-Version':this.options.protocolVersion,
			'Sec-WebSocket-Key':key
		}
	};
	var req = http.request(options);
	req.end();

	req.on('upgrade',function(res,socket,upgradeHead) {
		that.setSocket(socket);
		that.onopen();
	});
};

WebSocket.prototype.send = function (data) {
	this._send(data);
};



var server = http.createServer(function(req,res) {
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello World\n');
});
server.listen(12010);

server.on('upgrade',function(req,socket,upgradeHead) {
	var head = new Buffer(upgradeHead.length);
	upgradeHead.copy(head);
	var key = req.headers['sec-webSocket-key'];
	var shasum = crypto.createHash('sha1');
	key = shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest('base64');
	var headers = [
		'HTTP/1.1 101 Switching Protocols',
		'Upgrade:websocket',
		'Connection:Upgrade',
		'Sec-Websocket-Accept:' + key,
		'Sec-Websocket-Protocol:' + protocol
	];

	socket.setNoDelay(true);
	socket.write(headers,concat('','').join('\r\n'));
	socket.onopen = function() {
		//opened();
	};
	socket.onmessage = function(event) {
		//event.data;
	};

	var websocket = new WebSocket();
	websocket.setSocket(socket);
});

*/