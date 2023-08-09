// Global variables
var map; // Mapa 
var markers = []; // Lista de marcadores de ubicación
var directionsRenderer = []; // Indica las direcciones de la ruta
var infoWindow;
var movingMarker;


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.05430, lng: -99.34229 },
    zoom: 16,
  });

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");
  locationButton.textContent = "Mi ubicacion";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Yo");
          infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(18);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

// Función para agregar un marcador en el mapa
function addMarker(location, title) {
  let marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title,
  });

  markers.push(marker);
}

// Función para eliminar todas las rutas y marcadores existentes
function clearRoutes() {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];
  directionsRenderer.setDirections({ routes: [] });
}

// Función para crear una ruta entre dos puntos
function createRoute(startPoint, endPoint) {
  const directionsService = new google.maps.DirectionsService();

  const request = {
    origin: startPoint,
    destination: endPoint,
    travelMode: google.maps.TravelMode.DRIVING, // Modo de transporte (DRIVING, WALKING, BICYCLING, TRANSIT)
  };

  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      clearRoutes(); 
      directionsRenderer.setDirections(result);
      addMarker(startPoint, "Punto de Inicio");
      addMarker(endPoint, "Punto de Destino");
    }
    else {
      console.error("Error al obtener la ruta:", status);
    }
  });
}

const liElements = listRoutes.querySelectorAll(".json-points");

liElements.forEach((li) => {
  li.addEventListener("click", function () {
    const jsonValue = this.getAttribute("data-value");
    const { lat1, lng1, lat2, lng2 } = JSON.parse(jsonValue);
    const obj1 = { lat: lat1, lng: lng1 };
    const obj2 = { lat: lat2, lng: lng2 };
    createRoute(obj1, obj2);
    moveMarkerAlongRouteWithSpeed(obj1, obj2); // Iniciar el movimiento del marcador
  });
});



function moveMarkerAlongRouteWithSpeed(startPoint, endPoint, speedKph = 20) {
  if (movingMarker) {
    movingMarker.setMap(null); // Eliminar el marcador existente si hay uno
  }

  movingMarker = new google.maps.Marker({
    position: startPoint,
    map: map,
    title: "Dispositivo en movimiento",
    icon: "../src/svg/icon.png", // Personaliza el icono del marcador móvil
  });

  const directionsService = new google.maps.DirectionsService();
  const request = {
    origin: startPoint,
    destination: endPoint,
    travelMode: google.maps.TravelMode.DRIVING, // Modo de transporte (DRIVING, WALKING, BICYCLING, TRANSIT)
  };
  
  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const route = result.routes[0];
      const steps = route.legs[0].steps;
  
      const totalDistanceMeters = route.legs[0].distance.value; // En metros
      const totalDistanceKilometers = totalDistanceMeters / 10000; // En kilómetros
      const numSteps = Math.ceil(totalDistanceKilometers * 1000); // Multiplica por 10
  
      let stepIndex = 0; // Declarar stepIndex aquí
  
      function animateMarkerAlongRoute() {
        if (stepIndex >= numSteps) {
          movingMarker.setMap(null); // Eliminar el marcador al finalizar la ruta
          return;
        }
  
        const step = steps[Math.floor(stepIndex)];
        const latLng = step.start_location;
  
        movingMarker.setPosition(latLng);
  
        stepIndex++;
        setTimeout(animateMarkerAlongRoute, 1000); // Actualizar posición cada 10 segundos para una animación suave
      }
  
      animateMarkerAlongRoute();
    } else {
      console.error("Error al obtener la ruta:", status);
    }
  });
}



 
window.initMap = initMap;  
