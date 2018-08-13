$(document).ready(function () {

  var panel = {
    el: '#info-panel', //el means element
    open: function (isNew, e) {
      $(panel.el).addClass('open').css({
        top: e.pageY + 'px',
        left: e.pageX + 'px',
      }).find('.title [contenteditable]').focus();

      if (isNew)
        $(panel.el).addClass('new').removeClass('update');
      else
        $(panel.el).addClass('update').removeClass('new');
    },
    close: function () {
      $(panel.el).removeClass('open');
    },
  };

  $('.date-block')
    .dblclick(function (e) {
      panel.open(true, e);
    })
    .on('dblclick', '.event', function (e) {
      e.stopPropagation();
      panel.open(false, e);
    });

  $('#info-panel')
    .on('click', 'button', function (e) {
      if ($(this).is('.create')) {

      }

      if ($(this).is('.update')) {

      }

      if ($(this).is('.cancel')) {
        panel.close();
      }

      if ($(this).is('.delete')) {

      }
    })
    .on('click', '.close', function (e) {
      $('button.cancel').click();
    });



});
