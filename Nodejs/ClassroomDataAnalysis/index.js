// - ts_student_help 
// - ts_ta_arrive
// - ts_ta_done
// - ts_student_cancel
// - ts_queue_clear
// - wait_time
// - help_time

const fs = require('fs');
const data = require('./sample_data.json');
const refactored_data = [];

// Adds basic student data to the refactored data array
function addStudent(eventData) {
    refactored_data.push({
        student: eventData.student,
        time_entered_queue: eventData.ts
    });
}

// Updates information in refactored data array by adding TA information
function addTA(eventData) {
    for (var i = refactored_data.length - 1; i >= 0; i--) {
        var currentData = refactored_data[i];
        if (currentData.student === eventData.student) {
            currentData.ta = eventData.ta;
            currentData.time_received_help = eventData.ts;
            // Update wait time
            var waitTime = Date.parse(currentData.time_received_help) - Date.parse(currentData.time_entered_queue);
            var waitTimeInMinutes = waitTime / 60000;
            currentData.wait_time = waitTimeInMinutes;
            break;
        }
    }
}

// Updates information in refactored data array by updating student cancel time
function cancelStudent(eventData) {
    for (var i = refactored_data.length - 1; i >= 0; i--) {
        var currentData = refactored_data[i];
        if (currentData.student === eventData.student) {
            currentData.time_cancelled = eventData.ts;
            break;
        }
    }
}

// Updates information in refactored data array by updating student help time
function completeHelp(eventData) {
    for (var i = refactored_data.length - 1; i >= 0; i--) {
        var currentData = refactored_data[i];
        if (currentData.ta === eventData.ta) {
            currentData.time_completed = eventData.ts;
            // update help time
            var helpTime = Date.parse(currentData.time_completed) - Date.parse(currentData.time_received_help);
            var helpTimeInMinutes = helpTime / 60000;
            currentData.help_time = helpTimeInMinutes;
            break;
        }
    }
}

function gatherStudentInformation() {
    var studentMap = new Map();
    refactored_data.forEach(function(data) {
        if (!studentMap.has(data.student)) {
            studentMap.set(data.student, {
                numHelp: 0,
                avgWaitTime: 0,
                avgHelpTime: 0,
                workedWith: []
            });
        };

        studentMap.set(studentMap.get)




    });

}

// Reads through JSON data and refactors it with relevant information
function main() {
    for (var i = 0; i < data.length; i++) {

        switch (data[i].type) {
            case "enter queue":
                addStudent(data[i]);
                break;
            case "assigned":
                addTA(data[i]);
                break;
            case "cancel":
                cancelStudent(data[i]);
                break;
            case "done":
            case "doneoff":
                completeHelp(data[i]);
                break;
        }
    }

    fs.writeFile('refactored_data.json', JSON.stringify(refactored_data), 'utf8', function(error, data) {});
}

main();


