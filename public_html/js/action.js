$(document).ready(function () {

  var panel = {
    el: '#info-panel', //el means element
    selectedDateBlock: null,
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

      // get month from #calendar
      var month = $('#calendar').data('month');

      $(panel.el).find('.month').text(month);
      $(panel.el).find('.date').text(date);
      $(panel.el).find('[name="month"]').val(month);
      $(panel.el).find('[name="date"]').val(date);
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

  $(panel.el)
    .on('click', 'button', function (e) {
      if ($(this).is('.create')) {
        // collect data
        var data = $(panel.el).find('form').serialize();

        // AJAX call - create API
        // $.post("event/create.php", data,
        //   function (data, textStatus, jqXHR) {

        //   }
        // );

        // insert into events
        var source = $('#event-template').html();
        var eventTemplate = Handlebars.compile(source);
        var event = {
          id: 1,
          title: "title",
          start_time: "10:20",
        };
        var eventUI = eventTemplate(event);

        // TODO: insert with from time order
        panel.selectedDateBlock.find('.events').append(eventUI);
        panel.close();
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
