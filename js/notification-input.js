$(document).ready(function () {
  let notificationEle = $("#notificationPage .item");
  let continueBtn = $("#notificationPage .action-buttons .continue");

  notificationEle.on("click", function () {
    $(this).toggleClass("selected");

    if (notificationEle.hasClass("selected")) {
      continueBtn.removeClass("hidden");
    } else {
      continueBtn.addClass("hidden");
    }
  });
});