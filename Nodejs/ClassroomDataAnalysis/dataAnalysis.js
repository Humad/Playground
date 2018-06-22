// - ts_student_help 
// - ts_ta_arrive
// - ts_ta_done
// - ts_student_cancel
// - ts_queue_clear
// - wait_time
// - help_time

// SQL Query to get data for today: SELECT * FROM events WHERE ts >= '2018-06-19 16:00:00' AND ts <= '2018-06-20 05:00:00' ORDER BY ts ASC;

const fs = require('fs');
const refactoredData = [];
const studentMap = {};
const taMap = {};
const realNames = JSON.parse(JSON.stringify(require('./raw_data/realNames.js')));
const moment = require('moment-timezone');

console.log(moment("2018-06-21T23:58:26.225Z").tz("America/Los_Angeles").format());

// Adds basic student data to the refactored data array
function addStudent(eventData) {
    refactoredData.push({
        student: eventData.student,
        timeEnteredQueue: eventData.ts
    });
}

// Updates information in refactored data array by adding TA information
function addTA(eventData) {

    // Find data ("row") for assigned student
    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        // If found, update "row" and break
        // If found student, not cleared, not cancelled
        if (currentData.student === eventData.student && !currentData.timeCleared && !currentData.timeCancelled) {
            currentData.ta = eventData.ta;
            currentData.timeReceivedHelp = eventData.ts;
            
            // Update wait time
            var waitTime = Date.parse(currentData.timeReceivedHelp) - Date.parse(currentData.timeEnteredQueue);
            var waitTimeInMinutes = waitTime / 60000;
            waitTimeInMinutes = waitTimeInMinutes > 60 ? 60 : waitTimeInMinutes;
            currentData.waitTime = Math.floor(waitTimeInMinutes * 100) / 100;

            break;
        }
    }
}

// Updates information in refactored data array by updating student cancel time
function cancelStudent(eventData) {

    // Find data ("row") for assigned student
    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        // If found, update "row" and break
        if (currentData.student === eventData.student && !currentData.timeCleared && !currentData.ta) {
            currentData.timeCancelled = eventData.ts;
            break;
        }
    }
}

// Updates information in refactored data array by updating student help time
function completeHelp(eventData) {
    // Find data ("row") for assigned TA
    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        // If found, update "row" and break
        if (currentData.ta === eventData.ta && !currentData.timeCleared) {
            currentData.timeCompleted = eventData.ts;

            // Update help time
            var helpTime = Date.parse(currentData.timeCompleted) - Date.parse(currentData.timeReceivedHelp);
            var helpTimeInMinutes = helpTime / 60000;
            helpTimeInMinutes = helpTimeInMinutes > 60 ? 60 : helpTimeInMinutes;
            currentData.helpTime = Math.floor(helpTimeInMinutes * 100) / 100;
            break;
        }
    }
}

function clearQueue(eventData) {
    // Find data ("row") for assigned student
    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        // If found, update "row" and break
        if (!currentData.ta && !currentData.timeCancelled) {
            currentData.timeCleared = eventData.ts;
        }
    }
}

function removeStudent(eventData) {
    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        
        if (currentData.student === eventData.student && !currentData.timeCleared && !currentData.ta) {
            currentData.timeCleared = eventData.ts;
            break;
        }
    }
}

// Reduces multiple rows for the same student into one
function gatherStudentInformation() {

    refactoredData.forEach(function(data) {
        if (!studentMap[data.student]) {
            studentMap[data.student] = {
                studentName: data.student,
                numHelp: 0,
                avgWaitTime: 0,
                avgHelpTime: 0,
                workedWith: []
            };
        }

        var studentData = studentMap[data.student];
        if (data.waitTime && data.helpTime) {
            studentData.avgWaitTime = Math.floor(((studentData.avgWaitTime * studentData.numHelp + data.waitTime) / (studentData.numHelp + 1)) * 100) / 100;
            studentData.avgHelpTime = Math.floor(((studentData.avgHelpTime * studentData.numHelp + data.helpTime) / (studentData.numHelp + 1)) * 100) / 100;
            studentData.numHelp = studentData.numHelp + 1;
        }

        if (data.ta && studentData.workedWith.indexOf(data.ta) === -1) {
            studentData.workedWith.push(data.ta);
        }
    });
}

function gatherTAInformation() {
    refactoredData.forEach(function(data) {
        if (data.ta) {
            if (!taMap[data.ta]) {
                taMap[data.ta] = {
                    taName: data.ta,
                    studentsHelped: 0,
                    avgTimePerStudent: 0,
                    workedWith: []
                };
            }
    
            var taData = taMap[data.ta];
            if (data.helpTime) {
                taData.avgTimePerStudent = Math.floor(((taData.avgTimePerStudent * taData.studentsHelped + data.helpTime) / (taData.studentsHelped + 1)) * 100) / 100;
                taData.studentsHelped = taData.studentsHelped + 1;
            }
    
            if (taData.workedWith.indexOf(data.student) === -1) {
                taData.workedWith.push(data.student);
            }
        }
    });
}

function getAverageWaitTime() {
    var totalTime = 0;
    for (var i in studentMap) {
        totalTime += studentMap[i].avgWaitTime;
    }
    return Math.floor(totalTime / Object.keys(studentMap).length * 100) / 100;
}

function getAverageHelpTime() {
    var totalTime = 0;
    for (var i in studentMap) {
        totalTime += studentMap[i].avgHelpTime;
    }
    return Math.floor(totalTime / Object.keys(studentMap).length * 100) / 100;
}

function writeDataToFile() {
    fs.writeFile('./parsed_data/interactionData.json', JSON.stringify(refactoredData, null, 4), 'utf8', function(error, data) {});
    fs.writeFile('./parsed_data/studentData.json', JSON.stringify(studentMap, null, 4), 'utf8', function(error, data) {});
    fs.writeFile('./parsed_data/taData.json', JSON.stringify(taMap, null, 4), 'utf8', function(error, data){});
}

function getFormattedTime(dateTime) {
    let momentDate = moment(dateTime).tz("America/Los_Angeles").format();
    let date = momentDate.substring(0, 10);
    let time = momentDate.substring(11, 16);
    return date + " " + time;
}

function cleanData() {
    for (var i = 0; i < refactoredData.length; i++) {
        if (refactoredData[i].ta) {
            refactoredData[i].ta = realNames[refactoredData[i].ta] ? realNames[refactoredData[i].ta] : refactoredData[i].ta;
        }

        if (refactoredData[i].student) {
            refactoredData[i].student = realNames[refactoredData[i].student] ? realNames[refactoredData[i].student] : refactoredData[i].student;
        }

        if (refactoredData[i].timeCancelled) {
            refactoredData[i].timeCancelled = getFormattedTime(refactoredData[i].timeCancelled);
        }

        if (refactoredData[i].timeCleared) {
            refactoredData[i].timeCleared = getFormattedTime(refactoredData[i].timeCleared);
        }

        if (refactoredData[i].timeCompleted) {
            refactoredData[i].timeCompleted = getFormattedTime(refactoredData[i].timeCompleted);
        }

        if (refactoredData[i].timeEnteredQueue) {
            refactoredData[i].timeEnteredQueue = getFormattedTime(refactoredData[i].timeEnteredQueue);
        }

        if (refactoredData[i].timeReceivedHelp) {
            refactoredData[i].timeReceivedHelp = getFormattedTime(refactoredData[i].timeReceivedHelp);
        }
    }
}

// Reads through JSON data and refactors it with relevant information
function main(data) {
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
            case "clear":
                clearQueue(data[i]);
            case "remove":
                removeStudent(data[i]);
        }
    }

    cleanData();

    gatherStudentInformation();
    gatherTAInformation();

    return {
        refactoredData: refactoredData,
        studentMap: studentMap,
        taMap: taMap,
        averageWaitTime: getAverageWaitTime(),
        averageHelpTime: getAverageHelpTime(),
        writeDataToFile: writeDataToFile
    }
}

module.exports = main;