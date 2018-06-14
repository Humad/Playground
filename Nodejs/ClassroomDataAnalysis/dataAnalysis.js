// - ts_student_help 
// - ts_ta_arrive
// - ts_ta_done
// - ts_student_cancel
// - ts_queue_clear
// - wait_time
// - help_time

// SQL Query to get data for today: SELECT * FROM events WHERE ts >= '2018-06-13' ORDER BY ts ASC;

// TODO: Use Map instead of for loops to look for past entries
// TODO: Instead of having multiple entries, just append to original
// TODO: Remove additional data-gathering function (should be easy if above TODOs are completed)

const fs = require('fs');
const data = require('./sample_data.json');
const refactoredData = [];
const studentMap = {};
const taMap = {};

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
        if (currentData.student === eventData.student) {
            currentData.ta = eventData.ta;
            currentData.timeReceivedHelp = eventData.ts;
            
            // Update wait time
            var waitTime = Date.parse(currentData.timeReceivedHelp) - Date.parse(currentData.timeEnteredQueue);
            var waitTimeInMinutes = waitTime / 60000;
            currentData.waitTime = waitTimeInMinutes;

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
        if (currentData.student === eventData.student) {
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
        if (currentData.ta === eventData.ta) {
            currentData.timeCompleted = eventData.ts;

            // Update help time
            var helpTime = Date.parse(currentData.timeCompleted) - Date.parse(currentData.timeReceivedHelp);
            var helpTimeInMinutes = helpTime / 60000;
            currentData.helpTime = helpTimeInMinutes;
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
            studentData.avgWaitTime = (studentData.avgWaitTime * studentData.numHelp + data.waitTime) / (studentData.numHelp + 1);
            studentData.avgHelpTime = (studentData.avgHelpTime * studentData.numHelp + data.helpTime) / (studentData.numHelp + 1);
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
                taData.avgTimePerStudent = (taData.avgTimePerStudent * taData.studentsHelped + data.helpTime) / (taData.studentsHelped + 1);
                taData.studentsHelped = taData.studentsHelped + 1;
            }
    
            if (taData.workedWith.indexOf(data.student) === -1) {
                taData.workedWith.push(data.student);
            }
        }
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

    gatherStudentInformation();
    gatherTAInformation();
    getAverageWaitTime();

    fs.writeFile('interaction_data.json', JSON.stringify(refactoredData), 'utf8', function(error, data) {});
    fs.writeFile('student_data.json', JSON.stringify(studentMap), 'utf8', function(error, data) {});
    fs.writeFile('ta_data.json', JSON.stringify(taMap), 'utf8', function(error, data){});
}

function getAverageWaitTime() {
    var totalTime = 0;
    for (var i in studentMap) {
        totalTime += studentMap[i].avgWaitTime;
    }
    return totalTime / Object.keys(studentMap).length;
}

function getAverageHelpTime() {
    var totalTime = 0;
    for (var i in studentMap) {
        totalTime += studentMap[i].avgHelpTime;
    }
    return totalTime / Object.keys(studentMap).length;
}

main();

module.exports = {
    refactoredData: refactoredData,
    studentMap: studentMap,
    taMap: taMap,
    averageWaitTime: getAverageWaitTime(),
    averageHelpTime: getAverageHelpTime()
}


