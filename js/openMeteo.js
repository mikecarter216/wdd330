// openMeteo.js — fetch current weather from Open-Meteo
export async function fetchWeather(lat, lon){
// Open-Meteo current weather endpoint (no API key)
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&windspeed_unit=ms`;
const res = await fetch(url);
if(!res.ok) throw new Error('Weather fetch failed');
const json = await res.json();
return json.current_weather || {};
}