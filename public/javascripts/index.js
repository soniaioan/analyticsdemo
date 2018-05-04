var barChart;
var barChart2;
var lineChart;

let utils = {
    loadChart1: function(response) {
        //bar
        var ctxB = document.getElementById("barChart").getContext('2d');
        let colorsBgChart1 = randomColor({
            count: 20,
            format: 'rgb'
        });
        let colorsBorderChart1 = randomColor({
            count: 20,
            format: 'rgb'
        });
        barChart = new Chart(ctxB, {
            type: 'bar',
            data: {
                labels: response.chart1.datasetX,
                datasets: [{
                    label: 'Average Size per File Type',
                    data: response.chart1.datasetY,
                    backgroundColor: colorsBgChart1,
                    borderColor: colorsBorderChart1,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            autoSkip: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                }
            }
        });
    },
    loadChart2: function(response) {
        var ctxB = document.getElementById("barChart2").getContext('2d');
        let colorsBgChart2 = randomColor({
            count: 10,
            format: 'rgb'
        });
        let colorsBorderChart2 = randomColor({
            count: 10,
            format: 'rgb'
        });
        barChart2 = new Chart(ctxB, {
            type: 'bar',
            data: {
                labels: response.chart2.datasetX,
                datasets: [{
                    label: 'Total Visits per Referrer',
                    data: response.chart2.datasetY,
                    backgroundColor: colorsBgChart2,
                    borderColor: colorsBorderChart2,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            autoSkip: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            autoSkip: false
                        }
                    }]
                }
            }
        });
    },
    loadChart3: function(response) {
        var colors = [ "rgba(165,42,42,0.2)", "rgba(178,34,34,0.2)", "rgba(220,20,60,0.2)", "rgba(255,99,71,0.2)", "rgba(255,127,80,0.2)", "rgba(205,92,92,0.2)", "rgba(240,128,128,0.2)", "rgba(233,150,122,0.2)", "rgba(250,128,114,0.2)", "rgba(255,160,122,0.2)"]
        //line
        var ctxL = document.getElementById("lineChart").getContext('2d');
        var datasets = []
        for (var i=0;i < response.chart3.datasets.length; i++) {
            datasets.push( {
                label: response.chart3.datasets[i].host,
                backgroundColor: colors[i],
                strokeColor: colors[i],
                pointColor: colors[i],
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: colors[i],
                data: response.chart3.datasets[i].visits
            })
        }
        lineChart = new Chart(ctxL, {
            type: 'line',
            data: {
                labels: response.chart3.days,
                datasets: datasets
            },
            options: {
                responsive: true
            }
        });
    },
    getCharts: function () {
        return $.ajax({
            method: 'GET', url: '/api/logs/charts',
            success: function (response) {
                utils.loadChart1(response)
                utils.loadChart2(response)
                utils.loadChart3(response)

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + ' ' + xhr.responseText);
            }
        })
    }
}
$(document).ready(function() {
    $('#upload').click(function(){
        var formData = new FormData();
        formData.append('logFile', $('#input-b1')[0].files[0]);
        return $.ajax({
            url: '/api/logs',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false
        }).then((response) => {
            alert('File uploaded successfully');
            if (barChart) {
                barChart.destroy()
            }
            if (barChart2) {
                barChart2.destroy()
            }
            if (lineChart) {
                lineChart.destroy()
            }
            return utils.getCharts()
        })
    });
});