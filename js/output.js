$(document).ready(function () {
    $.getJSON("../data/output.json", function (json) {
        console.log(json);
    });

    // Edit Tagline
    $('.edit-tagline').on('click', function () {
        $(this).closest('.tag').addClass('edit-mode');
    });

    $('.tag-input input').on('keyup', function (event) {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            $(this).next().click();
        }
    });

    $('.tag-input img').on('click', function () {
        $(this).closest('.tag').find('.title').text($(this).prev().val());
        $(this).closest('.tag').removeClass('edit-mode');
    });

    // Notification type tabs logics
    let notificationType = JSON.parse(localStorage.getItem('notificationInput'));
    notificationType.forEach((val, index) => {
        if (index === 0) {
            $('#' + val).addClass('active')
        }
        $('#' + val).removeClass('hidden');
    })

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
            case 'pushNotification':
                $('#outputPage').removeClass('sms-active mail-active');
                $('#outputPage').addClass('push-active');
                $('.left-nav .left-nav__image img').attr('src', 'images/push-banner.png');
                break;
        }
    });

    // Trigger scoreProgress
    $('#outputPage .view-detail').on('click', function () {
        $('#outputPage').addClass('show-progress');
        $('#outputPage .score-details').append(`<h3>Progress Details</h1>
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