$(document).ready(function () {
  var customerEle = $("#customerPage .item");
  let continueBtn = $("#customerPage .action-buttons .continue");
  checkSelectedValue(customerEle, 'selectedCustomer', continueBtn);

  // customerEle.on("click", function () {
  //   customerEle.removeClass("selected");
  //   $(this).addClass("selected");

  //   if (customerEle.hasClass("selected")) {
  //     $("#customerPage .action-buttons .continue").removeClass("hidden");
  //   }
  // });
});
