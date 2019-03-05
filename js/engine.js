$(document).ready(function() {


var map = L.map('map', {
 maxZoom: 18,
 minZoom: 6,
});
map.setView([46.0160, 13.1611], 7);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//per caricare il geojson serve un procedimento diverso
var places = $.ajax({
                    url:"json/places.json",
                    dataType: "json",
                })   

               
$.when(places).done(function() {

     var battles = $.ajax({
        url:"json/battles.json",
        dataType: "json",
    })  


$.ajax({
    dataType: "json",
    url: "json/Baracca.json",
    success: function(dati) {
    var datesfirst = []
    var datesarray = []
    var firstitem = []
        dati.forEach(function(arrayItem) {
            //datesarray.push({id: arrayItem["number"], content: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"]})
            if (arrayItem["number"] == 1) {
                firstitem = arrayItem
                datesfirst.push({id: arrayItem["number"], content: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"]})
                $('<div class="carousel-item active"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
            else {
                datesarray.push({id: arrayItem["number"], content: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"]})
                $('<div class="carousel-item"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
        })

        var container = document.getElementById('visualization');

        // Create a DataSet (allows two way data-binding)
        var itemfirst =  new vis.DataSet(datesfirst)
        var items =  (datesarray)
        var itembattles = (battles.responseJSON)

        // Configuration for the Timeline
        var options = {
        min: '1916-01-01',
        max: '1919-01-01',
        maxHeight: "200px",
        minHeight: "200px",
        zoomMin: 1500000000, //1500000000 per il girono esatto
        zoomMax: 1500000000
        };

        // Create a Timeline
        var timeline = new vis.Timeline(container, itemfirst, options);

        var actualid = 1

        timeline.setSelection(1, {focus: true})

        itemfirst.add(items)
        itemfirst.add(itembattles)
        var layerGroup = L.layerGroup().addTo(map);

        var actualplace= L.geoJson(places.responseJSON, {filter: FirstPlaceFilter}).addTo(layerGroup);
        function FirstPlaceFilter(feature) {
            if (feature.properties.name === firstitem["place"]) return true
            }

        $('#carouselTitle').on('slid.bs.carousel', function () {
            actualid= $( ".active" ).find( ".actualcard").attr('id')
            timeline.setSelection(actualid, {focus: true})

            console.log(dati)
            //json del nuovo oggetto
            var actualitem
            actualitem = dati.find(function(dati){return dati.number ==  actualid})


            layerGroup.clearLayers();
            var actualplace= L.geoJson(places.responseJSON, {filter: PlaceFilter}).addTo(layerGroup);
            function PlaceFilter(feature) {
                if (feature.properties.name === actualitem["place"]) return true
                }
    
          })

        timeline.on('select', function (properties) {
                $('#carouselTitle').carousel(properties.items - 1)
          });

       
    }})
})
})