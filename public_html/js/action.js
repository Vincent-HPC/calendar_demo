$(document).ready(function () {

  $('.date-block').dblclick(function (e) {
    $('#info-panel').addClass('open').css({
      top: e.pageY + 'px',
      left: e.pageX + 'px',
    }).find('.title [contenteditable]').focus();

    $('#info-panel').addClass('new').removeClass('update');

  });

  $('.event').dblclick(function (e) {

  })


  $('#info-panel')
    .on('click', 'button', function (e) {
      if ($(this).is('.create')) {

      }

      if ($(this).is('.update')) {

      }

      if ($(this).is('.cancel')) {
        $('#info-panel').removeClass('open');
      }

      if ($(this).is('.delete')) {

      }
    })
    .on('click', '.close', function (e) {
      $('button.cancel').click();
    });



});
