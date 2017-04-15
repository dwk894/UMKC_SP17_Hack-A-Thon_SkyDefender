$(
  function() {
    $('#add').click(
      function() {
        var n1 = $('#n1').val();
        var n2 = $('#n2').val();
        var n3 = $('#n3').val();
        if (n1 !== null && n2 !== null && n3 !== null) {
          localStorage.setItem('add_driver', '1');
          localStorage.setItem('newID', n1);
          localStorage.setItem('newPassword', n2);
          localStorage.setItem('newEmail', n3);
        }
        else {
          localStorage.setItem('add_driver', '0');
        }
        window.close();
      }
    );
  }
);