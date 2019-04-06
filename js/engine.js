$(document).ready(function() {


    var width = $( window ).width();
    if (width < 620) { 
    $('.mapmd').remove();
    }
    if (width >= 620) { 
    $('.mapsm').remove();
    $('#mappanel').remove();
    }


var map = L.map('map', {
 maxZoom: 11,
 minZoom: 8,
 maxBoundsViscosity: 1.0
});
map.setView([46.0160, 13.1611], 9);
var osm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'

}).addTo(map);

map.invalidateSize(true)

var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
     div.innerHTML =
            '<ul><li><div style="background-color: #FF0000; width: 30px; height: 5px; display: inline-block"></div> Border</li> <li><div style="background-color: #3388ff;  width: 30px; height: 5px; display: inline-block"></div> Flight</li> <li><img src="css/base.png" height="30"> Base</li> <li><img src="css/dogfight.png" height="30"> Dogfight</li></ul> ';
    return div;
};

legend.addTo(map);



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

var letters = [];
$.getJSON( "json/letters.json", function( data){
  letters = data;
});
 

               
$.when(places, border1916, border1917, letters).done(function() {

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
                $('<div class="carousel-item active"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center"> Victory #'+ arrayItem["number"]+ '</h1><h2>'+  arrayItem["place"] + " <br> "+ (arrayItem["date"]) + '</h2> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
            else {
                datesarray.push({id: arrayItem["number"], title: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"], className: "dogfight"})
                $('<div class="carousel-item"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center"> Victory #'+ arrayItem["number"]+ '</h1><h2>'+  arrayItem["place"] + " <br> "+ (arrayItem["date"]) + '</h2> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
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

        //console.log(letters)

        timeline.setSelection(1, {focus: true})

        itemfirst.add(items)
        itemfirst.add(itembattles)
        var layerGroup = L.layerGroup().addTo(map);


        var styleborder = {
            color: '#FF0000',
            //dashArray: '20,15'
        }

        function letterize(actid){
            actualet =[]
            $('#lettertext').html('')
            letters.forEach(function (letteritem) {
                if( letteritem.id == actid){
                    $('#lettertab').removeClass( "disabled" )
                    actualet = letteritem.letter
                    $('#lettertext').append(actualet)
                }
            })
            console.log(actualet)
            if (actualet.length == 0){
                $('#lettertab').addClass( "disabled" )
                $('#statstab').tab('show');
            }
        }

        letterize(actualid)

        var actualborder 
        actualborder = L.geoJson(border1916.responseJSON, {style: styleborder}).addTo(map);
        var actualplace= L.geoJson(places.responseJSON, {filter: FirstPlaceFilter}).addTo(layerGroup);
        map.flyTo(actualplace.getBounds().getCenter(), 9);

        markerino(actualplace)
        function markerino (pointino){
        pointino.eachLayer(function(l) {
            var props = l.feature.properties;
            var m = L.icon({
                iconUrl: 'css/dogfight.png',
                iconSize: [50,50],
            });
            l.setIcon(m);
        });
    }
        
        base_SCaterina = [46.0341, 13.1857,]
        base_Padova = [45.4054, 11.8839]
        baseQuinto = [45.6496, 12.196]

        var BaseIcon = L.icon({
            iconUrl: 'css/base.png',
            iconSize:     [50, 50], // size of the icon
            iconAnchor:   [25, 40]
        });

        var actualbase = base_SCaterina

        var basemarker =L.marker(actualbase, {icon: BaseIcon}).addTo(layerGroup);
   

        var arrow = L.polyline([actualbase, actualplace.getBounds().getCenter()]).addTo(layerGroup);
        var arrowHead = L.polylineDecorator(arrow, {
            patterns: [
                {
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})
                }
            ]
        }).addTo(layerGroup);

        var NW = L.latLng(47.53389264528655,  10.553741455078123);
        var SE = L.latLng(44.81691551782855, 14.7216796875);
        var bounds = L.latLngBounds(NW, SE);
        map.setMaxBounds(bounds);
        

        firstitem = dati.find(function(dati){return dati.number ==  1})

        var plane = firstitem.plane.type
        var squad = firstitem.plane.squad
        var wingmenarray = firstitem.wingmen
        var nation = firstitem.nation
        var rivalplane = firstitem.rival_plane.rival_type
        var rivalsquad = firstitem.rival_plane.rival_squad
        var victimsarray = firstitem.victims
        var distance = (L.latLng(actualbase).distanceTo(actualplace.getBounds().getCenter())) / 1000


        $('.planestat').append(plane)
        $('.squadstat').append(squad)
        $('.nationstat').append(nation)
        $('.rivalplanestat').append(rivalplane)
        $('.rivalsquadstat').append(rivalsquad)
        $('.basestat').append("Santa Caterina (UD)")
        $('.distancestat').append(distance.toFixed(1) + " km")
        //$('.victimsstat').append(victims)

        wingmenarray.forEach(function (wingmenarrayitem) {
            var li = document.createElement('li');
            $('.wingmenstat').append(li);
        
            li.innerHTML += wingmenarrayitem;
        });

        victimsarray.forEach(function (victimsarrayitem) {
            if (victimsarrayitem == "Unknown"){
                var li = document.createElement('li');
                $('.victimsstat').append(li);
                li.innerHTML += victimsarrayitem;
            }
            else{
                var ul = document.createElement('ul');
                $('.victimsstat').append(ul);
                var rivalgrade = document.createElement('li');
                var rivalname = document.createElement('li');
                var rivalstatus = document.createElement('li');
                ul.append(rivalname)
                rivalname.innerHTML += ('<div class="row"><div class="col-md-3 col-5"><b>Name</b></div><div class="col-md-9 col-7">'+ victimsarrayitem.name +'</div></div>');
                //ul.append(rivalgrade)
                //rivalgrade.innerHTML += ('<div class="row"><div class="col-md-3 col-5">Grade</div><div class="col-md-9 col-7">'+ victimsarrayitem.grade +'</div></div>');
                ul.append(rivalstatus)
                rivalstatus.innerHTML += ('<div class="row"><div class="col-md-3 col-5"><b>Status</b></div><div class="col-md-9 col-7">'+ victimsarrayitem.status +'</div></div>');
            }
        });

        function FirstPlaceFilter(feature) {
            if (feature.properties.name === firstitem["place"]) return true
            }

        $('#carouselTitle').on('slid.bs.carousel', function () {
            actualid= $( ".active" ).find( ".actualcard").attr('id')
            timeline.setSelection(actualid, {focus: true})
            //json del nuovo oggetto
            var actualitem
            layerGroup.clearLayers();
            actualitem = dati.find(function(dati){return dati.number ==  actualid})
            if (actualid == 25){
                actualborder.remove(); 
                actualborder = L.geoJson(border1917.responseJSON, {style: styleborder}).addTo(map);
            }
            if (actualid == 24){
                actualborder.remove(); 
                actualborder = L.geoJson(border1916.responseJSON, {style: styleborder}).addTo(map);
            }

            
            var actualplace= L.geoJson(places.responseJSON, {filter: PlaceFilter}).addTo(layerGroup);
            map.flyTo(actualplace.getBounds().getCenter(), 9);
            markerino(actualplace)


            if (actualid <= 24){
                var actualbase = base_SCaterina
                var basename = "Santa Caterina (UD)"
                var basemarker =L.marker(actualbase, {icon: BaseIcon}).addTo(layerGroup);
                var arrow = L.polyline([actualbase, actualplace.getBounds().getCenter()]).addTo(layerGroup);
                var arrowHead = L.polylineDecorator(arrow, {
                patterns: [
                {
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})
                }
            ]
            }).addTo(layerGroup);
            }
            if (actualid >= 25 && actualid < 31){
                var actualbase = base_Padova
                var basename = "Padova"
                var basemarker =L.marker(actualbase, {icon: BaseIcon}).addTo(layerGroup);
                var arrow = L.polyline([actualbase, actualplace.getBounds().getCenter()]).addTo(layerGroup);
                var arrowHead = L.polylineDecorator(arrow, {
                patterns: [
                {
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})
                }
            ]
            }).addTo(layerGroup);
            }
            if (actualid >= 31){
                var actualbase = baseQuinto
                var basename = "Quinto (TV)"
                var basemarker =L.marker(actualbase, {icon: BaseIcon}).addTo(layerGroup);
                var arrow = L.polyline([actualbase, actualplace.getBounds().getCenter()]).addTo(layerGroup);
                var arrowHead = L.polylineDecorator(arrow, {
                patterns: [
                {
                    offset: '100%',
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})
                }
            ]
            }).addTo(layerGroup);
            }
            function PlaceFilter(feature) {
                if (feature.properties.name === actualitem["place"]) return true
                }
            

            $('.planestat').html('')
            $('.squadstat').html('')
            $('.wingmenstat').html('')
            $('.nationstat').html('')
            $('.rivalplanestat').html('')
            $('.rivalsquadstat').html('')
            $('.victimsstat').html('')
            $('.basestat').html('')
            $('.distancestat').html('')



            var plane = actualitem.plane.type
            var squad = actualitem.plane.squad
            var wingmenarray = actualitem.wingmen
            var nation = actualitem.nation
            var rivalplane = actualitem.rival_plane.rival_type
            var rivalsquad = actualitem.rival_plane.rival_squad
            var victimsarray = actualitem.victims
            var distance = (L.latLng(actualbase).distanceTo(actualplace.getBounds().getCenter())) / 1000
    
            $('.planestat').append(plane)
            $('.squadstat').append(squad)
            $('.nationstat').append(nation)
            $('.rivalplanestat').append(rivalplane)
            $('.rivalsquadstat').append(rivalsquad)
            $('.basestat').append(basename)
            $('.distancestat').append(distance.toFixed(1) + " km")
            //$('.victimsstat').append(victims)

            wingmenarray.forEach(function (wingmenarrayitem) {
                var li = document.createElement('li');
                $('.wingmenstat').append(li);
            
                li.innerHTML += wingmenarrayitem;
            });

            victimsarray.forEach(function (victimsarrayitem) {
                if (victimsarrayitem == "Unknown"){
                    var li = document.createElement('li');
                    $('.victimsstat').append(li);
                    li.innerHTML += victimsarrayitem;
                }
                else{
                    var ul = document.createElement('ul');
                    $('.victimsstat').append(ul);
                    var rivalgrade = document.createElement('li');
                    var rivalname = document.createElement('li');
                    var rivalstatus = document.createElement('li');
                    ul.append(rivalname)
                    rivalname.innerHTML += ('<div class="row"><div class="col-md-3 col-5"><b>Name</b></div><div class="col-md-9 col-7">'+ victimsarrayitem.name +'</div></div>');
                    //ul.append(rivalgrade)
                    //rivalgrade.innerHTML += ('<div class="row"><div class="col-md-3 col-5">Grade</div><div class="col-md-9 col-7">'+ victimsarrayitem.grade +'</div></div>');
                    ul.append(rivalstatus)
                    rivalstatus.innerHTML += ('<div class="row"><div class="col-md-3 col-5"><b>Status</b></div><div class="col-md-9 col-7">'+ victimsarrayitem.status +'</div></div>');

                }
            });

            letterize(actualid)


          })

        timeline.on('select', function (properties) {
                $('#carouselTitle').carousel(properties.items - 1)
          });


          $('.nav-tabs a').on('show.bs.tab', function(e){
            console-console.log("oooooo");
            var resizeEvent = new Event('resize');
            window.dispatchEvent(resizeEvent);
            map.setZoom(8);
            map.flyTo(actualplace.getBounds().getCenter(), 9);
          });
        })
    }})
})
})