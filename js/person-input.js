$(document).ready(function () {
  var categoryEle = $("#personCategory .item");
  categoryEle.on("click", function () {
    categoryEle.removeClass("selected");
    $(this).addClass("selected");

    if (categoryEle.hasClass("selected")) {
      $("#personCategory .action-buttons .continue").removeClass("hidden");
      $("#personCategory .action-buttons .skip").addClass("hidden");
    }
  });
});
