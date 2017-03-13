/*
$(function(){
	$("#send").click(function(){
	    $("#resText").load("ajax.html");
	    $("#mysqldata").ajax({
	    	type:'get',
	    	url:'index.js',
	    	cashe:false,
	    	data:{},
	    	datatype:text,
	    	success:function(data,textStates){
	    		this;
	    	},
	    	error:function(message){
	    		alert(message);
	    	}
	    })
	});
});

$(function(){
	$("#send").click(function(){
		$("#mysqldata").append();
	});
});
*/

var bool;
var ws = new WebSocket('ws://127.0.0.1:3000');

ws.onopen = function() {
	$("#a1").append("<p>连接建立</p>");	
}
	
ws.onerror = function() {
	$("#a3").append("<p>连接错误</p>");
}

//接收从服务器发来的数据		
ws.onmessage = function(e) {
	$("#a2").append('<p>'+e.data+'</p>');
}
	
ws.onclose = function() {
	$("#a4").append("<p>连接关闭</p>");
}

$(function() { 
	$("#sub").click(function() {
		$("#a2").append("<p>turn id num sum</p>");
		bool = 1;
		ws.send(bool);
    });
    $("#but").click(function() {
    	$("#a2").empty();
    })
})