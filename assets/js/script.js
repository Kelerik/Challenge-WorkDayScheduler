var updateTime = function () {
    // display date in the header
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    // update the timeblocks to appropriate colours based on current hour
    // --- TODO
};

// run, then update every minute
updateTime();
setInterval(updateTime, 60000);
