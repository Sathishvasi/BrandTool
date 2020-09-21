$(document).ready(function () {

    $.getJSON("./data/output.json", function (response) {

        response.forEach(function (val, index) {
            // Sorts card alignment
            val.brandCopywritingPrase = val.brandCopywritingPrase.sort((a, b) => parseFloat(a.cardAlignment) - parseFloat(b.cardAlignment));

            // Filters response from selectedNotification
            let selectedNotification = JSON.parse(localStorage.getItem('selectedNotification'));
            selectedNotification = selectedNotification.map(function (x) {
                return x.toLowerCase()
            });

            if (selectedNotification.includes(val.notificationType.toLowerCase())) {
                switch (val.notificationType) {
                    case 'Email':
                        renderTaglineCards('email', val, index);
                        break;
                    case 'SMS':
                        renderTaglineCards('sms', val, index);
                        break;
                    case 'PushNotification':
                        renderTaglineCards('push', val, index);
                        break;
                }
            }
        });
        let firstChild = $('#outputPage .tabs .item:not(.hidden)').eq(0);
        let activeTab = firstChild.attr('id');
        // First Tab active 
        firstChild.addClass('active');
        // Content enable
        $('#outputPage.page-content').addClass(activeTab + '-active');
        // Left Banner Image enable
        $('.output-left-nav .left-nav__image img').attr('src', 'images/' + activeTab + '-banner.png');
    });

    function renderTaglineCards(type, val, order) {
        order += 1;
        // Enable notification tab
        $('#' + type).removeClass('hidden');

        // Parent Element of slider
        $('.tagline-details').append(`<div id="taglineSlider${order}" class="taglines ${type}-content"><ul class="flip-items row"></ul></div>`);

        // Tagline card render
        val.brandCopywritingPrase.forEach(function (tagData, index) {
            let id = index + 1;
            let uniqueID = order.toString() + id.toString();

            // Scores calc
            let formalityScore = (JSON.parse(tagData.formalityScore).toFixed(1) / 1) * 100;
            let frustationScore = (JSON.parse(tagData.frustationScore).toFixed(1) / 1) * 100;
            let politenessScore = (JSON.parse(tagData.politenessScore).toFixed(1) / 1) * 100;
            let totalscore = (JSON.parse(tagData.totalscore).toFixed(1) / 1) * 100;

            $(`#taglineSlider${order} .row`).append(`<li class="card${id}" data-flip-title="Item Title ${id}">
            <div class="tag">
                <div class="tag-input">
                    <input type="text">
                    <img src="images/checked-gray.svg" />
                </div>
                <h3 class="title">${tagData.phrase}</h3>
                <div class="actions">
                    <img class="action edit-tagline" src="images/Group 809.svg" alt="action" />
                    <img class="action proceed-tagline" src="images/Group 808.svg" alt="action" />
                </div>
                <div class="score-details">
                    <div class="target">
                        <div id="tierPointsValue${uniqueID}" class="target-chart" data-percent="">
                            <div class="target-percentage">
                                <div id="totalPoints${uniqueID}" class="totalTierPoints" data-value="${totalscore}"></div>
                                <div class="points-random">Total Score</div>
                            </div>
                        </div>
                    </div>
                    <div class="progress">
                        <div id="category" class="container">
                            <div class="fillmult" id="formality" data-width="${formalityScore}%">
                                <span><b>Formality</b></span>
                            </div>
                        </div>
                        <div id="category" class="container">
                            <div class="fillmult" id="politeness" data-width="${politenessScore}%">
                                <span><b>Politeness</b></span>
                            </div>
                        </div>
                        <div id="category" class="container">
                            <div class="fillmult" id="frustation" data-width="${frustationScore}%">
                                <span><b>Frustation</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>`);
            // Render Score logic
            scoreProgress(uniqueID);
        });

        var flipContainer = $('#taglineSlider' + order),
            flipItemContainer = flipContainer.find('.flip-items'),
            flipItem = flipContainer.find('li');

        flipContainer.flipster({
            itemContainer: flipItemContainer,
            itemSelector: flipItem,
            loop: true,
            style: 'carousel',
            spacing: -0.6,
            scrollwheel: false,
            buttons: false
        });
    }

    function scoreProgress(ID) {
        // Score calc logic
        var dataPercentage = JSON.parse($('#totalPoints' + ID).attr('data-value'));
        $('#totalPoints' + ID).text(dataPercentage);

        $("#tierPointsValue" + ID).easyPieChart({
            animate: 2000,
            lineWidth: 18,
            scaleColor: false,
            lineCap: 'square',
            size: 180,
            trackColor: "#999999",
            barColor: "#326ec8"
        });

        // Updates Score progress
        $("#tierPointsValue" + ID).data('easyPieChart').update(dataPercentage);

        // Progress Bar logic
        $(`#tierPointsValue${ID}`).closest('.score-details').find('.progress .fillmult').each(function () {
            var width = $(this).attr('data-width');
            $(this).animate({
                width: width
            }, 2000);
            $(this).next('.perc').remove();
            $(this).after('<span class="perc">' + width + '</span>');
            $('.perc').delay(2000).fadeIn(1000);
        });
    }

    // Edit Tagline
    $(document).on('click', '#outputPage .edit-tagline', function () {
        let rootTag = $(this).closest('.tag');
        rootTag.addClass('edit-mode');
        rootTag.find('.tag-input input').val(rootTag.find('.title').text());
    });

    // Approve Tagline
    $(document).on('click', '#outputPage .proceed-tagline', function () {
        $('#confirmTagline .modal-body p').text($(this).closest('.tag').find('.title').text());
        $('#confirmTagline').show();
    });


    $(document).on('click', '.closeModal', function () {
        $('#confirmTagline').hide();
    });

    $(document).on('keyup', '#outputPage .tag-input input', function (event) {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            $(this).next().click();
        }
    });

    // Edit value submit
    $(document).on('click', '#outputPage .tag-input img', function () {
        const rootEle= $(this).closest('.tag');

        rootEle.find('.title').text($(this).prev().val());
        rootEle.removeClass('edit-mode');

        //Clicked card element ID
        let cardID = rootEle.find('.score-details .target-chart').attr('id');
        
        // Dynamic score
        $(`#${cardID} .totalTierPoints`).attr('data-value','80');

        // Dynamic progress value
        rootEle.find('.score-details #formality').attr('data-width','60%');
        rootEle.find('.score-details #politeness').attr('data-width','80%');
        rootEle.find('.score-details #frustation').attr('data-width','50%');

        let uniqueID = cardID.substr(cardID.length-2,2);
        
        scoreProgress(uniqueID);
    });

    // Image update 
    $('#outputPage .item').on('click', function () {
        $('#outputPage .item').removeClass('active');
        $(this).addClass('active');
        let notificationType = $(this).attr('id');
        switch (notificationType) {
            case 'email':
                $('#outputPage').removeClass('sms-active push-active');
                $('#outputPage').addClass('email-active');
                $('.left-nav .left-nav__image img').attr('src', 'images/email-banner.png');
                break;
            case 'sms':
                $('#outputPage').removeClass('email-active push-active');
                $('#outputPage').addClass('sms-active');
                $('.left-nav .left-nav__image img').attr('src', 'images/sms-banner.png');
                break;
            case 'push':
                $('#outputPage').removeClass('sms-active email-active');
                $('#outputPage').addClass('push-active');
                $('.left-nav .left-nav__image img').attr('src', 'images/push-banner.png');
                break;
        }
    });
});