// Variables globales para la ubicación y el marcador del usuario
let userLocation;
let userMarker;

// Función para inicializar el mapa
function initMap(latitude, longitude) {
  // Configura el centro del mapa en la ubicación proporcionada (latitude, longitude)
  const initialLocation = { lat: latitude, lng: longitude };

  // Crea el objeto del mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    center: initialLocation,
    zoom: 16, // Ajusta el nivel de zoom según tus necesidades
  });

  // Crea un marcador en la ubicación del usuario
  userMarker = new google.maps.Marker({
    position: initialLocation,
    map: map,
    title: "Tu ubicación",
  });
}

// Crea el evento para que cuando se cargue la página le pida acceso a la ubicación
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    // El navegador admite geolocalización
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // ...
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Si el marcador ya existe, simplemente actualiza su posición
        if (userMarker) {
          userMarker.setPosition(userLocation);
        } else {
          // Si el marcador no existe, crea uno nuevo y llama a la función initMap
          initMap(userLocation.lat, userLocation.lng);
        }
      },
      (error) => {
        // Ocurrió un error al obtener la ubicación del usuario
        console.error("Error al obtener la ubicación del usuario:", error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    );
  } else {
    console.error("El navegador no admite geolocalización.");
  }
});