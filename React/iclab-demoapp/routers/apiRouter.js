const express = require('express');
const router = express.Router();

module.exports = router;

// Data
const experimentResultsData = require('../json_data/experiment_results.json');
const countryData = require('../json_data/country.json');
const vpnProviderData = require('../json_data/vpn_provider.json');
const ipv4Data = require('../json_data/ipv4.json');
const scheduleData = require('../json_data/schedule_name.json');

const countryNames = {
    "US": "United States",
    "NL": "Netherlands"
}

function getDataForCountry(countryCode) {

    // Helper functions
    function getCountryId(countryCode) {
        // Find country ID
        for (var i = 0; i < countryData.length; i++) {
            if (countryData[i].country === countryCode) {
                return countryData[i].id;
            }
        }
    }

    function getVpnProviderName(vpnProviderId) {
        for (var i = 0; i < vpnProviderData.length; i++) {
            if (vpnProviderData[i].id === vpnProviderId) {
                return vpnProviderData[i].vpn_provider;
            }
        }
    }

    function getipFromipv4(ipv4Id) {
        for (var i = 0; i < ipv4Data.length; i++) {
            if (ipv4Id === ipv4Data[i].id) {
                return ipv4Data[i].ip;
            }
        }
    }

    function getScheduleName(scheduleId) {
        for (var i = 0; i < scheduleData.length; i++) {
            if (scheduleId === scheduleData[i].id) {
                return scheduleData[i].schedule_name;
            }
        }
    }

    let finalResults = [];
    let countryId = getCountryId(countryCode);

    // Get raw results for country
    var countryResults = experimentResultsData.filter(function(element) {
        return element.country_id === countryId;
    });

    // Make experiment data readable
    for (var i = 0; i < countryResults.length; i++) {
        let experiment = {};
        experiment.time_taken = countryResults[i].time_taken;
        experiment.server_time = countryResults[i].server_time;
        experiment.vpn_provider_name = getVpnProviderName(countryResults[i].vpn_provider_id);
        experiment.ip_address = getipFromipv4(countryResults[i].ipv4_id);
        experiment.countryCode = countryCode;
        experiment.countryName = countryNames[countryCode];
        experiment.schedule = getScheduleName(countryResults[i].schedule_name_id);
        finalResults.push(experiment);
    }

    return finalResults;
}

function getDataForCountries() {

    function getCountryCode(id) {
        for (var i = 0; i < countryData.length; i++) {
            if (countryData[i].id === id) {
                return countryData[i].country;
            }
        }
    }

    var allCountriesData = {};
    for (var i = 0; i < experimentResultsData.length; i++) {
        var currentExperiment = experimentResultsData[i];
        var countryCode = getCountryCode(currentExperiment.country_id);
        if (!allCountriesData[countryCode]) {
            allCountriesData[countryCode] = {
                name: countryNames[countryCode],
                experimentCount: 1,
                countryCode: countryCode
            }
        } else {
            allCountriesData[countryCode].experimentCount++;
        }
    }

    return allCountriesData;
}

router.get('/getcountries', function(req, res) {
    res.json(getDataForCountries());
});

router.get('/getcountry', function(req, res) {
    if (req.query.countryCode) {
        // convert 3 letter country code to 2
        res.json(getDataForCountry(req.query.countryCode));
    } else {
        res.send("Invalid get request; need country code");
    }
})