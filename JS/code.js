var map, marker;

var watchId, geoLoc;

function initMap(){
    const position = {lat: 40.730610, lng: -73.935242};
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 10
    });

    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Mi ubicacion'
    });

    getPosition();

}

function getPosition(){

    if(navigator.geolocation){
        var options = {timeout: 60000}
        geoLoc = navigator.geolocation;
        watchId = geoLoc.watchPosition(showLocationOnMap, errorHandler, options);
    }else {
        alert('El novegador no soporta la geolocalizacion');
    }
}

function showLocationOnMap(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}  Longitude: ${longitude}`);
    let pos = {lat: latitude, lng: longitude};

    map.setCenter(pos);
    marker.setPosition(pos);
}

function errorHandler(err){
    if(err.code == 1){
        alert('Error: Acceso denegado!');
    }else if(err.code == 2){
        alert('Error: Posicion no disponible!');
    }
}

initMap();