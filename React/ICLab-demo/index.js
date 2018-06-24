// App setup
const express = require('express');
const app = express();

// Data
const experimentResultsData = require('./json_data/experiment_results.json');
const countryData = require('./json_data/country.json');
const vpnProviderData = require('./json_data/vpn_provider.json');
const ipv4Data = require('./json_data/ipv4.json');
const scheduleData = require('./json_data/schedule_name.json');


function getDataForCountry(countryName) {
    let finalResults = [];
    let countryId = getCountryId(countryName);

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
        experiment.country = countryName;
        experiment.schedule = getScheduleName(countryResults[i].schedule_name_id);
        finalResults.push(experiment);
    }

    console.log(finalResults);
}

getDataForCountry("US");

// Routes for later
app.get('/country/:country', function(req, res) {
    res.send('');
});


// Helper functions
function getCountryId(countryName) {
    // Find country ID
    for (var i = 0; i < countryData.length; i++) {
        if (countryData[i].country === countryName) {
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
