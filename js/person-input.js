$(document).ready(function () {
  let categoryEle = $("#personCategory .item");
  let continueBtn = $("#personCategory .action-buttons .continue");
  let skipBtn = $("#personCategory .action-buttons .skip");

  checkSelectedValue(categoryEle,'selectedPerson',continueBtn,skipBtn);

});