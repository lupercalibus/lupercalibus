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


    //normalizzazione.js
    NdataN11= [80, 155, 408, 5.8, 7.55]
    NdataN17= [110, 170, 560, 5.96, 8.2]
    NdataS7= [180, 192, 740, 6.08, 7.8]
    NdataS13= [220, 224, 845, 6.3, 8.1]

    var engine = [NdataN11[0], NdataN17[0],NdataS7[0], NdataS13[0]]
    var speed= [NdataN11[1], NdataN17[1],NdataS7[1], NdataS13[1]]
    var weight= [NdataN11[2], NdataN17[2],NdataS7[2], NdataS13[2]]
    var len = [NdataN11[3], NdataN17[3],NdataS7[3], NdataS13[3]]
    var span = [NdataN11[4], NdataN17[4],NdataS7[4], NdataS13[4]]

    function normalize(min, max) {
        var delta = max - min;
        return function (val) {
            return (parseFloat((((val - min) / delta)+1).toFixed(2)));
        };
    }
    
    engine = (engine.map(normalize(80, 220)));
    speed = (speed.map(normalize(155, 224)));
    weight = (weight.map(normalize(408, 845)));
    len = (len.map(normalize(5.8, 6.3)));
    span = (span.map(normalize(7.55, 8.2)));

    newn11 = [engine[0], speed[0], weight[0], len[0], span[0]]
    newn17 = [engine[1], speed[1], weight[1], len[1], span[1]]
    news7 = [engine[2], speed[2], weight[2], len[2], span[2]]
    news13 = [engine[3], speed[3], weight[3], len[3], span[3]]



        var dataN11= {
            labels: [["Engine", NdataN11[0]+ " hp"], ["Speed" , NdataN11[1] + " km/h"], ["Weight" , NdataN11[2] + " kg"], ["Lenght", NdataN11[3] + " m"] , ["Span", NdataN11[4] + " m"]],
            datasets: [{
                label: "Nieuport XI",
                data: newn11
            }]
        };
        var dataN17= {
            labels: [["Engine", NdataN17[0]+ " hp"], ["Speed" , NdataN17[1] + " km/h"], ["Weight" , NdataN17[2] + " kg"], ["Lenght", NdataN17[3] + " m"] , ["Span", NdataN17[4] + " m"]],
            datasets: [{
                label: "Nieuport XVII",
                data: newn17
            }]
        };
        var dataS7= {
            labels: [["Engine", NdataS7[0]+ " hp"], ["Speed" , NdataS7[1] + " km/h"], ["Weight" , NdataS7[2] + " kg"], ["Lenght", NdataS7[3] + " m"] , ["Span", NdataS7[4] + " m"]],
            datasets: [{
                label: "Spad VII",
                data: news7
            }]
        };
        var dataS13= {
            labels: [["Engine", NdataS13[0]+ " hp"], ["Speed" , NdataS13[1] + " km/h"], ["Weight" , NdataS13[2] + " kg"], ["Lenght", NdataS13[3] + " m"] , ["Span", NdataS13[4] + " m"]],
            datasets: [{
                label: "Spad XIII",
                data: news13
            }]
        };

        var optradar = {
            responsiveAnimationDuration: 1000,
            tooltips: {
                enabled: false
           },
            scale: {
                pointLabels :{
                    fontStyle: "bold",
                },
                ticks: {
                    beginAtZero: true,
                    max: 2,
                    display: false
                }
            },
            legend: {
                display: false
            },
        };
        function planegraphfun(datirad) {
            var planesstats = document.getElementById("planesstats").getContext("2d");
            new Chart(planesstats, {
                type: 'radar',
                data: datirad,
                options: optradar
            });
        }

        //first plane
        planegraphfun(dataN11)
        $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/Nieuport11.png" width="100%">')

        $('input[type=radio][name=planes]').change(function() {
            switch ($(this).val()) {
                case 'N11':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataN11)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/Nieuport11.png" width="100%">')
                    break
                case 'N17':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataN17)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/Nieuport17.png" width="100%">')
                    break
                case 'S7':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataS7)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/SPADVII.png" width="100%">')
                    break
                case 'S13':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats"><canvas>');
                    planegraphfun(dataS13)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/SPADXIII.png" width="100%">')
                    break
            }
        });

//Trench graph

        var data = {
            labels: [
                "Defense Victories over Italian territories",
                "Raid Victories over Enemy territories"
            ],
            datasets: [
                {
                    data: [15, 19],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ]
                }]
        };
        
        var ctx = document.getElementById("trenchgraph");
        
        // And for a doughnut chart
        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                rotation: 1 * Math.PI,
              circumference: 1 * Math.PI,
              legend: {
                display: false
                },
                plugins: {
                    outlabels: {
                        display: false,
                    },
                labels: [{
                            render:"",
                        },
                        {
                            //render: 'value',
                            fontSize: 18,
                            fontStyle: 'bold',
                            fontColor: '#fff'
                        }]
                }
            }
        });

        //WINGMEN
      
            var datwing = {
                labels: ['Giuliano Parvis', 'Fulco Ruffo di Calabria', 'Goffredo Gorini', 'Pier Ruggero Piccio', "Mario D'Urso", 'Luigi Olivari', 'Guido Nardini', 'Giulio Poli', 'Giovanni Sabelli', 'Gastone Novelli', 'Gaetano Aliperta', 'Flavio Torello Baracchini', 'Attilio Imolesi', 'Alessandro Buzio'],          
                datasets: [{
                    data: [5, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                }
            ]
            };
    
            var nodes = new vis.DataSet([{id: 1, label: 'Francesco Baracca'}, {id: 2, label: 'Giuliano Parvis'}, 
            {id: 3, label: 'Fulco Ruffo di Calabria'}, 
            {id: 4, label: 'Goffredo Gorini'}, {id: 5, label: 'Pier Ruggero Piccio'}, 
            {id: 6, label: "Mario D'Urso"}, {id: 7, label: 'Luigi Olivari'},
             {id: 8, label: 'Guido Nardini'}, {id: 9, label: 'Giulio Poli'},
              {id: 10, label: 'Giovanni Sabelli'}, {id: 11, label: 'Gastone Novelli'},
               {id: 12, label: 'Gaetano Aliperta'}, {id: 13, label: 'Flavio Torello Baracchini'},
                {id: 14, label: 'Attilio Imolesi'}, {id: 15, label: 'Alessandro Buzio'}]);
            
              // create an array with edges
              var edges = new vis.DataSet([{from: 1, to: 2, value: 5},
                {from: 1, to: 3, value: 3}, {from: 1, to: 4, value: 2},
                 {from: 1, to: 5, value: 1}, {from: 1, to: 6, value: 1},
                  {from: 1, to: 7, value: 1}, {from: 1, to: 8, value: 1},
                   {from: 1, to: 9, value: 1}, {from: 1, to: 10, value: 1},
                    {from: 1, to: 11, value: 1}, {from: 1, to: 12, value: 1},
                     {from: 1, to: 13, value: 1}, {from: 1, to: 14, value: 1},
                      {from: 1, to: 15, value: 1}]
             );
            
              // create a network
              var container = document.getElementById('wingmengraph');
              var data = {
                nodes: nodes,
                edges: edges
              };
              var options = {
                 "physics": {
                   "barnesHut": {
                     "avoidOverlap": 1
                   },
                 }
               };
              var network = new vis.Network(container, data, options);



})
