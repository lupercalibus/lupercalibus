$(document).ready(function() {


var map = L.map('map', {
 maxZoom: 11,
 minZoom: 8,
 maxBoundsViscosity: 1.0
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

               
$.when(places, border1916, border1917).done(function() {

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
                $('<div class="carousel-item active"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["number"]+  arrayItem["place"] + arrayItem["date"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
            }
            else {
                datesarray.push({id: arrayItem["number"], title: (arrayItem["place"]) +" "+ (arrayItem["date"]), start: arrayItem["date"], className: "dogfight"})
                $('<div class="carousel-item"> <div class="row"> <div class="col-md-3"></div> <div class="col-md-6 mx-1"> <div class="card alert-secondary" align="center"> <h1 class="actualcard" id="'+ arrayItem["number"] + '" align="center">'+ arrayItem["number"]+  arrayItem["place"] + arrayItem["date"] + '</h1> </div> </div> <div class="col-md-3"></div> </div> </div>').appendTo('.carousel-inner');
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

        var actualborder 
        actualborder = L.geoJson(border1916.responseJSON).addTo(map);
        var actualplace= L.geoJson(places.responseJSON, {filter: FirstPlaceFilter}).addTo(layerGroup);
        map.flyTo(actualplace.getBounds().getCenter(), 9);

        
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


        $('.planestat').append(plane)
        $('.squadstat').append(squad)
        $('.nationstat').append(nation)
        $('.rivalplanestat').append(rivalplane)
        $('.rivalsquadstat').append(rivalsquad)
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
                rivalname.innerHTML += ('<div class="row"><div class="col-3">Name</div><div class="col-9">'+ victimsarrayitem.name +'</div></div>');
                ul.append(rivalgrade)
                rivalgrade.innerHTML += ('<div class="row"><div class="col-3">Grade</div><div class="col-9">'+ victimsarrayitem.grade +'</div></div>');
                ul.append(rivalstatus)
                rivalstatus.innerHTML += ('<div class="row"><div class="col-3">Status</div><div class="col-9">'+ victimsarrayitem.status +'</div></div>');
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
            actualitem = dati.find(function(dati){return dati.number ==  actualid})
            if (actualid == 25){
                actualborder.remove(); 
                actualborder = L.geoJson(border1917.responseJSON).addTo(map);
            }
            if (actualid == 24){
                actualborder.remove(); 
                actualborder = L.geoJson(border1916.responseJSON).addTo(map);
            }

            layerGroup.clearLayers();
            var actualplace= L.geoJson(places.responseJSON, {filter: PlaceFilter}).addTo(layerGroup);
            map.flyTo(actualplace.getBounds().getCenter(), 9);
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


            var plane = actualitem.plane.type
            var squad = actualitem.plane.squad
            var wingmenarray = actualitem.wingmen
            var nation = actualitem.nation
            var rivalplane = actualitem.rival_plane.rival_type
            var rivalsquad = actualitem.rival_plane.rival_squad
            var victimsarray = actualitem.victims
    
    
            $('.planestat').append(plane)
            $('.squadstat').append(squad)
            $('.nationstat').append(nation)
            $('.rivalplanestat').append(rivalplane)
            $('.rivalsquadstat').append(rivalsquad)
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
                    rivalname.innerHTML += ('<div class="row"><div class="col-3">Name</div><div class="col-9">'+ victimsarrayitem.name +'</div></div>');
                    ul.append(rivalgrade)
                    rivalgrade.innerHTML += ('<div class="row"><div class="col-3">Grade</div><div class="col-9">'+ victimsarrayitem.grade +'</div></div>');
                    ul.append(rivalstatus)
                    rivalstatus.innerHTML += ('<div class="row"><div class="col-3">Status</div><div class="col-9">'+ victimsarrayitem.status +'</div></div>');
                }
            });

          })

        timeline.on('select', function (properties) {
                $('#carouselTitle').carousel(properties.items - 1)
          });

        })
    }})
})
})