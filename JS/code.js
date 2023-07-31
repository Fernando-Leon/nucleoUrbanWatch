function initMap() {
  // Crea un nuevo mapa en el elemento con el id "map"
  const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 0 }, // Centrar el mapa en coordenadas iniciales
      zoom: 15 // Zoom del mapa
  });

  // Verifica si el navegador soporta geolocalización
  if (navigator.geolocation) {
      // Obtiene la ubicación actual del dispositivo
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };

              // Centra el mapa en la ubicación actual
              map.setCenter(pos);

              // Crea un marcador en la ubicación actual
              const marker = new google.maps.Marker({
                  position: pos,
                  map: map,
                  title: "Ubicación actual"
              });

              // Actualiza la ubicación del marcador si el dispositivo se mueve
              navigator.geolocation.watchPosition((newPosition) => {
                  const newPos = {
                      lat: newPosition.coords.latitude,
                      lng: newPosition.coords.longitude
                  };
                  marker.setPosition(newPos);
                  map.setCenter(newPos);
              });
          },
          (error) => {
              console.error("Error al obtener la ubicación: ", error);
          }
      );
  } else {
      console.error("Geolocalización no está soportada por el navegador.");
  }
}

initMap();