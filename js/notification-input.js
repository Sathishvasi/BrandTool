$(document).ready(function () {
  let notificationEle = $("#notificationPage .item");
  let continueBtn = $("#notificationPage .action-buttons .continue");
  checkSelectedValue(notificationEle, 'selectedNotification', continueBtn);
});