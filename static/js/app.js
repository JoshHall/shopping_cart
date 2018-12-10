// on page load, insert navbar.html into header using jquery
$.get('../../components/navbar.html', function(response) {
  $('#nav').html(response);
});
