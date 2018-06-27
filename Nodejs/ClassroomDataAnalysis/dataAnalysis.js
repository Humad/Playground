const fs = require('fs');
const realTANames = JSON.parse(JSON.stringify(require('./raw_data/realNames.js').tas));
const realStudentNames = JSON.parse(JSON.stringify(require('./raw_data/realNames.js').students));
const moment = require('moment-timezone');

/**
 * Adds student name and time when student enters queue.
 * @param {Object} eventData 
 * @param {Array[Object]} refactoredData 
 */
function addStudent(eventData, refactoredData) {
    refactoredData.push({
        student: eventData.student,
        timeEnteredQueue: eventData.ts
    });
}

/**
 * Update assigned TA information for student.
 * @param {Object} eventData 
 * @param {Array[Object]} refactoredData 
 */
function addTA(eventData, refactoredData) {

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
            waitTimeInMinutes = waitTimeInMinutes > 60 ? 60 : waitTimeInMinutes; // anything over 60 minutes get brought down to 60
            currentData.waitTime = Math.floor(waitTimeInMinutes * 100) / 100;

            break;
        }
    }
}

/**
 * Update student cancel time.
 * @param {Object} eventData 
 * @param {Array[Object]} refactoredData 
 */
function cancelStudent(eventData, refactoredData) {

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

/**
 * Update student help time.
 * @param {Object} eventData 
 * @param {Array[Object]} refactoredData 
 */
function completeHelp(eventData, refactoredData) {

    // Find data ("row") for assigned TA
    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        // If found, update "row" and break
        if (currentData.ta === eventData.ta && !currentData.timeCleared) {
            currentData.timeCompleted = eventData.ts;

            // Update help time
            var helpTime = Date.parse(currentData.timeCompleted) - Date.parse(currentData.timeReceivedHelp);
            var helpTimeInMinutes = helpTime / 60000;
            helpTimeInMinutes = helpTimeInMinutes > 60 ? 60 : helpTimeInMinutes; // anything over 60 minutes comes down to 60
            currentData.helpTime = Math.floor(helpTimeInMinutes * 100) / 100;
            break;
        }
    }
}

/**
 * Update time cleared for students.
 * @param {Object} eventData 
 * @param {Array[Object]} refactoredData 
 */
function clearQueue(eventData, refactoredData) {

    // Find data ("row") for assigned student
    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        // If found, update "row" and break
        if (!currentData.ta && !currentData.timeCancelled) {
            currentData.timeCleared = eventData.ts;
        }
    }
}

/**
 * Remove student from queue.
 * @param {Object} eventData 
 * @param {Array[Object]} refactoredData 
 */
function removeStudent(eventData, refactoredData) {

    for (var i = refactoredData.length - 1; i >= 0; i--) {
        var currentData = refactoredData[i];
        
        if (currentData.student === eventData.student && !currentData.timeCleared && !currentData.ta) {
            currentData.timeCleared = eventData.ts;
            currentData.removed = true;
            break;
        }
    }
}

/**
 * Condenses student information from refactored data into one object.
 * @param {Object} studentMap 
 * @param {Array[Object]} refactoredData 
 */
function gatherStudentInformation(studentMap, refactoredData) {

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

        if (data.waitTime) {
            studentData.avgWaitTime = Math.floor(((studentData.avgWaitTime * studentData.numHelp + data.waitTime) / (studentData.numHelp + 1)) * 100) / 100;
        }

        if (data.helpTime) {
            studentData.avgHelpTime = Math.floor(((studentData.avgHelpTime * studentData.numHelp + data.helpTime) / (studentData.numHelp + 1)) * 100) / 100;
        }

        if (!data.timeCleared && !data.timeCancelled) {
            studentData.numHelp = studentData.numHelp + 1;
        }

        if (data.ta && studentData.workedWith.indexOf(data.ta) === -1) {
            studentData.workedWith.push(data.ta);
        }
    });
}

/**
 * Condenses student information from refactored data into one object.
 * @param {Object} taMap 
 * @param {Array[Object]} refactoredData 
 */
function gatherTAInformation(taMap, refactoredData) {

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

/**
 * Gets average wait time.
 * @param {Object} studentMap 
 */
function getAverageWaitTime(studentMap) {
    var totalTime = 0;
    for (var i in studentMap) {
        totalTime += studentMap[i].avgWaitTime;
    }
    return Math.floor(totalTime / Object.keys(studentMap).length * 100) / 100;
}

/**
 * Gets average help time.
 * @param {Object} studentMap 
 */
function getAverageHelpTime(studentMap) {
    var totalTime = 0;
    for (var i in studentMap) {
        totalTime += studentMap[i].avgHelpTime;
    }
    return Math.floor(totalTime / Object.keys(studentMap).length * 100) / 100;
}

/**
 * Writes data to file.
 * @param {Array[Object]} refactoredData 
 * @param {Object} studentMap 
 * @param {Object} taMap 
 */
function writeDataToFile(refactoredData, studentMap, taMap) {
    fs.writeFile('./parsed_data/interactionData.json', JSON.stringify(refactoredData, null, 4), 'utf8', function(error, data) {});
    fs.writeFile('./parsed_data/studentData.json', JSON.stringify(studentMap, null, 4), 'utf8', function(error, data) {});
    fs.writeFile('./parsed_data/taData.json', JSON.stringify(taMap, null, 4), 'utf8', function(error, data){});
}

/**
 * Cleans up data by adding real names and formatted time.
 * @param {Array[Object]} refactoredData 
 */
function cleanData(refactoredData) {
    for (var i = 0; i < refactoredData.length; i++) {

        let currentRow = refactoredData[i];

        if (currentRow.ta) {
            currentRow.ta = realTANames[currentRow.ta] ? realTANames[currentRow.ta] : currentRow.ta;
        }

        if (currentRow.student) {
            currentRow.student = realStudentNames[currentRow.student] ? realStudentNames[currentRow.student] : currentRow.student;
        }

        if (currentRow.timeCancelled) {
            currentRow.timeCancelled = getFormattedTime(currentRow.timeCancelled);
        }

        if (currentRow.timeCleared) {
            currentRow.timeCleared = getFormattedTime(currentRow.timeCleared);
            if (currentRow.removed) {
                currentRow.timeCleared = "Removed: " + currentRow.timeCleared;
            }
        }

        if (currentRow.timeCompleted) {
            currentRow.timeCompleted = getFormattedTime(currentRow.timeCompleted);
        }

        if (currentRow.timeEnteredQueue) {
            currentRow.timeEnteredQueue = getFormattedTime(currentRow.timeEnteredQueue);
        }

        if (currentRow.timeReceivedHelp) {
            currentRow.timeReceivedHelp = getFormattedTime(currentRow.timeReceivedHelp);
        }
    }
}

/**
 * Reads through JSON data and refactors it with relevant information
 * @param {Array[Object]} data
 */
function main(data) {

    let refactoredData = [];

    for (var i = 0; i < data.length; i++) {

        switch (data[i].type) {
            case "enter queue":
                addStudent(data[i], refactoredData);
                break;
            case "assigned":
                addTA(data[i], refactoredData);
                break;
            case "cancel":
                cancelStudent(data[i], refactoredData);
                break;
            case "done":
            case "doneoff":
            case "d":
                completeHelp(data[i], refactoredData);
                break;
            case "clear":
                clearQueue(data[i], refactoredData);
            case "remove":
                removeStudent(data[i], refactoredData);
        }
    }

    let taMap = {};
    let studentMap = {};

    cleanData(refactoredData);

    gatherStudentInformation(studentMap, refactoredData);
    gatherTAInformation(taMap, refactoredData);

    function writeData() {
        writeDataToFile(refactoredData, studentMap, taMap);
    }

    return {
        refactoredData: refactoredData,
        studentMap: studentMap,
        taMap: taMap,
        averageWaitTime: getAverageWaitTime(studentMap),
        averageHelpTime: getAverageHelpTime(studentMap),
        writeDataToFile: writeData
    }
}

//////////////////////
// Helper functions //
//////////////////////

/**
 * Gets datetime formatted in YYYY-MM-DD HH-MM-SS format.
 * @param {string} dateTime 
 */
function getFormattedTime(dateTime) {
    let momentDate = moment(dateTime).add(-7, "hours").format();
    let date = momentDate.substring(0, 10);
    let time = momentDate.substring(11, 16);
    return date + " " + time;
}

//////////////
// Exports //
/////////////
module.exports = main;