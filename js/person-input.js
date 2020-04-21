$(document).ready(function () {
  let categoryEle = $("#personCategory .item");
  let continueBtn = $("#personCategory .action-buttons .continue");
  let skipBtn = $("#personCategory .action-buttons .skip");

  categoryEle.on("click", function () {
    $(this).toggleClass("selected");

    if (categoryEle.hasClass("selected")) {
      continueBtn.removeClass("hidden");
      skipBtn.addClass("hidden");
    } else {
      continueBtn.addClass("hidden");
      skipBtn.removeClass("hidden");
    }
  });
});