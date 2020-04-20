$(document).ready(function () {
  var customerEle = $("#customerPage .item");
  customerEle.on("click", function () {
    customerEle.removeClass("selected");
    $(this).addClass("selected");

    if (customerEle.hasClass("selected")) {
      $("#customerPage .action-buttons .continue").removeClass("hidden");
    }
  });
});
