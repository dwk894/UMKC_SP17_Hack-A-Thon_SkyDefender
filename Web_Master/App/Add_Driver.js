$(
  function() {
    $('#add').click(
      function() {
        sessionStorage.setItem('newID', $('#n1').val());
        sessionStorage.setItem('newPassword', $('#n2').val());
        sessionStorage.setItem('newEmail', $('#n3').val());
        window.close();
      }
    );
  }
);