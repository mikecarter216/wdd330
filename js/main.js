// /js/main.js
import { getCoordinates } from "./geocode.js";
import { fetchWeather } from "./openMeteo.js";
import { fetchRandomMeal } from "./mealDB.js";

console.log("✅ main.js is loaded!");
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");
const recipeResult = document.getElementById("recipe-result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (!city) return;

  weatherResult.innerHTML = "<p class='muted'>Loading weather...</p>";
  recipeResult.innerHTML = "<p class='muted'>Loading recipe...</p>";

  try {
    console.log("🔍 Searching city:", city);

    const coords = await getCoordinates(city);
    console.log("📍 Coordinates returned from geocode.js:", coords, 
      "lat type:", typeof coords.lat, 
      "lon type:", typeof coords.lon
    );

    const weather = await fetchWeather(coords.lat, coords.lon);
    console.log("🌦 Weather data received:", weather);

    renderWeather(weather, city);

    const meal = await fetchRandomMeal();
    console.log("🍽 Meal data received:", meal);
    renderMeal(meal);
  } catch (err) {
    console.error("❌ Error loading data:", err);
    weatherResult.innerHTML = `<p class="muted">Could not load data: ${err.message}</p>`;
    recipeResult.innerHTML = `<p class="muted">Could not load data: ${err.message}</p>`;
  }
});

function renderWeather(data, city) {
  console.log("🖼 Rendering weather with data:", data);

  const { temperature, windspeed, weathercode } = data;

  weatherResult.innerHTML = `
    <div>
      <h4>Current in ${escapeHtml(city)}</h4>
      <p>Temp: <strong>${temperature}°C</strong></p>
      <p>Wind: <strong>${windspeed} m/s</strong></p>
      <p class="muted">Code: ${weathercode}</p>
    </div>
  `;
}

function renderMeal(meal) {
  console.log("🖼 Rendering meal with data:", meal);

  recipeResult.innerHTML = `
    <div>
      <h4>${escapeHtml(meal.strMeal)}</h4>
      <p class="muted">Category: ${escapeHtml(meal.strCategory) || "—"}</p>
      <img src="${meal.strMealThumb}" alt="Photo of ${escapeHtml(meal.strMeal)}" width="240" />
      <p><a href="${meal.strSource || "#"}" target="_blank" rel="noopener">Recipe source</a></p>
    </div>
  `;
}

// Prevent XSS
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}
