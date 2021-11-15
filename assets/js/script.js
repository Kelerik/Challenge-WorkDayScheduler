// array of all the scheduled events for each hour of the day
var timeblockTexts = [];
// range of hours to display (24h format)
var hourStart = 7;
var hourEnd = 17;

var updateTime = function () {
    // display date in the header
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    // update the timeblocks to appropriate colours based on current hour
    for (let hourIndex = hourStart; hourIndex <= hourEnd; hourIndex++) {
        if (hourIndex < moment().format("H")) {
            var timeClass = "past";
        } else if (hourIndex == moment().format("H")) {
            var timeClass = "present";
        } else {
            var timeClass = "future";
        }
        $("#hour-" + hourIndex).addClass(timeClass);
    }
};

// build the timeblock elements
var buildTimeblocks = function () {
    for (let hourIndex = hourStart; hourIndex <= hourEnd; hourIndex++) {
        // convert hour to 12h format ("13" becomes "1pm")
        var hourText = moment(hourIndex, "H").format("ha");

        // declare timeblock var for the iterated hour
        var newTimeBlock = $("<div class='row'>");

        // first column: time
        newTimeBlock.append(
            $('<div class="col-2 pt-3 hour">' + hourText + "</div>")
        );

        // second column: timeblock text area
        // check if any data loaded
        if (timeblockTexts[hourIndex]) {
            var timeBlockTextInsert = timeblockTexts[hourIndex];
        } else {
            var timeBlockTextInsert = "";
        }
        // append element with proper ID and text value
        newTimeBlock.append(
            $(
                '<textarea class="col pt-3" id=hour-' +
                    hourIndex +
                    ' spellcheck="false">' +
                    timeBlockTextInsert +
                    "</textarea>"
            )
        );

        // third column: save button
        newTimeBlock.append(
            $(
                '<div class="col-1 saveBtn"><span class="oi oi-check"></span></div>'
            )
        );

        // place element on page
        $(".container").append(newTimeBlock);
    }
};

// load localstorage data
var loadLocalStorage = function () {
    var loadedData = JSON.parse(localStorage.getItem("timeblockEventData"));
    if (loadedData != null) {
        timeblockTexts = loadedData;
    }
};

// run, then update every minute
loadLocalStorage();
buildTimeblocks();
updateTime();
setInterval(updateTime, 60000);

// save button click listener
$(".saveBtn").on("click", function () {
    // get relevant textarea element
    var editedTimeblock = $(this).siblings("textarea");
    // get id without the "hour-" text
    var editedHour = editedTimeblock.attr("id").replace("hour-", "");
    // read text from the textarea and update the array. using the hour as the index
    timeblockTexts[editedHour] = editedTimeblock.val();
    // save to localstorage
    localStorage.setItem("timeblockEventData", JSON.stringify(timeblockTexts));
});
