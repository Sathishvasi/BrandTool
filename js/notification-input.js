$(document).ready(function () {
  var notificationEle = $("#notificationPage .item");
  notificationEle.on("click", function () {
    $(this).addClass("selected");

    if (notificationEle.hasClass("selected")) {
      $("#notificationPage .action-buttons .continue").removeClass("hidden");
    }
  });
});