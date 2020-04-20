(function ($) {
  "use strict";
  // Get input value
  $(document).on('click', '.continue', function () {
    let path = window.location.pathname.replace(/^\/|\/$/g, '');

    switch (path != null) {
      case path === 'index.html' || path === '':
        localStorage.removeItem('checkedEventValue');
        localStorage.setItem('calendarInput', $('#calendarEvents .event-info p').text());
        window.location.href = '/person.html';
        break;

      case path === 'person.html':
        localStorage.setItem('personInput', $('#personCategory .item.selected .item__name').text());
        window.location.href = '/product.html';
        break;

      case path === 'product.html':
        localStorage.setItem('productInput', $('#productPage .item.selected .item__name').text());
        window.location.href = '/notification.html';
        break;

      case path === 'notification.html':
        let notification = [];
        $('#notificationPage .item.selected').each((index, val) => {
          notification.push($(val).find('.item__name').attr('id'))
        });
        localStorage.setItem('notificationInput', JSON.stringify(notification));
        window.location.href = '/customer.html';
        break;

      case path === 'customer.html':
        localStorage.setItem('customerInput', $('#customerPage .item.selected .item__name').text());
        window.location.href = '/keywords.html';
        break;

      case path === 'keywords.html':
        localStorage.setItem('keywordInput', $('#keywordPage .keyword__input').val());
        window.location.href = '/output.html';
        break;
    }
  });

})(jQuery);