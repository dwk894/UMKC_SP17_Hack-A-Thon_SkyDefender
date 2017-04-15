$(document).ready(
  function() {
    sessionStorage.setItem('id', 'Ting');
    sessionStorage.setItem('you', 'Dayu');
    var id = sessionStorage.getItem('id');
    var you = sessionStorage.getItem('you');
    $('#target').append(you);
    $.ajax(
      {
        url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + id + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
        method: 'GET',
        success: function(result) {
          var last_msg = result['received_msg']['msg'];
          var last_from = result['received_msg']['from'];
          var last_time = result['received_msg']['time'];
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + id + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              data: JSON.stringify(
                {
                  "$set": {
                    "switch": "1"
                  }
                }
              ),
              type: "PUT",
              contentType: "application/json",
              success: function(result) {
                var timer = setInterval(
                  function() {
                    $.ajax(
                      {
                        url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + id + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                        method: 'GET',
                        success: function(result) {
                          if (last_time !== result['received_msg']['time']) {
                            last_msg = result['received_msg']['msg'];
                            last_from = result['received_msg']['from'];
                            last_time = result['received_msg']['time'];
                            $('#chatting').append('<b>' + last_from + '</b>: ' + last_msg + '<br>');
                          }
                        },
                        error: function(error) {
                        }
                      }
                    );
                  },
                  3000
                );
              },
              error: function(error) {
              }
            }
          );
        },
        error: function(error) {
        }
      }
    );
  }
);

$(
  function() {
    $('#send').click(
      function() {
        var id = sessionStorage.getItem('id');
        var you = sessionStorage.getItem('you');
        var msg = $('#chat_msg').val();
        if (msg.length > 0) {
          $('#chat_msg').val('');
          $('#chatting').append('<b>' + id + '</b>: ' + msg + '<br>');
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + you + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              method: 'GET',
              success: function(result) {
                var on = result['switch'];
                if (on !== '1') {
                  $('#chatting').append('<span style = \'color: red;\'>She/He is offline at this moment.</span><br>');
                } else {
                  var time = Date.now();
                  $.ajax(
                    {
                      url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + you + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                      data: JSON.stringify(
                        {
                          "$set": {
                            "received_msg": {
                              "from": id,
                              "msg": msg,
                              "time": time.toString()
                            }
                          }
                        }
                      ),
                      type: "PUT",
                      contentType: "application/json",
                      success: function(result) {
                      },
                      error: function(error) {
                        $('#chatting').append('<span style = \'color: red;\'>She/He is offline at this moment.</span><br>');
                      }
                    }
                  );
                }
              },
              error: function(error) {
                $('#chatting').append('<span style = \'color: red;\'>She/He is offline at this moment.</span><br>');
              }
            }
          );
        }
      }
    );
  }
);

window.onbeforeunload = function() {
  $.ajax(
    {
      url: "https://api.mlab.com/api/1/databases/skydefender/collections/Chatting_Channel/" + sessionStorage.getItem('id') + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
      data: JSON.stringify(
        {
          "$set": {
            "switch": "0"
          }
        }
      ),
      type: "PUT",
      contentType: "application/json",
      success: function(result) {
      },
      error: function(error) {
      }
    }
  );
  return "0";
}