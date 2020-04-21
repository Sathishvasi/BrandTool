$(document).ready(function () {
    $.getJSON("../data/output.json", function (response) {
        response.forEach(function (val, index) {
            switch (val.notificationType) {
                case 'Email':
                    renderTaglineCards('email', val);
                    break;
                case 'SMS':
                    renderTaglineCards('sms', val);
                    break;
                case 'PushNotification':
                    renderTaglineCards('push', val);
                    break;
            }
        });
        let firstChild = $('.tabs .item:not(.hidden)').eq(0);
        let activeTab = firstChild.attr('id');
        // First Tab active 
        firstChild.addClass('active');
        // Content enable
        $('.page-content').addClass(activeTab + '-active');
        // Left Banner Image enable
        $('.left-nav .left-nav__image img').attr('src', 'images/' + activeTab + '-banner.png');
    });

    function renderTaglineCards(type, val) {
        let tagElement = '';
        // Enable notification tab
        $('#' + type).removeClass('hidden');
        // Tagline card render
        val.brandCopywritingPrase.forEach(function (tagData, index) {
            tagElement += `<div class="tag" data-ploite="${tagData.politenessScore}" data-formality="${tagData.formalityScore}" data-frustation="${tagData.frustationScore}" data-total="${tagData.totalscore}">
                        <div class="tag-input">
                            <input type="text">
                            <img src="images/checked-gray.svg" />
                        </div>
                        <h3 class="title">${tagData.phrase}</h3>
                        <div class="actions">
                            <img class="action" src="images/Group 808.svg" alt="action" />
                            <img class="action edit-tagline" src="images/Group 809.svg" alt="action" />
                            <img class="action view-detail" src="images/Group 810.svg" alt="action" />
                        </div>
                    </div>`;
        });
        $('.tagline-details').append(`<div class="taglines ${type}-content"><div class="row">${tagElement}</div></div>`);
    }

    // Edit Tagline
    $(document).on('click', '.edit-tagline', function () {
        let rootTag = $(this).closest('.tag');
        rootTag.addClass('edit-mode');
        rootTag.find('.tag-input input').val(rootTag.find('.title').text());
    });

    $(document).on('keyup', '.tag-input input', function (event) {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            $(this).next().click();
        }
    });

    $(document).on('click', '.tag-input img', function () {
        $(this).closest('.tag').find('.title').text($(this).prev().val());
        $(this).closest('.tag').removeClass('edit-mode');
    });

    // Image update 
    $('#outputPage .item').on('click', function () {
        $('#outputPage .item').removeClass('active');
        $('#outputPage').removeClass('show-progress');
        $('#outputPage .score-details').children().remove();
        $(this).addClass('active');
        let notificationType = $(this).attr('id');
        switch (notificationType) {
            case 'email':
                $('#outputPage').removeClass('sms-active push-active');
                $('#outputPage').addClass('mail-active');
                $('.left-nav .left-nav__image img').attr('src', 'images/email-banner.png');
                break;
            case 'sms':
                $('#outputPage').removeClass('mail-active push-active');
                $('#outputPage').addClass('sms-active');
                $('.left-nav .left-nav__image img').attr('src', 'images/sms-banner.png');
                break;
            case 'push':
                $('#outputPage').removeClass('sms-active mail-active');
                $('#outputPage').addClass('push-active');
                $('.left-nav .left-nav__image img').attr('src', 'images/push-banner.png');
                break;
        }
    });

    // Trigger scoreProgress
    $(document).on('click', '#outputPage .view-detail', function () {
        $('#outputPage').addClass('show-progress');
        $('#outputPage .score-details').append(`<h3>${$(this).closest('.tag').find('.title').text()}</h1>
        <div class="target">
            <div id="tierPointsValue" class="target-chart" data-percent="">
                <div class="target-percentage">
                    <div id="totalPoints" class="totalTierPoints" data-value="68"></div>
                    <div class="points-random">Total Score</div>
                </div>
            </div>
        </div>

        <div class="progress">
            <div id="category" class="container">
                <div class="fillmult" data-width="85%">
                    <span><b>Category</b></span>
                </div>
            </div>

            <div id="category" class="container">
                <div class="fillmult" data-width="50%">
                    <span><b>Formality</b></span>
                </div>
            </div>
            <div id="category" class="container">
                <div class="fillmult" data-width="70%">
                    <span><b>Politeness</b></span>
                </div>
            </div>
            <div id="category" class="container">
                <div class="fillmult" data-width="25%">
                    <span><b>Frustation</b></span>
                </div>
            </div>
        </div>`);
        scoreProgress();
    });

    function scoreProgress() {
        // Score calc logic
        var dataPercentage = $('#totalPoints').data('value');
        $('#totalPoints').text(dataPercentage)

        $("#tierPointsValue").attr("data-percent", dataPercentage);
        $('.target-chart').easyPieChart({
            animate: 2000,
            lineWidth: 18,
            scaleColor: false,
            lineCap: 'square',
            size: 200,
            trackColor: "#999999",
            barColor: "#326ec8"
        });

        $('#outputPage .totalTierPoints').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });

        // Progress Bar logic
        $('#outputPage .progress .container > div').each(function () {
            var width = $(this).data('width');
            $(this).animate({
                width: width
            }, 2500);
            $(this).after('<span class="perc">' + width + '</span>');
            $('.perc').delay(2000).fadeIn(1000);
        });
    }
})