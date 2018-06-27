const express = require('express')
const router = express.Router()

const realTANames = JSON.parse(JSON.stringify(require('./raw_data/realNames.js').tas));
const realStudentNames = JSON.parse(JSON.stringify(require('./raw_data/realNames.js').students));

const poolParty = require('./dataRetrieval');


router.get('/students', function(req, res) {
    res.status(200).json(realStudentNames);
});

router.get('/tas', function(req, res) {
    poolParty.getDataForAllDays()
    .then(function(data) {
        data = data.map(function(item) {
            return item.taMap;
        });
        res.status(200).json(data);
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).json({});
    });
});

router.get('/ta', function(req, res) {
    if (req.query.name && req.query.date) {
        // get data for a certain date
    }
});

router.get('/days', function(req, res) {
    if (req.query.date) {
        poolParty.getDataForDay(req.query.date)
        .then(function(data) {
            res.status(200).json({
                refactoredData: data.refactoredData,
                averageHelpTime: data.averageHelpTime,
                averageWaitTime: data.averageWaitTime
            });
        })
        .catch(function(err) {
            res.status(500).json({});
        });
    }
});

router.get('/daterange', function(req, res) {
    if (req.query.startDate && req.query.endDate) {
        poolParty.getDataForRange(req.query.startDate, req.query.endDate)
        .then(function(data) {
            res.status(200).json(data);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json({});
        });
    }
});

module.exports = router