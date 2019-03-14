$(document).ready(function() {

    Chart.pluginService.register({
        beforeDraw: function(chart) {
            if (chart.config.options.elements.center) {
                //Get ctx from string
                var ctx = chart.chart.ctx;

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                //Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight);

                //Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;

                //Draw text in center
                ctx.fillText(txt, centerX, centerY);
            }
        }
    });


    var optionpie = {
        responsiveAnimationDuration: 1000,
        responsive: true,
        elements: {
            center: {
                text: "BOH",
                color: '#000000', // Default is #000000
                fontStyle: 'Arial', // Default is Arial
                sidePadding: 20 // Defualt is 20 (as a percentage)
            }
        },
        plugins: {
            outlabels: {
                display: false,
            },
           /* labels: [{
                    render: 'label',
                    position: 'outside',
                    fontSize: 18,
                    fontStyle: 'bold',
                    fontColor: '#000'
                },
                {
                    render: 'value',
                    fontSize: 18,
                    fontStyle: 'bold',
                    fontColor: '#fff'
                }
            ] */
        },
        legend: {
            display: true
        }
    };

//VITTORIE PER SQUADRIGLIA
    var datsquad = {
        labels: [
            "Squadriglia 1°",
            "Squadriglia 70°",
            "Squadriglia 91°"
        ],
        datasets: [{
            data: [1, 7, 26],
/*             backgroundColor: [
                "#a6206a",
                "#2f9395",
                "#f4a256"
            ],
            hoverBackgroundColor: [
                "#a6206a",
                "#2f9395",
                "#f4a256"
            ] */
        }]
    };
    var squadgraph = document.getElementById("squadgraph").getContext("2d");
    new Chart(squadgraph, {
        type: 'doughnut',
        data: datsquad,
        options: optionpie
    });


//VITTORIE PER NAZIONE
    var datnat = {
        labels: [
            "Austria",
            "Germany",
            "Unknown"
        ],
        datasets: [{
            data: [25, 8, 1],
/*             backgroundColor: [
                "#a6206a",
                "#2f9395",
                "#f4a256"
            ],
            hoverBackgroundColor: [
                "#a6206a",
                "#2f9395",
                "#f4a256"
            ] */
        }]
    };
    var natgraph = document.getElementById("natgraph").getContext("2d");
    new Chart(natgraph, {
        type: 'doughnut',
        data: datnat,
        options: optionpie
    });



    //VITTORIE PER AEREO
    var datplan = {
        labels: [
            "Nieuport XI",
            "Nieuport XVII",
            "SPAD VII",
            "SPAD XIII",
            "Unknown"
        ],
        datasets: [{
            data: [4, 4, 17, 6, 3],
/*             backgroundColor: [
                "#a6206a",
                "#2f9395",
                "#f4a256"
            ],
            hoverBackgroundColor: [
                "#a6206a",
                "#2f9395",
                "#f4a256"
            ] */
        }]
    };
    var planegraph = document.getElementById("planesgraph").getContext("2d");
    new Chart(planegraph, {
        type: 'doughnut',
        data: datplan,
        options: optionpie
    });





//esito scontri

    var optionenemy = {
        responsiveAnimationDuration: 1000,
        responsive: true,
        elements: {
            center: {
                text: "A",
                color: '#000000', // Default is #000000
                fontStyle: 'WW1Planes.ttf', // Default is Arial
                sidePadding: 20 // Defualt is 20 (as a percentage)
            }
        },
        plugins: {
            outlabels: {
                display: false,
            },
            labels: [{
                    render: 'label',
                    position: 'outside',
                    fontSize: 18,
                    fontStyle: 'bold',
                    fontColor: '#000'
                },
                {
                    render: 'value',
                    fontSize: 18,
                    fontStyle: 'bold',
                    fontColor: '#fff'
                }
            ] 
        },
        legend: {
            display: false
        }
    };

        var daten = {
            labels: [
                "Kill in Action",
                "Wounded in Action",
                "Prisoner of War",
                "Unhurted",
            ],
            datasets: [{
                data: [43, 5, 4, 5],
                 backgroundColor: [
                    "#a6206a",
                    "#2f9395",
                    "#f4a256"
                ],
                hoverBackgroundColor: [
                    "#a6206a",
                    "#2f9395",
                    "#f4a256"
                ] 
            }]
        };

    var enemygraph = document.getElementById("enemiesgraph").getContext("2d");
    new Chart(enemygraph, {
        type: 'doughnut',
        data: daten,
        options: optionenemy
    });

})
