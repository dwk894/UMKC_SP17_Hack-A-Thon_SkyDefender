window.onload = function() {
  //  if (sessionStorage.getItem('logged_in') !== '1') {
  //    alert('Please log in first.');
  //    window.location.href = '../index.html';
  //  }
  localStorage.setItem('add_driver', '0');
  var drivers = sessionStorage.getItem('drivers');
  drivers = drivers.split(',');
  var driver_script = '';
  for (var i = 0; i < drivers.length; i++) {
    driver_script += '<tr id = \'driver\'>';
    driver_script += '<td class = \'driver\'>' + drivers[i] + '</td>';
    driver_script += '<td class = \'button_2\' align = \'right\'><button class = \'small_button\' onclick = \'ddelete("' + drivers[i] + '");\'>' + 'Delete' + '</button>' + '<button class = \'small_button\' onclick = \'location("' + drivers[i] + '");\'>' + 'Location' + '</button>' + '</td>';
    driver_script += '</tr>';
  }
  $('#driver').replaceWith(driver_script + '<tr><td><br><br></td></tr>');
}

$(
  function() {
    $('#sign_out').click(
      function() {
        sessionStorage.setItem('logged_in', '0');
        window.location.href = '../index.html';
      }
    );
  }
);

$(
  function() {
    $('#add_driver').click(
      function() {
        var win = window.open('Add_Driver.html', 'Add Driver', 'width=400,height=600');
        var timer = setInterval(
          function() {
            if (win.closed) {
              clearInterval(timer);
              if (localStorage.getItem('add_driver') === '1') {
                localStorage.setItem('add_driver', '0');
                $.ajax(
                  {
                    url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                    data: JSON.stringify(
                      {
                        "_id": localStorage.getItem('newID'),
                        "password": localStorage.getItem('newPassword'),
                        "email": localStorage.getItem('newEmail'),
                        "admin": "0",
                        "source_list": JSON.parse(sessionStorage.getItem('source')),
                        "Destination": JSON.parse(sessionStorage.getItem('destination')),
                        "waste_list": JSON.parse(sessionStorage.getItem('waste'))
                      }
                    ),
                    type: "POST",
                    contentType: "application/json",
                    success: function(result) {
                      var drivers = sessionStorage.getItem('drivers');
                      drivers += ',' + localStorage.getItem('newID');
                      sessionStorage.setItem('drivers', drivers);
                      var D = drivers.split(',');
                      var D1 = [];
                      for (var i = 0; i < D.length; i++) {
                        D1.push(
                          {
                            'id': D[i]
                          }
                        );
                      }
                      $.ajax(
                        {
                          url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky/" + sessionStorage.getItem('id') + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                          data: JSON.stringify(
                            {
                              "$set": {
                                "driver_list": D1
                              }
                            }
                          ),
                          type: "PUT",
                          contentType: "application/json",
                          success: function(result) {
                            location.reload();
                          },
                          error: function(error) {
                            alert("Error: cannot register!  Please try later.");
                          }
                        }
                      );
                    },
                    error: function(error) {
                      alert("Error: cannot register!  Please try later.");
                    }
                  }
                );
              }
            }
          }, 500
        );
      }
    );
  }
);

function ddelete(id) {
  var c = window.confirm('The operation is irreversable!  Would you like to continue?');
  if (c) {
    $.ajax(
      {
        url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky/" + id + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
        type: "DELETE",
        success: function(result) {
          var drivers = sessionStorage.getItem('drivers');
          drivers = drivers.split(',');
          for (var i = 0; i < driver.length; i++) {
            if (drivers[i] === id) {
              drivers[i] = null;
            }
          }
          var D = '';
          var D1 = [];
          for (var i = 0; i < drivers.length; i++) {
            if (drivers[i] !== null) {
              D += (i === 0 ? '' : ',');
              D += drivers[i];
              D1.push(
                {
                  'id': drivers[i]
                }
              );
            }
          }
          console.log(D);
          sessionStorage.setItem('drivers', D);
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky/" + sessionStorage.getItem('id') + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              data: JSON.stringify(
                {
                  "$set": {
                    "driver_list": D1
                  }
                }
              ),
              type: "PUT",
              contentType: "application/json",
              success: function(result) {
                location.reload();
              },
              error: function(error) {
                alert("Error: cannot register!  Please try later.");
              }
            }
          );
        },
        error: function(error) {
          alert("Error: cannot delete!  Please try later.");
        }
      }
    );
  }
}