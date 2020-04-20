$(document).ready(function () {
    $('.keyword button').on('click', function () {
        if ($('.keyword input').length <= 5) {
            $('.keyword').append(`<input type="text" class="keyword__input" id="keyword1" placeholder="Add keywords..." />`);
            if ($('.keyword input').length === 6) {
                $(this).hide();
            }
        }
    })
})