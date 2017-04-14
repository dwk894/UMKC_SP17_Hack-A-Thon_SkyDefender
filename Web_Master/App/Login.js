$(document).ready(
  function() {
    sessionStorage.setItem('logged_in', '0');  // '0' means false -> not logged in.
  }
);

$(
  function() {
    $('#sign_in').click(
      function() {
        var username = $('#username').val();
        if (username.length === 0 || username === null) {
          $('#password_error').replaceWith('<span id = \'password_error\' class = \'error\' align = \'left\'></span>');
          $('#username_error').replaceWith('<span id = \'username_error\' class = \'error\' align = \'left\'>Error: username cannot be empty!</span>');
        }
        else {
          $.ajax(
            {
              url: "https://api.mlab.com/api/1/databases/skydefender/collections/sky/" + username + "?apiKey=L3tVr3ypZdG3UXlyiek9YP3bZqbBQexR",
              method: 'GET',
              success: function(result) {
                $('#username_error').replaceWith('<span id = \'username_error\' class = \'error\' align = \'left\'></span>');
                var correctPassword = result['password'];
                if ($('#password').val().toLowerCase() !== correctPassword) {
                  $('#password_error').replaceWith('<span id = \'password_error\' class = \'error\' align = \'left\'>Error: password is incorrect!</span>');
                }
                else {
                  $('#password_error').replaceWith('<span id = \'password_error\' class = \'error\' align = \'left\'></span>');
                  sessionStorage.setItem('logged_in', '1');  // '1' means true -> logged in.
                  window.location.href = 'Html/Panel.html';
                }
              },
              error: function(error) {
                $('#username_error').replaceWith('<span id = \'username_error\' class = \'error\' align = \'left\'>Error: the user is not an administrator!</span>');
                $('#password_error').replaceWith('<span id = \'password_error\' class = \'error\' align = \'left\'></span>');
              }
            }
          );
        }
      }
    );
  }
);