$(document).ready(function() {



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


    var enemygraph = document.getElementById("enemiesgraph").getContext("2d");
    new Chart(enemygraph, {
        type: 'doughnut',
        data: datnat,
        options: optionpie
    });

})
