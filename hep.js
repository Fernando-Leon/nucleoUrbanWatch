// Función para inicializar el mapa
function initMap() {
    // Configura el centro del mapa en una ubicación inicial
    const initialLocation = { lat: 40.7128, lng: -74.0060 };
  
    // Crea el objeto del mapa
    const map = new google.maps.Map(document.getElementById("map"), {
      center: initialLocation,
      zoom: 12, // Ajusta el nivel de zoom según tus necesidades
    });
  
    // Lógica para obtener la ubicación del usuario (puedes agregar la solicitud de permiso aquí)
    const getLocationButton = document.getElementById("getLocationButton");

  // Agrega un evento click al botón para solicitar la ubicación del usuario
  getLocationButton.addEventListener("click", () => {
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
          map.setCenter(userLocation);

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
      // El navegador no admite geolocalización
      console.error("El navegador no admite geolocalización.");
      // Aquí puedes manejar el caso en el que la geolocalización no sea compatible con el navegador
    }
  });
  
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
  