// geocode.js — simple geocoding using Open-Meteo's geocoding endpoint
export async function getCoordinates(city){
const q = encodeURIComponent(city);
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1`;
const res = await fetch(url);
if(!res.ok) throw new Error('Geocoding failed');
const json = await res.json();
if(!json.results || json.results.length===0) throw new Error('Location not found');
const {latitude: lat, longitude: lon} = json.results[0];
return {lat, lon};
}