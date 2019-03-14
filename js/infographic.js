$(document).ready(function() {
    var datitotsegn = {
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
        options: opt
    });



})
