$(document).ready(function() {



    var optionpie = {
        responsiveAnimationDuration: 1000,
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



})