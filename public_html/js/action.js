$(document).ready(function () {

  var source = $('#event-template').html();
  var eventTemplate = Handlebars.compile(source);

  var panel = {
    el: '#info-panel', //el means element
    selectedDateBlock: null,
    selectedEvent: null,
    init: function (isNew, e) {

      panel.clear();
      panel.updateDate(e);

      if (isNew) {
        $(panel.el).addClass('new').removeClass('update');
        panel.selectedDateBlock = $(e.currentTarget);
      } else {
        $(panel.el).addClass('update').removeClass('new');
        panel.selectedDateBlock = $(e.currentTarget).closest('.date-block');
      }
    },
    clear: function () {
      $(panel.el).find('input').val('');
      $(panel.el).find('textarea').val('');
    },
    open: function (isNew, e) {
      panel.init(isNew, e);

      panel.hideError();

      $(panel.el).addClass('open').css({
        top: e.pageY + 'px',
        left: e.pageX + 'px',
      }).find('.title [contenteditable]').focus();

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

      var year = $('#calendar').data('year');
      var month = $('#calendar').data('month');

      $(panel.el).find('.month').text(month);
      $(panel.el).find('.date').text(date);
      $(panel.el).find('[name="year"]').val(year);
      $(panel.el).find('[name="month"]').val(month);
      $(panel.el).find('[name="date"]').val(date);
    },
    showError: function (msg) {
      $(panel.el).find('.error-msg').addClass('open')
        .find('.alert').text(msg);
    },
    hideError: function () {
      $(panel.el).find('.error-msg').removeClass('open');
    },
  };

  $('.date-block')
    .dblclick(function (e) {
      panel.open(true, e);
    })
    .on('dblclick', '.event', function (e) {
      e.stopPropagation();
      panel.open(false, e);

      panel.selectedEvent = $(e.currentTarget);

      var id = $(this).data('id');
      // AJAX call - get event detail
      // load detail back to panel
    });

  $(panel.el)
    .on('click', 'button', function (e) {
      if ($(this).is('.create')) {
        var data = $(panel.el).find('form').serialize();
        $.post("event/create.php", data)
          .done(function (data, textStatus, jqXHR) {
            var eventUI = eventTemplate(data);

            // TODO: insert with from time order
            panel.selectedDateBlock.find('.events').append(eventUI);
            panel.close();
          })
          .fail(function (jqXHR, textStatus, errorThrown) { // use fail() to process failed case
            panel.showError(jqXHR.responseText);
          });
      }

      if ($(this).is('.update')) {
        // TODO
        // collect from data  
        // AJAX call - update.php with id
        // update event UI
      }

      if ($(this).is('.cancel')) {
        panel.close();
      }

      if ($(this).is('.delete')) {
        // id
        var id = panel.selectedEvent.data('id');
        // AJAX call - delete.php with id
        // remove event from calendar
        panel.selectedEvent.remove();
        panel.close();
      }
    })
    .on('click', '.close', function (e) {
      $('button.cancel').click();
    });

});
