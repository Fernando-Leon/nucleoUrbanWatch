// Global variables
var map; // Mapa 
var markers = []; // Lista de marcadores de ubicación
var directionsRenderer = []; // Indica las direcciones de la ruta
var infoWindow;
var allRutes = [];

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
function createRoute(startPoint, endPoint, allRutes = false) {
  const directionsService = new google.maps.DirectionsService();

  const request = {
    origin: startPoint,
    destination: endPoint,
    travelMode: google.maps.TravelMode.DRIVING, // Modo de transporte (DRIVING, WALKING, BICYCLING, TRANSIT)
  };

  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK && allRutes === false) {
      clearRoutes(); // Eliminar rutas y marcadores existentes antes de crear la nueva ruta
      directionsRenderer.setDirections(result);
      addMarker(startPoint, "Punto de Inicio");
      addMarker(endPoint, "Punto de Destino");
    } 
    else if (status === google.maps.DirectionsStatus.OK && allRutes === true) {
      alert("Se muestran todas las rutas");
      directionsRenderer.setDirections(result);
      addMarker(startPoint, "Punto de Inicio");
      addMarker(endPoint, "Punto de Destino");
    }
    else {
      console.error("Error al obtener la ruta:", status);
    }
  });
}

function createRoutesAll(startPoint, endPoint) {
  let directionsService = new google.maps.DirectionsService();
  const request = {
    origin: startPoint,
    destination: endPoint,
    travelMode: google.maps.TravelMode.DRIVING, // Modo de transporte (DRIVING, WALKING, BICYCLING, TRANSIT)
  }; 

  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
      addMarker(startPoint, "Punto de Inicio");
      addMarker(endPoint, "Punto de Destino");
    } else {
      console.error("Error al obtener la ruta:", status);
    }
  });
}

const listRoutes = document.getElementById("list-routes");
const liElements = listRoutes.querySelectorAll(".json-points");

liElements.forEach((li) => {
  li.addEventListener("click", function () {
    const jsonValue = this.getAttribute("data-value");
    const { lat1, lng1, lat2, lng2 } = JSON.parse(jsonValue);
    const obj1 = { lat: lat1, lng: lng1 };
    const obj2 = { lat: lat2, lng: lng2 };
    createRoute(obj1, obj2);
  });
});

const showAllRoutesButton = document.getElementById("show-all-routes");
showAllRoutesButton.addEventListener("click", showAllRoutes);

function showAllRoutes() {
  if (allRutes.length === 0) {
    let routeObjects = [];

    liElements.forEach((li) => {
      let jsonValue = li.getAttribute("data-value");
      let { lat1, lng1, lat2, lng2 } = JSON.parse(jsonValue);
      let obj1 = { lat: lat1, lng: lng1 };
      let obj2 = { lat: lat2, lng: lng2 };
      routeObjects.push({ obj1, obj2 });
      // Crea una nueva instancia de DirectionsRenderer para cada ruta
    });

    allRutes = allRutes.concat(routeObjects); // Opción 1: Utilizando concat
    // allRutes.push(...routeObjects); // Opción 2: Utilizando spread operator

    console.log(allRutes);
  }
}

 
window.initMap = initMap;  
