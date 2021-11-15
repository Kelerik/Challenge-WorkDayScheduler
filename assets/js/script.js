// array of all the scheduled events for each hour of the day
var timeblockTexts = [];
// range of hours to display (24h format)
var hourStart = 0;
var hourEnd = 23;

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
    newTimeBlock.append(
        $(
            '<textarea class="col pt-3" id=hour-' +
                hourIndex +
                ' spellcheck="false"></textarea>'
        )
    );
    // third column: save button
    newTimeBlock.append(
        $('<div class="col-1 saveBtn"><span class="oi oi-check"></span></div>')
    );
    // place element on page
    $(".container").append(newTimeBlock);
}

// save button click listener
$(".saveBtn").on("click", function () {
    // get relevant textarea element
    var editedTimeblock = $(this).siblings("textarea");
    // get id without the "hour-" text
    console.log(editedTimeblock);
    var editedHour = editedTimeblock.attr("id").replace("hour-", "");
    // read text from the textarea and update the array. using the hour as the index
    timeblockTexts[editedHour] = editedTimeblock.val();

    console.log(timeblockTexts);
});

// run, then update every minute
updateTime();
setInterval(updateTime, 60000);
