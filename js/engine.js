$(document).ready(function() {


var map = L.map('map', {
 maxZoom: 10,
 minZoom: 9,
});
map.setView([46.0160, 13.1611], 9);
var osm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
}).addTo(map);


//'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//per caricare il geojson serve un procedimento diverso
var places = $.ajax({
                    url:"json/places.json",
                    dataType: "json",
                })
var border1916 = $.ajax({
                    url:"json/linea_1916.json",
                    dataType: "json",
                })
var border1917 = $.ajax({
                    url:"json/linea_dic_1917.json",
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
                datesfirst.push({id: arrayItem["number"], title: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"], className: "dogfight"})
                $('<div class="carousel-item active"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
            else {
                datesarray.push({id: arrayItem["number"], title: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"], className: "dogfight"})
                $('<div class="carousel-item"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["place"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
        })
        $.when(battles).done(function() {
        var container = document.getElementById('visualization');

        // Create a DataSet (allows two way data-binding)
        var itemfirst =  new vis.DataSet(datesfirst)
        var items =  (datesarray)
        var itembattles = (battles.responseJSON)

        // Configuration for the Timeline
        var options = {
        min: '1916-01-01',
        max: '1919-01-01',
        maxHeight: "150px",
        minHeight: "150px",
        zoomMin: 1500000000, //1500000000 per il girono esatto
        zoomMax: 1500000000,
        type: 'point'
        };

        
        // Create a Timeline
        var timeline = new vis.Timeline(container, itemfirst, options);

        var actualid = 1

        timeline.setSelection(1, {focus: true})

        itemfirst.add(items)
        itemfirst.add(itembattles)
        var layerGroup = L.layerGroup().addTo(map);
        var BorderGroup = L.layerGroup().addTo(map);



        var actualborder = L.geoJson(border1916.responseJSON).addTo(BorderGroup);
        var actualplace= L.geoJson(places.responseJSON, {filter: FirstPlaceFilter}).addTo(layerGroup);
        map.flyTo(actualplace.getBounds().getCenter(), 10);
        function FirstPlaceFilter(feature) {
            if (feature.properties.name === firstitem["place"]) return true
            }

        $('#carouselTitle').on('slid.bs.carousel', function () {
            actualid= $( ".active" ).find( ".actualcard").attr('id')
            timeline.setSelection(actualid, {focus: true})
            $( ".vis-item.vis-selected" ).tooltip();
            //json del nuovo oggetto
            var actualitem
            actualitem = dati.find(function(dati){return dati.number ==  actualid})
            if (actualid == 25){
                BorderGroup.removeLayer(actualborder);
                var actualborder = L.geoJson(border1917.responseJSON).addTo(BorderGroup);
            }
            if (actualid == 24){
                BorderGroup.removeLayer(actualborder);
                var actualborder = L.geoJson(border1917.responseJSON).addTo(BorderGroup);
            }

            layerGroup.clearLayers();
            var actualplace= L.geoJson(places.responseJSON, {filter: PlaceFilter}).addTo(layerGroup);
            map.flyTo(actualplace.getBounds().getCenter(), 10);
            function PlaceFilter(feature) {
                if (feature.properties.name === actualitem["place"]) return true
                }
    
          })

        timeline.on('select', function (properties) {
                $('#carouselTitle').carousel(properties.items - 1)
          });

        })
    }})
})
})