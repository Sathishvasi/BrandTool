$(document).ready(function () {
  let productEle = $("#productPage .item");
  let continueBtn = $("#productPage .action-buttons .continue");
  let skipBtn = $("#productPage .action-buttons .skip");

  checkSelectedValue(productEle, 'selectedProduct', continueBtn, skipBtn);

  // Dropdown logic
  $('.search__category').on('change', function () {
    productEle.removeClass('selected');
    continueBtn.addClass("hidden");
    skipBtn.removeClass("hidden");
    let selectedOption = $(this).children("option:selected").val();
    switch (selectedOption) {
      case "men":
        const menImgArray = ['air-zoom-shoe.jpg', 'air-zoom-shoe2.jpg', 'air-zoom-shoe3.jpg', 'joyride-dual-run-running-shoe.jpg', 'joyride-flyknit-aw-running-shoe.jpg', 'joyride-run-flyknit-running-shoe.jpg', 'react-infinity-run-flyknit-running-shoe.jpg', 'zoom-fly-3-running-shoe.jpg', 'zoom-pegasus-turbo-shield-running-shoe.jpg', 'zoom-pegasus-turbo-shoe.jpg'];
        const mentitleArray = ['Air Zoom Shoe', 'Air Zoom Shoe', 'Air Zoom Shoe', 'Joyride Dual Shoe', 'Joyride Flyknit Shoe', 'Joyride Flyknit Shoe', 'React Infinity Flyknit Shoe', 'Zoom Fly Shoe', 'Zoom Pegasus Shoe', 'Zoom Pegasus Shoe'];
        const menPath = 'images/men/';
        renderProducts(menImgArray, mentitleArray, menPath, selectedOption);
        break;
      case "women":
        const womenImgArray = ['air-force-1.jpg', 'air-force-2.jpg', 'air-force-3.jpg', 'air-max-1.jpg', 'air-max-2.jpg', 'air-zoom.jpg', 'react-infinity.jpg', 'superrep-go-training.jpg', 'zoom-2k.jpg', 'zoomx-vista-grind.jpg'];
        const womenTitleArray = ['Air Force Shoe', 'Air Force Shoe', 'Air Force Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Zoom Shoe', 'React Infinity Shoe', 'Superrep Training Shoe', 'Zoom 2k Shoe', 'Zoom vista Shoe'];
        const womenPath = 'images/women/';
        renderProducts(womenImgArray, womenTitleArray, womenPath, selectedOption);
        break;
      case "kids":
        const kidsImgArray = ['air-jordan.jpg', 'air-max-1.jpg', 'air-max-2.jpg', 'air-max-3.jpg', 'air-max-4.jpg', 'air-max-5.jpg', 'air-max-6.jpg', 'air-max-7.jpg', 'drop-type.jpg', 'jr-mercurial-vapor.jpg'];
        const kidsTitleArray = ['Air Jordan Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Drop Type Shoe', 'JR Mercurial Shoe'];
        const kidsPath = 'images/kids/';
        renderProducts(kidsImgArray, kidsTitleArray, kidsPath, selectedOption);
        break;
      case "default":
        const defaultImgArray = ['air-force-1.jpg', 'air-force-2.jpg', 'air-force-3.jpg', 'air-jordan-1.jpg', 'air-max-1.jpg', 'air-max-2.jpg', 'air-max-3.jpg', 'air-zoom-1.jpg', 'air-zoom-2.jpg', 'air-zoom-3.jpg'];
        const defaultTitleArray = ['Air Force Shoe', 'Air Force Shoe', 'Air Force Shoe', 'Air Jordan Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Max Shoe', 'Air Zoom Shoe', 'Air Zoom Shoe', 'Air Zoom Shoe'];
        const defaultPath = 'images/default/';
        renderProducts(defaultImgArray, defaultTitleArray, defaultPath, selectedOption);
        break;
    }
  });

  function renderProducts(imgArray, titleArray, path, selectedOption) {
    $('#productItems .row .item').each(function (index, val) {
      $(val).find('.preview-img').attr('src', path + imgArray[index]);
      $(val).find('.item__name').text(titleArray[index]);
      $(val).attr('id', selectedOption + (index + 1))
    });

    if (localStorage.getItem('selectedProduct') && JSON.parse(localStorage.getItem('selectedProduct')).length) {
      let localArray = JSON.parse(localStorage.getItem('selectedProduct'));
      localArray.forEach(element => {
        $('#' + element).addClass('selected')
      });
      continueBtn.removeClass("hidden");
      skipBtn ? skipBtn.addClass("hidden") : '';
    }
  }

});