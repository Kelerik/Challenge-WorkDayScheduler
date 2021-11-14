var updateTime = function () {
    // display date in the header
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    // update the timeblocks to appropriate colours based on current hour
    // --- TODO
};

for (let hourIndex = 0; hourIndex <= 23; hourIndex++) {
    // convert hour to more readable format ("7" becomes "7am")
    var hourText = moment(hourIndex, "H").format("ha");

    // declare timeblock var for the iterated hour
    var newTimeBlock = $("<div class='row' id='hour-" + hourIndex + "'>");

    // first column: time
    newTimeBlock.append(
        $('<div class="col-2 pt-3 hour">' + hourText + "</div>")
    );
    // second column: timeblock text
    if (hourIndex < moment().format("H")) {
        var timeClass = "past";
    } else if (hourIndex == moment().format("H")) {
        var timeClass = "present";
    } else {
        var timeClass = "future";
    }
    newTimeBlock.append(
        $(
            '<div class="col pt-3 timeblock-text-container ' +
                timeClass +
                '"><span class="timeblock-text"></span></div>'
        )
    );
    // third column: save button
    newTimeBlock.append(
        $('<div class="col-1 editBtn"><span class="oi oi-pencil"></span></div>')
    );
    // place element on page
    $(".container").append(newTimeBlock);
}

// row click listener
$(".row").on("click", function () {
    console.log(this);
    // search down the children tree to find the specific class
    var timeblockArea = $(this).find(".timeblock-text");
    // get its current text content
    var timeblockText = timeblockArea.text().trim();
    // create textarea element with that text inside
    var timeblockInput = $("<textarea>").val(timeblockText);
    // replace the text with the textarea element
    timeblockArea.replaceWith(timeblockInput);
    // automatically focus on it
    timeblockInput.trigger("focus");
    // change the edit button into a save button
    $(this).find(".oi-pencil").removeClass("oi-pencil").addClass("oi-check");
    $(this).find(".editBtn").removeClass("editBtn").addClass("saveBtn");
    console.log(this);
});

// save button click listener
$(".saveBtn").on("click", function () {
    console.log(this);
});

// run, then update every minute
updateTime();
setInterval(updateTime, 60000);
