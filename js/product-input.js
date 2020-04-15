$(document).ready(function () {
    var productEle = $('#productPage .product');
    productEle.on('click',function(){
        productEle.removeClass('selected');
        $(this).addClass('selected');

        if(productEle.hasClass('selected')){
            $('#productPage .action-buttons .continue').removeClass('hidden');
            $('#productPage .action-buttons .skip').addClass('hidden');
        }
    })   
})