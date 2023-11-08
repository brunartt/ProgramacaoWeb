document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("financialChart").getContext("2d");
    let financialChart;

    
    document.getElementById("loadData").addEventListener("click", function () {
        const fileInput = document.getElementById("csvFile");
        const file = fileInput.files[0];

        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: function (results) {
                    const data = results.data;
                    populateDataPreview(data);
                    updateDataSeriesSelect(data);
                    updateChart(data);
                },
            });
        }
    });

    
    const seriesSelect = document.getElementById("dataSeries");
    const chartTypeSelect = document.getElementById("chartType");
    const startFromZeroCheckbox = document.getElementById("startFromZero");
    const stackedCheckbox = document.getElementById("stacked");
    const smoothCurveCheckbox = document.getElementById("smoothCurve");

    [seriesSelect, chartTypeSelect, startFromZeroCheckbox, stackedCheckbox, smoothCurveCheckbox].forEach((element) => {
        element.addEventListener("change", function () {
            updateChart();
        });
    });

   
    document.getElementById("exportChart").addEventListener("click", function () {
        const chartCanvas = document.getElementById("financialChart");
        const chartDataURL = chartCanvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = chartDataURL;
        a.download = "financial_chart.png";
        a.click();
    });

    function populateDataPreview(data) {
        const table = document.querySelector("#dataPreview table");
        table.innerHTML = "";

        if (data.length === 0) {
            return;
        }

        const headerRow = table.insertRow();
        for (const key in data[0]) {
            if (data[0].hasOwnProperty(key)) {
                const headerCell = document.createElement("th");
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            }
        }

        data.forEach((rowData) => {
            const row = table.insertRow();
            for (const key in rowData) {
                if (rowData.hasOwnProperty(key)) {
                    const cell = row.insertCell();
                    cell.textContent = rowData[key];
                }
            }
        });
    }

    function updateDataSeriesSelect(data) {
        const seriesSelect = document.getElementById("dataSeries");
        seriesSelect.innerHTML = "";

        if (data.length === 0) {
            return;
        }

        const firstRow = data[0];
        for (const key in firstRow) {
            if (firstRow.hasOwnProperty(key)) {
                const option = document.createElement("option");
                option.value = key;
                option.textContent = key;
                seriesSelect.appendChild(option);
            }
        }
    }

    function updateChart(data) {
        const selectedSeries = Array.from(document.getElementById("dataSeries").selectedOptions).map((option) => option.value);
        const chartType = document.getElementById("chartType").value;
        const startFromZero = document.getElementById("startFromZero").checked;
        const stacked = document.getElementById("stacked").checked;
        const smoothCurve = document.getElementById("smoothCurve").checked;

        if (financialChart) {
            financialChart.destroy();
        }

        if (data && selectedSeries.length > 0) {
            const chartData = prepareChartData(data, selectedSeries);
            financialChart = createChart(ctx, chartType, chartData, startFromZero, stacked, smoothCurve);
        }
    }

    function prepareChartData(data, selectedSeries) {
        const labels = data.map((row) => row[selectedSeries[0]]);
        const datasets = selectedSeries.map((series) => {
            return {
                label: series,
                data: data.map((row) => row[series]),
            };
        });

        return {
            labels,
            datasets,
        };
    }

    function createChart(ctx, chartType, chartData, startFromZero, stacked, smoothCurve) {
        let chartOptions;

        if (chartType === "bar" && stacked) {
            chartOptions = {
                type: chartType,
                data: chartData,
                options: {
                    scales: {
                        x: {
                            beginAtZero: startFromZero,
                        },
                        y: {
                            beginAtZero: startFromZero,
                            stacked: true,
                        },
                    },
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                },
            };
        } else {
            chartOptions = {
                type: chartType,
                data: chartData,
                options: {
                    scales: {
                        x: {
                            beginAtZero: startFromZero,
                        },
                        y: {
                            beginAtZero: startFromZero,
                        },
                    },
                    plugins: {
                        legend: {
                            position: "top",
                        },
                        tension: smoothCurve ? 0.4 : 0,
                    },
                },
            };
        }

        return new Chart(ctx, chartOptions);
    }
});
