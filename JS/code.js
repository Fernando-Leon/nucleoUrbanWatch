let map;
let userMarker;

// Crea el evento para que cuando se cargue la página le pida acceso a la ubicación
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    // El navegador admite geolocalización
    navigator.geolocation.watchPosition(
      (position) => {
        const userLocation = {
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
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    );
  } else {
    console.error("El navegador no admite geolocalización.");
  }
});

// Función para inicializar el mapa
function initMap(latitude, longitude) {
  // Configura el centro del mapa en la ubicación proporcionada (latitude, longitude)
  const initialLocation = { lat: latitude, lng: longitude };

  // Crea el objeto del mapa
  map = new google.maps.Map(document.getElementById("map"), {
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