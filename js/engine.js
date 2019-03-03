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
            datesarray.push({id: arrayItem["number"], content: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"]})
            if (arrayItem["number"] == 1) {
                $('<div class="carousel-item active"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
            else {
                $('<div class="carousel-item"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
        })

        var container = document.getElementById('visualization');

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(datesarray);



        // Configuration for the Timeline
        var options = {
        min: '1916-01-01',
        max: '1919-01-01',
        maxHeight: "200px",
        minHeight: "200px",
        zoomMin: 3000000000, //1500000000 per il girono esatto 
        };

        // Create a Timeline
        var timeline = new vis.Timeline(container, items, options);
        timeline.setSelection(1, {focus: true})
        var actualid = 1

        //visjs è buggato devo impostare un nuovo zoom dopo il primo caricamento
        var optionsNEW = {
            min: '1916-01-01',
            max: '1919-01-01',
            maxHeight: "200px",
            minHeight: "200px",
            zoomMin: 1500000000, //1500000000 per il girono esatto 
            zoomMax: 3000000000
            };
        timeline.setOptions(optionsNEW);

        $('#carouselTitle').on('slid.bs.carousel', function () {
            actualid= $( ".active" ).find( ".actualcard").attr('id')
            timeline.setSelection(actualid, {focus: true})
          })

        timeline.on('select', function (properties) {
                $('#carouselTitle').carousel(properties.items - 1)
          });
    }})
})