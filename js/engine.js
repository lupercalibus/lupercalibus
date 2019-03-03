$(document).ready(function() {


var map = L.map('map', {
 maxZoom: 18,
 minZoom: 12,
});
map.setView([44.4915, 11.3355], 12);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

$.ajax({
    dataType: "json",
    url: "json/Baracca.json",
    success: function(dati) {
    var datesarray = []
        dati.forEach(function(arrayItem) {
            datesarray.append({id: arrayItem["number"], content: 'item'+str(arrayItem["number"]), start: arrayItem["date"]})
            if (arrayItem["number"] == 1) {
                $('<div class="carousel-item active"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
            else {
                $('<div class="carousel-item"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
        })

        var container = document.getElementById('visualization');

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet([
        {id: 1, content: 'item 1', start: '12-04-1916'},
        {id: 2, content: 'item 2', start: '1916-04-14'},
        {id: 3, content: 'item 3', start: '1916-04-18'},
        {id: 4, content: 'item 4', start: '1917-04-16'},
        {id: 5, content: 'item 5', start: '1917-04-25'},
        {id: 6, content: 'item 6', start: '1917-04-27'}
        ]);

        // Configuration for the Timeline
        var options = {
        min: '1916-01-01',
        max: '1918-01-01',
        maxHeight: "200px",
        minHeight: "200px",
        zoomMin: 3000000000 //1500000000 per il girono esatto
        };

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, options);

    }})
})