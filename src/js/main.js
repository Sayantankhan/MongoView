jQuery(document).ready(function(event){

  $(".left-first-section").click(function(){
        $('.main-section').toggleClass("open-more");
  });

  $("#offchat").on('click',function(){
        $('.main-section').toggleClass("open-more");
  });

  // jQuery('[data-toggle="tooltip"]').tooltip();
  //var socket = io();
  var val = jQuery("#status").val();
  var user_email;
  if(val == 'connected'){
    jQuery("#status").css('color','green');
  }
  else{
    jQuery("#status").css('color','red');
  }

  var socket = io();

  $(function () {

        var myMessage;
        $('form').submit(function(){
          socket.emit('chat message', user_email+":@:@:"+$('#chatbox').val());
          myMessage = $('#chatbox').val();
          $('#chatbox').val('');
          return false;
        });

        socket.on('userSet', function(data) {
           user_email = data.username;
          // $('ul').append("<p>"+ user_email+" has entered into the chat</p>");
           $("#wchat").css('display','block');
           $("#userdetails").css('display','none');
        });

        socket.on('userExists', function(data) {
           alert(data);
        });

        socket.on('newUser', function(msg){
          $('ul').append("<p>"+ msg+"</p>");
        });

        socket.on('chat message', function(msg){
          //var match = myMessage.localeCompare(msg);
          var msgbody = msg.split(':@:@:');
          var match = msgbody[0].localeCompare(user_email);
          if(match == 0)
            $('ul').append("<li><div class=\"left-chat\"><p><lorem>"+'<b>'+msgbody[0]+':</b>&nbsp;'+msgbody[1]+"</lorem></p></div></li>");
          else
            $('ul').append("<li><div class=\"right-chat\"><p><lorem>"+'<b>'+msgbody[0]+':</b>&nbsp;'+msgbody[1]+"</lorem></p></div></li>");
            window.scrollTo(0,document.querySelector(".chatboxdiv").scrollHeight);
        });

        socket.on('chatend', function(msg){
          $('ul').append("<p>"+ msg+"</p>");
        });
      });


      $("#nameButton").on('click',function(e){
        user_email = $("#usr").val();
        console.log(user_email);
        // $("#wchat").css('display','block');
        // $("#userdetails").css('display','none');
        //socket.emit('setUsername', user_email);
        socket.emit('setUsername', user_email);
      });


       $("#sendmessage").on('click',function(e){
      //   e.preventDefault();
      //   alert($('#chatbox').val());
          $("form").submit();
      //         console.log('submitting');
      //         // socket.emit('chat message', $('#chatbox').val());
      //         // $('#chatbox').val('');
      //         // return false;
           });
      //      // socket.on('chat message', function(msg){
      //      //      alert('goal');
      //      //       $('ul').append("<li><div class=\"left-chat\">"+$('<li>').text(msg)+"</div></li>");
      //      //  });
      // });
  // $('#sendmessage').on('click',function({
  //
  //   // $('form').submit(function(){
  //   //     alert('submitting');
  //   //    socket.emit('chat message', $('#chatbox').val());
  //   //    $('#chatbox').val('');
  //   //    return false;
  //   //  });
  //
  //   // socket.on('chat message', function(msg){
  //   //   $('#messages').append("<li><div class=\"left-chat\">"+$('<li>').text(msg)+"</div></li>");
  //   // });
  //  });

  //jQuery("#disconnect").css('display','none');

  // jQuery("#connection").on('click',function(){
  //   var dbhost = $('#url').val();
  //   var port = $('#port').val();
  //   var dbname = $('#dbname').val();
  //
  //   $.post('http://localhost:8082/connect',
  //           { dbhost:dbhost, port:port, dbname:dbname },function(data) {
  //             if(data == 'connected'){
  //               jQuery("#status").val(data);
  //               jQuery("#status").css('color','green');
  //               jQuery("#endconnect").css('display','block');
  //               jQuery("#conect").css('display','none');
  //         }
  //       });
  // });
  //
  // jQuery("#disconnect").on('click',function(){
  //   $.get('http://localhost:8082/disconnect',function(data) {
  //           jQuery("#status").val(data);
  //           jQuery("#status").css('color','red');
  //           jQuery("#endconnect").css('display','none');
  //           jQuery("#conect").css('display','block');
  //
  //    });
  // });


});
