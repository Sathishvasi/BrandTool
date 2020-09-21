// Get input value
$(document).on('click', '.continue', function () {
  let path = window.location.pathname.replace(/^\/|\/$/g, '');

  switch (path != null) {
    case path === 'index.html' || path === '' || path === 'BrandTool':
      localStorage.removeItem('checkedEventValue');
      localStorage.setItem('calendarInput', $('#calendarEvents .event-info p').text());
      window.location.href = 'person.html';
      break;

    case path === 'person.html' || path === 'BrandTool/person.html':
      localStorage.setItem('personInput', $('#personCategory .item.selected .item__name').text());
      window.location.href = 'product.html';
      break;

    case path === 'product.html' || path === 'BrandTool/product.html':
      localStorage.setItem('productInput', $('#productPage .item.selected .item__name').text());
      window.location.href = 'notification.html';
      break;

    case path === 'notification.html' || path === 'BrandTool/notification.html':
      let notification = [];
      // $('#notificationPage .item.selected').each((index, val) => {
      //   notification.push($(val).find('.item__name').attr('id'))
      // });
      // localStorage.setItem('notificationInput', JSON.stringify(notification));
      window.location.href = 'customer.html';
      break;

    case path === 'customer.html' || path === 'BrandTool/customer.html':
      localStorage.setItem('customerInput', $('#customerPage .item.selected .item__name').text());
      window.location.href = 'keywords.html';
      break;

    case path === 'keywords.html' || path === 'BrandTool/keywords.html':
      localStorage.setItem('keywordInput', $('#keywordPage .keyword__input').val());
      window.location.href = 'output.html';
      break;
  }
});

function checkSelectedValue(rootEle, storageValue, continueBtn, skipBtn) {
  let customArray = [];
  let localArray = [];

  // On load Getting Selcted person inputs
  if (localStorage.getItem(storageValue) && JSON.parse(localStorage.getItem(storageValue)).length) {
    localArray = JSON.parse(localStorage.getItem(storageValue));

    // Customer page specific condition
    if (storageValue === 'selectedCustomer') {
      $('#' + localArray).addClass('selected')
    } else {
      localArray.forEach(element => {
        $('#' + element).addClass('selected')
      });
    }
    continueBtn.removeClass("hidden");
    skipBtn ? skipBtn.addClass("hidden") : '';
  }

  // ONCLICK ITEM
  rootEle.on("click", function (event) {

    $(this).toggleClass("selected");

    if (rootEle.hasClass("selected")) {
      // Customer page specific condition
      if (storageValue === 'selectedCustomer') {
        rootEle.removeClass("selected");
        $(this).addClass("selected");
        continueBtn.removeClass("hidden");
      } else {
        continueBtn.removeClass("hidden");
        skipBtn ? skipBtn.addClass("hidden") : '';
      }
    } else {
      continueBtn.addClass("hidden");
      skipBtn ? skipBtn.removeClass("hidden") : '';
    }

    // Selected item ID
    let selectedItem = $(this).attr('id');

    if ($(this).hasClass("selected")) {
      // Current custom event ADD
      customArray.push(selectedItem);
    } else {
      // Current custom event REMOVE
      customArray.splice(customArray.indexOf(selectedItem), 1);
      localArray.splice(localArray.indexOf(selectedItem), 1);
    }
    // Setting Local custom events 
    if (storageValue === 'selectedCustomer') {
      // Customer page specific condition
      localStorage.setItem(storageValue, JSON.stringify(selectedItem))
    } else {
      customArray = customArray.concat(localArray);
      customArray = removeDuplicates(customArray);
      localStorage.setItem(storageValue, JSON.stringify(customArray));
    }
  });
}

function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
}