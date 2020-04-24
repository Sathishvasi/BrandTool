$(document).ready(function () {
    let continueBtn = $("#keywordPage .action-buttons .continue");
    let skipBtn = $("#keywordPage .action-buttons .skip");
    $('.keyword__delete-btn').hide();
    $('.keyword__add-btn').on('click', function () {
        if ($('.keyword input').length <= 5) {
            $('.keyword').append(`<div class="keyword__input-wrapper"><input type="text" class="keyword__input" id="keyword1" placeholder="Add keywords..." /><img class="keyword__delete-btn" src="/images/delete-icon.svg" alt="Delete Keyword" /></div>`);
            if ($('.keyword input').length === 6) {
                $(this).hide();
            }
            $('.keyword__delete-btn').show();
        }
    });

    $(document).on('click', '.keyword__delete-btn', function () {
        $(this).closest('.keyword__input-wrapper').remove();
        if ($('.keyword__input-wrapper').length === 5) {
            $('.keyword__add-btn').show();
        } else if ($('.keyword__input-wrapper').length === 1) {
            $('.keyword__delete-btn').hide();
        }
    });

    $(document).on('keyup', '.keyword__input', function () {
        $('.keyword__input').each((index, el) => {
            if ($(el).val()) {
                continueBtn.removeClass("hidden");
                skipBtn.addClass("hidden");
                return false;
            } else {
                continueBtn.addClass("hidden");
                skipBtn.removeClass("hidden");
            }
        });
    });

})