$(document).ready(function () {

  var panel = {
    el: '#info-panel', //el means element
    open: function (isNew, e) {
      $(panel.el).addClass('open').css({
        top: e.pageY + 'px',
        left: e.pageX + 'px',
      }).find('.title [contenteditable]').focus();

      panel.updateDate(e);

      if (isNew)
        $(panel.el).addClass('new').removeClass('update');
      else
        $(panel.el).addClass('update').removeClass('new');
    },
    close: function (e) {
      $(panel.el).removeClass('open');
    },
    updateDate: function (e) {
      // get data from .date-block
      if ($(e.currentTarget).is('.date-block')) //dblclick .date-block
        var date = $(e.currentTarget).data('date');
      else // dblclick .event
        var date = $(e.currentTarget).closest('.date-block').data('date');

      // get month from #calendar
      var month = $('#calendar').data('month');

      $(panel.el).find('.month').text(month);
      $(panel.el).find('.date').text(date);

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
