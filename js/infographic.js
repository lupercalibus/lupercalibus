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


            if (chart.config.options.elements.imgcenter) {
                //Get ctx from string
                var ctx = chart.chart.ctx;

                //Get options from the center object in options
                var centerConfig = chart.config.options.elements.imgcenter;
                var img = new Image;
                img.src =  centerConfig.imgsrc;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)

                //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                //var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
                var elementWidth = chart.innerRadius * Math.sqrt(2)
                // Find out how much the font can grow in width.
               // var elementHeight = (chart.innerRadius * 2);


                //Set font settings to draw it correctly.
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2) - (elementWidth / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2) - (elementWidth / 2);
                img.width = elementWidth
                //img.height = elementHeight
                //Draw text in center
                ctx.drawImage(img, centerX, centerY, img.width, img.width);
            }
        }
    });





//esito scontri

    var optionenemy = {
        responsiveAnimationDuration: 1000,
        responsive: true,
        elements: {
            /* center: {
                text: "a",
                color: '#000000', // Default is #000000
                fontStyle: 'Planes', // Default is Arial
                fontSize: 40,
                sidePadding: 20, // Defualt is 20 (as a percentage)
            } */
            imgcenter: {
                imgsrc: 'css/plane.png',
            }
        },
        plugins: {
            outlabels: {
                display: false,
            },
            labels: [{
                render: 'label',
                position: 'outside',
                fontSize: 14,
                fontStyle: 'bold',
                fontColor: '#000'
            },
            {
                //render: 'value',
                fontSize: 16,
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
                "Kill",
                "Wounded",
                "Prisoner",
                "Unhurted",
            ],
            datasets: [{
                data: [43, 5, 4, 5],
                 backgroundColor: [
                    //"rgba(126,204,140, 0.5)"
                    "#990000",
                    "#e65c00",
                    "#e6b800",
                    "#558000"
                ],
                hoverBackgroundColor: [
                    "#990000",
                    "#e65c00",
                    "#e6b800",
                    "#558000"
                ] 
            }]
        };

    var enemygraph = document.getElementById("enemiesgraph").getContext("2d");
    new Chart(enemygraph, {
        type: 'doughnut',
        data: daten,
        options: optionenemy
    });

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
    var optionpie = {
        responsiveAnimationDuration: 1000,
        responsive: true,
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
    var planegraph = document.getElementById("planesgraph").getContext("2d");
    new Chart(planegraph, {
        type: 'pie',
        data: datplan,
        options: optionpie
    });


    function planegraphfun(datirad, opt) {
        var planesstats = document.getElementById("planesstats").getContext("2d");
        new Chart(planesstats, {
            type: 'radar',
            data: datirad,
            options: opt
        });
    }
    planegraphfun(dataN11 ,optradar)


        var dataN11= {
            labels: ["Movimento 5 Stelle", "Partito Democratico", "Lega Nord", "Forza Italia", "Fratelli D'Italia", "Liberi E Uguali"],
            datasets: [{
                label: "Risultati Camera Zona",
                data: [1, 2, 3, 4, 5, 6]
            }]
        };
        var dataN17= {
            labels: ["Movimento 5 Stelle", "Partito Democratico", "Lega Nord", "Forza Italia", "Fratelli D'Italia", "Liberi E Uguali"],
            datasets: [{
                label: "Risultati Camera Zona",
                data: [2, 2, 3, 4, 5, 6]
            }]
        };
        var dataS7= {
            labels: ["Movimento 5 Stelle", "Partito Democratico", "Lega Nord", "Forza Italia", "Fratelli D'Italia", "Liberi E Uguali"],
            datasets: [{
                label: "Risultati Camera Zona",
                data: [3, 2, 3, 4, 5, 6]
            }]
        };
        var dataS13= {
            labels: ["Movimento 5 Stelle", "Partito Democratico", "Lega Nord", "Forza Italia", "Fratelli D'Italia", "Liberi E Uguali"],
            datasets: [{
                label: "Risultati Camera Zona",
                data: [4, 2, 3, 4, 5, 6]
            }]
        };

        var optradar = {
            responsiveAnimationDuration: 1000,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 35
                }
            },
            legend: {
                display: true
            },
        };
        $('input[type=radio][name=planes]').change(function() {
            switch ($(this).val()) {
                case 'N11':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataN11, optradar)
                    break
                case 'N17':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataN17, optradar)
                    break
                case 'S7':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataS7, optradar)
                    break
                case 'S13':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataS13, optradar)
                    break
            }
        });




})
