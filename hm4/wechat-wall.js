var height = window.screen.height;
var msg_num_limit = parseInt((height-120)/ 110);
var time_counter = 0;

function getMessage(){
	setInterval(function(){
		time_counter += 1;
		if(time_counter === 10)
			document.getElementById('admin').innerHTML = "";
	}, 1000);

	$.get('https://wall.cgcgbcbc.com/api/messages', {num: msg_num_limit}, function(data){
  			for(var i=0;i < 5;i ++){
  				pushUserMessage(data[i]);
  		}
	});

	document.getElementById("btn").style.display = "none";
	$('body').append('<div id="admin"></div>');

    var socket = io.connect('https://wall.cgcgbcbc.com' , {'reconnect': true});
    socket.on('new message', function(data){
       	pushUserMessage(data);
    });
    socket.on("admin", function(data){
    	pushAdminMessage(data);
    });
 }

 function pushUserMessage(data){
 	if(document.getElementsByClassName("content").length == msg_num_limit){
 		moveMessage();
 		var first_msg = document.getElementsByClassName("content")[0];
 		first_msg.parentNode.removeChild(first_msg);
 	}

	 if(data["content"].length > 20)
	 	$('body').append('<div class="content"><div class="userinfo"><div class="username">' + data["nickname"] + '</div><div class="headimage"><img src="' + data["headimgurl"] + '"/></div></div><div class="message"><marquee behavior="scroll" direction=left>' + data["content"] + '</marquee></div></div>');
	 else
	 	$('body').append('<div class="content"><div class="userinfo"><div class="username">' + data["nickname"] + '</div><div class="headimage"><img src="' + data["headimgurl"] + '"/></div></div><div class="message">' + data["content"] + '</div></div>');
 }

 function pushAdminMessage(data){
 	time_counter = 0;
 	document.getElementById('admin').innerHTML = '<marquee behavior="slide" direction=left>' + data["content"] + '</marquee>';
 }

 function moveMessage(){
	$('.content').animate({top: '-110px'}, "slow");
 }