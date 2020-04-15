(function ($) {
  "use strict";
  // Get input value
  $(document).on('click', '.contine-btn', function () {
    let path = window.location.pathname.replace(/^\/|\/$/g, '');

    switch (path!=null) {
      case path==='index.html' || path==='':
        localStorage.removeItem('checkedEventValue');
        localStorage.setItem('calendarInput', $('#calendarEvents .event-info p').text());
        window.location.href = '/person.html';
        break;
    }
  });

})(jQuery);