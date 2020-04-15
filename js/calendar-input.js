$(document).ready(function () {
    localStorage.removeItem('checkedEventValue');
    localStorage.removeItem('calendarInput');
    // Calendar Trigger
    $('#calendarEvents').evoCalendar({
        todayHighlight: true,
        sidebarToggler: true,
        eventListToggler: false,
        eventDisplayDefault: true,
        canAddEvent: false,
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

    $(document).on('click', '#calendarEvents .event-info', function () {
        localStorage.setItem('checkedEventValue', $('#calendarEvents .event-info p').text());
        let uncheckEvent = $('.calendar-events').hasClass('uncheck-event') ? $('.calendar-events').removeClass('uncheck-event') : '';
        if (uncheckEvent === '') {
            $('.calendar-events').toggleClass('event-selected');
        }
    })
});