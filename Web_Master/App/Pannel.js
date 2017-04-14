window.onload = function() {
  //  if (sessionStorage.getItem('logged_in') !== '1') {
  //    alert('Please log in first.');
  //    window.location.href = '../index.html';
  //  }
  var drivers = sessionStorage.getItem('drivers');
  drivers = drivers.split(',');
  var driver_script = '';
  for (var i = 0; i < drivers.length; i++) {
    driver_script += '<tr>';
    driver_script += '<td class = \'driver\'>' + drivers[i] + '</td>';
    driver_script += '<td class = \'button_2\' align = \'right\'><button class = \'small_button\' onclick = \'delete(' + drivers[0] + ');\'>' + 'Delete' + '</button>' + '<button class = \'small_button\' onclick = \'location(' + drivers[0] + ');\'>' + 'Location' + '</button>' + '</td>';
    driver_script += '</tr>';
  }
  $('#driver').replaceWith(driver_script);
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
              $.ajax(
                {
                  url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
                  data: JSON.stringify(
                    {
                      "_id": sessionStorage.getItem('newID'),
                      "password": sessionStorage.getItem('newPassword'),
                      "email": sessionStorage.getItem('newEmail'),
                      "admin": "0",
                      "source": JSON.parse(sessionStorage.getItem('source')),
                      "distination": JSON.parse(sessionStorage.getItem('destination')),
                    }
                  ),
                  type: "POST",
                  contentType: "application/json",
                  success: function(result) {
                    alert("Good!");
                  },
                  error: function(error) {
                    alert("Cannot register.  Please try later.");
                  }
                }
              );
              alert("Good!");
            }
          }, 500
        );
      }
    );
  }
);

function reload_drivers() {
  var drivers = sessionStorage.getItem('drivers');
  drivers = drivers.split(',');
  var driver_script = '';
  for (var i = 0; i < drivers.length; i++) {
    driver_script += '<tr>';
    driver_script += '<td class = \'driver\'>' + drivers[i] + '</td>';
    driver_script += '<td class = \'button_2\' align = \'right\'><button class = \'small_button\' onclick = \'delete(' + drivers[0] + ');\'>' + 'Delete' + '</button>' + '<button class = \'small_button\' onclick = \'location(' + drivers[0] + ');\'>' + 'Location' + '</button>' + '</td>';
    driver_script += '</tr>';
  }
  $('#driver').replaceWith(driver_script);
}
