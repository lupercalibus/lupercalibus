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
                "Killed",
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
            "Nieuport 11",
            "Nieuport 17",
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
                    fontSize: 16,
                    fontStyle: 'bold',
                    color: '#000',
                    fontColor: '#000'
                },
                {
                    render: 'value',
                    fontSize: 20,
                    fontStyle: 'bold',
                    fontColor: '#000'
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
        $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/Nieuport11.png" width="100%" style="margin-top:35px">')

        $('input[type=radio][name=planes]').change(function() {
            switch ($(this).val()) {
                case 'N11':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats" height=200><canvas>');
                    planegraphfun(dataN11)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/Nieuport11.png" width="100%" style="margin-top:35px">')
                    break
                case 'N17':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats" height=200><canvas>');
                    planegraphfun(dataN17)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/Nieuport17.png" width="100%" style="margin-top:35px">')
                    break
                case 'S7':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats" height=200><canvas>');
                    planegraphfun(dataS7)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/SPADVII.png" width="100%" style="margin-top:35px">')
                    break
                case 'S13':
                    $('#planesstats').remove();
                    $('#planesstatscontainer').append('<canvas id="planesstats" height=200><canvas>');
                    planegraphfun(dataS13)
                    $('#planeimg').remove();
                    $('#planesimgcontainer').append('<img id="planeimg" src="css/planes/SPADXIII.png" width="100%" style="margin-top:35px">')
                    break
            }
        });

    
    

              //Wordcloud
              var words = [{text: 'metri', weight: 13},
              {text: 'nemico', weight: 13},
               {text: 'apparecchio', weight: 12},
                {text: 'fuoco', weight: 12},
                 {text: 'caccia', weight: 12},
                  //{text: 'verso', weight: 11},
                   {text: 'dopo', weight: 11},
                    {text: 'dietro', weight: 10},
                     {text: 'albatros', weight: 10},
                      {text: 'quota', weight: 10},
                       {text: 'linee', weight: 10},
                        {text: 'colpi', weight: 10},
                         {text: 'terra', weight: 9},
                          {text: 'distanza', weight: 9},
                           {text: 'fiamme', weight: 9},
                            //{text: 'nostre', weight: 8},
                             {text: 'colpito', weight: 8},
                              {text: 'tempo', weight: 7},
                               {text: 'sotto', weight: 7},
                                {text: 'ore', weight: 7},
                                 {text: 'sopra', weight: 6},
                                  {text: 'mitragliatrice', weight: 6},
                                   {text: 'pilota', weight: 6},
                                    {text: 'ali', weight: 6},
                                     {text: 'subito', weight: 6}];
              
              $('#words').jQCloud(words, {
                autoResize: true,
                width: "100%",
                height: "450px"
              });
              var resizeEvent = new Event('resize');
                window.dispatchEvent(resizeEvent);


})
