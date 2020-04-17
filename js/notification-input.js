$(document).ready(function () {
  var notificationEle = $("#notificationPage .item");
  notificationEle.on("click", function () {
    notificationEle.removeClass("selected");
    $(this).addClass("selected");

    if (notificationEle.hasClass("selected")) {
      $("#notificationPage .action-buttons .continue").removeClass("hidden");
      $("#notificationPage .action-buttons .skip").addClass("hidden");
    }
  });
});
