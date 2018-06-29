// For router.get('api/tas')
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



// HBS
<div class="center-container">
    <h2>TAs</h2>

    <div id="students-helped-chart"></div>

    <div id="average-time-chart"></div>

    <div class="people-list" id="ta-list"></div>
</div>


<script>
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(getTAData);

    function getTAData() {
        // TA List
        $.ajax({
            url: '/api/tas',
            success: function(data) {
                updateData(JSON.parse(JSON.stringify(data)));
            }
        });

        function updateData(data) {
            data = groupData(data);
            for (var key in data) {
                $("#ta-list").append(getTARow(key));
            }
            // createCharts(data);
        }

        function groupData(data) {
            // Yeah I could've used _.groupBy but I like writing my own functions
            let taGroups = {};
            for (var i = 0; i < data.length; i++) {
                let currentObject = data[i];
                for (var name in currentObject) {
                    if (!taGroups.hasOwnProperty(name)) {
                        taGroups[name] = {
                            studentsHelped: 0,
                            avgTimePerStudent: 0,
                            totalDays: 0
                        };
                    }

                    taGroups[name].studentsHelped += currentObject[name].studentsHelped;
                    taGroups[name].avgTimePerStudent += currentObject[name].avgTimePerStudent;
                    taGroups[name].totalDays = taGroups[name].totalDays + 1;
                }
            }
            console.log(taGroups);

            return taGroups;
        }

        function getTARow(name) {
            return '<h5><a href="/ta/' + name + '">' + name + '</h5>';
        }

        function createCharts(taData) {

            function createStudentsHelpedChart() {
                let data = new google.visualization.DataTable();
                data.addColumn('string', 'TA Name');
                data.addColumn('number', 'Students helped');

                let arrayData = [];
                for (var ta in taData) {
                    arrayData.push([ta, taData[ta].studentsHelped]);
                }

                arrayData.sort(function(a, b) {
                    return a[1] - b[1];
                });

                data.addRows(arrayData);

                let options = {
                    hAxis: {
                    title: 'TA Name'
                    },
                    vAxis: {
                    title: 'Number of students'
                    }
                };

                let chart = new google.visualization.ColumnChart(document.getElementById('students-helped-chart'));
                chart.draw(data, options);
            }

            function createAvgTimeChart() {
                let data = new google.visualization.DataTable();
                data.addColumn('string', 'TA Name');
                data.addColumn('number', 'Average time');

                let arrayData = [];
                for (var ta in taData) {
                    arrayData.push([ta, Math.floor(taData[ta].avgTimePerStudent / taData[ta].totalDays * 100) / 100]);
                }

                arrayData.sort(function(a, b) {
                    return a[1] - b[1];
                });

                data.addRows(arrayData);

                let options = {
                    hAxis: {
                    title: 'TA Name'
                    },
                    vAxis: {
                    title: 'Average time'
                    }
                };

                let chart = new google.visualization.ColumnChart(document.getElementById('average-time-chart'));
                chart.draw(data, options);
            }

            createStudentsHelpedChart();
            createAvgTimeChart();
        }
    }
</script>


