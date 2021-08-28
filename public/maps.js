var mymap = L.map('mapid').setView([53.1424, 7.6921],5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3JhaWctd2l0IiwiYSI6ImNrc3RiZWJoaTAxZjUzMXB1OTVvdnoxODQifQ._ziX0Jg1o6S_02n8xOdWbQ', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(mymap);

let  popup = L.popup();

var layerGroup = L.layerGroup().addTo(mymap);

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

function addMarker(lat,lng){
  var marker = L.marker([lat, lng]).addTo(layerGroup);
}

mymap.on('click', onMapClick);