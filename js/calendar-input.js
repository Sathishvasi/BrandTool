$(document).ready(function () {
    localStorage.clear();
    // Calendar Trigger
    $('#calendarEvents').evoCalendar({
        todayHighlight: true,
        sidebarToggler: true,
        eventListToggler: false,
        eventDisplayDefault: true,
        // canAddEvent: false,
        calendarEvents: [{
                name: "New Year",
                date: "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)",
                type: "holiday",
                everyYear: true
            },
            {
                name: "Valentine's Day",
                date: "Fri Feb 14 2020 00:00:00 GMT-0800 (Pacific Standard Time)",
                type: "holiday",
                everyYear: true
            },
            {
                name: "Event #1",
                date: "April/3/2020",
                type: "event"
            },
            {
                name: "Event #2",
                date: "April/5/2020",
                type: "event"
            },
            {
                name: "Sathish Birthday",
                date: "April/17/2020",
                type: "birthday"
            },
            {
                name: "Author's Birthday",
                date: "February/15/2020",
                type: "birthday",
                everyYear: true
            },
            {
                name: "Holiday #4",
                date: "February/15/2020",
                type: "event"
            },
            {
                name: "Patient #2",
                date: "February/8/2020",
                type: "event"
            },
            {
                name: "Leap day",
                date: "February/29/2020",
                type: "holiday",
                everyYear: true
            }
        ],
        onSelectDate: function () {
            let eventName = $('#calendarEvents .event-info p').text();
            let alreadySelected = $('.calendar-events').hasClass('event-selected');
            if (eventName && alreadySelected) {
                if (localStorage.getItem('checkedEventValue') === eventName) {
                    $('.calendar-events').removeClass('uncheck-event');
                } else {
                    $('.calendar-events').addClass('uncheck-event');
                }
            }
        }
    });

    // Submits event to calendar
    $(document).on('click', '.eventAddButton', function () {
        if ($('#myModal .event-name').val() != '') {
            $("#calendarEvents").evoCalendar('addCalendarEvent', [{
                name: $(this).siblings('input').val(),
                date: $(this).siblings('p').text().replace(/,/g, '').replace(/ /g, '/'),
                type: "event",
                everyYear: false
            }]);
            $('#myModal').hide();
        } else {
            $('.modal-body span').show();
        }
    });

    // Check action in calendar event
    $(document).on('click', '#calendarEvents .event-info', function () {
        localStorage.setItem('checkedEventValue', $('#calendarEvents .event-info p').text());
        let uncheckEvent = $('.calendar-events').hasClass('uncheck-event') ? $('.calendar-events').removeClass('uncheck-event') : '';
        if (uncheckEvent === '') {
            $('.calendar-events').toggleClass('event-selected');
        }
    });

    // Modal logic
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    $(document).on('click', '.myBtn', function () {
        modal.style.display = "block";
        let currentDate = $('.event-header p').text();
        $('.modal-body p').text(currentDate);
        $('#myModal .event-name').val('');
        $('.modal-body span').hide();
    })

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Triggers click action when user clicks enter btn
    $('.modal-body .brand-input').on('keyup', function (event) {
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            $(".modal-body .eventAddButton").click();
        }
    });
});