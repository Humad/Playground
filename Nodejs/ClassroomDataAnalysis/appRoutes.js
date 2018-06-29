const express = require('express')
const router = express.Router()

const poolParty = require('./dataRetrieval');

router.get('/', function(req, res) {
    var todayString = poolParty.getDate(0);

    poolParty.getDailyData()
    .then(function(data) {
        res.status(200).render('index', {
            today: todayString,
            data: data.refactoredData,
            averageWaitTime: data.averageWaitTime,
            averageHelpTime: data.averageHelpTime
        });
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).render('index', {
            today: todayString,
            data: [],
            averageWaitTime: -1,
            averageHelpTime: -1
        });
    });
});

router.get('/student/:studentName', function(req, res) {
    poolParty.getDailyData()
    .then(function(data) {
        res.status(200).render('student', {
            name: req.params.studentName,
            firstDay: process.env.FIRST_DAY_OF_CLASSES
        });
    })
    .catch(function(err) {
        console.log(err);
        res.status(400).render('student', {
            data: null
        });
    });
});

router.get('/ta/:taName', function(req, res) {
    poolParty.getDailyData()
    .then(function(data) {
        res.status(200).render('ta', {
            name: req.params.taName,
            firstDay: process.env.FIRST_DAY_OF_CLASSES
        });
    })
    .catch(function(err) {
        console.log(err);
        res.status(400).render('ta', {
            data: null
        });
    });
});

router.get('/studentlist', function(req, res) {
    res.status(200).render('studentList');
});

router.get('/talist', function(req, res) {
    res.status(200).render('taList');
});

router.get('/days', function(req, res) {
    res.status(200).render('days', {
        firstDay: process.env.FIRST_DAY_OF_CLASSES
    });
});

router.get('/daterange', function(req, res) {
    res.status(200).render('dateRange', {
        firstDay: process.env.FIRST_DAY_OF_CLASSES
    });
});

module.exports = router