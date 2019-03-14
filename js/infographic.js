$(document).ready(function() {

    var chart = AmCharts.makeChart("squadgraph", {
        "type": "pie",
        "dataProvider": [{
            "slice": "1° Squadriglia",
            "value": 1
          },{
            "slice": "70° Squadriglia",
            "value": 7
          }, {
            "slice": "91° Squadriglia",
            "value": 26
          }],
        "valueField": "value",
        "titleField": "slice",
        "labelsEnabled": false,
        "pullOutRadius": 0,
        "innerRadius": 60,
        "allLabels": [{
          "text": "aaaaa",
          "color": "#f40000",
          "size": 20,
          "align": "center",
          "y": "55%"
        }]
      });


})
