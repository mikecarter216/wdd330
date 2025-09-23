// /js/openMeteo.js
export async function fetchWeather(lat, lon) {
  console.log("➡️ fetchWeather called with:", lat, lon);

  // Ensure numbers, not strings
  lat = Number(lat);
  lon = Number(lon);

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  console.log("🌐 Weather API URL:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");

  const json = await res.json();
  console.log("📦 Weather API raw response:", json);

  if (!json.current_weather) {
    throw new Error("No current weather in response");
  }

  return json.current_weather;
}
