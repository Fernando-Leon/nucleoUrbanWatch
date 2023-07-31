var userLocation = {lat: 40.7128, lng: -74.0060 };

// Crea el evento para que cuando se cargue la pagina le pida acceso a la ubicacion
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    // El navegador admite geolocalización
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // La ubicación del usuario se obtuvo correctamente
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Centra el mapa en la ubicación del usuario
        initMap( userLocation.lat, userLocation.lng );
        
        // Aquí puedes realizar cualquier otra lógica relacionada con la ubicación del usuario
        // Por ejemplo, puedes mostrar la distancia o tiempo de llegada a los vehículos cercanos, etc.
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




// Función para inicializar el mapa
function initMap( latitude, longitude ) {
  // Configura el centro del mapa en una ubicación inicial
  const initialLocation = { lat: latitude, lng: longitude };
  
  // Crea el objeto del mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    center: initialLocation,
    zoom: 10, // Ajusta el nivel de zoom según tus necesidades
  });
  
  map.setCenter(userLocation);
  // Lógica para obtener la ubicación de los vehículos de transporte público (puedes usar datos de ejemplo o una API real aquí)

  // Lógica para mostrar los marcadores de los vehículos de transporte público
  // Ejemplo de marcador:
  // const vehicleMarker = new google.maps.Marker({
  //   position: { lat: vehicleLat, lng: vehicleLng },
  //   map: map,
  //   title: "Nombre del vehículo",
  // });

  // Lógica para calcular rutas y tiempo de llegada (puedes usar datos de ejemplo o una API real aquí)
}
