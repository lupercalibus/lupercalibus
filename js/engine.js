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
        var items =  new timeline.DataSet([
            {id: 1, content: 'item 1', start: '2014-04-20'},
            {id: 2, content: 'item 2', start: '2014-04-14'},
            {id: 3, content: 'item 3', start: '2014-04-18'},
            {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
            {id: 5, content: 'item 5', start: '2014-04-25'},
            {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
          ]);
        
        
        
        //new timeline.DataSet(datesarray);

        // Configuration for the Timeline
        var options = {
        min: '1916-01-01',
        max: '1919-01-01',
        maxHeight: "200px",
        minHeight: "200px",
        zoomMin: 1500000000, //1500000000 per il girono esatto
        };

        // Create a Timeline
        var timeline = new timeline.Timeline(container, items, options);
        timeline.setWindow('1916-03-30', '1916-04-16')
        var actualid = 1

        timeline.setSelection(1, {focus: true})

        $('#carouselTitle').on('slid.bs.carousel', function () {
            actualid= $( ".active" ).find( ".actualcard").attr('id')
            timeline.setSelection(actualid, {focus: true})
          })

        timeline.on('select', function (properties) {
                $('#carouselTitle').carousel(properties.items - 1)
          });
    }})
})