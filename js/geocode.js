// /js/geocode.js
export async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");

  const json = await res.json();
  console.log("🗺 Geocoding response:", json);

  if (!json.results || json.results.length === 0) {
    throw new Error("City not found");
  }

  return {
    lat: json.results[0].latitude,
    lon: json.results[0].longitude,
  };
}