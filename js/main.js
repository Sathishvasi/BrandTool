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
        localStorage.setItem('personInput', $('.category.selected .category__name').text());
        window.location.href = '/product.html';
        break;

      case path === 'product.html':
        localStorage.setItem('productInput', $('.product.selected .product__details__title').text());
        window.location.href = '/';
        break;
    }
  });

})(jQuery);