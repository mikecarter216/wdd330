const recipeResult = document.getElementById('recipe-result');


form.addEventListener('submit', async (e) => {
e.preventDefault();
const city = cityInput.value.trim();
if (!city) return;
weatherResult.innerHTML = '<p class="muted">Loading weather...</p>';
recipeResult.innerHTML = '<p class="muted">Loading recipe...</p>';
try {
const coords = await getCoordinates(city); // returns {lat,lon}
const weather = await fetchWeather(coords.lat, coords.lon);
renderWeather(weather, city);


const meal = await fetchRandomMeal();
renderMeal(meal);
} catch (err) {
console.error(err);
weatherResult.innerHTML = `<p class="muted">Could not load data: ${err.message}</p>`;
recipeResult.innerHTML = `<p class="muted">Could not load data: ${err.message}</p>`;
}
});


function renderWeather(data, city){
const {temperature, windspeed, weathercode} = data;
weatherResult.innerHTML = `
<div>
<h4>Current in ${escapeHtml(city)}</h4>
<p>Temp: <strong>${temperature}°C</strong></p>
<p>Wind: <strong>${windspeed} m/s</strong></p>
<p class="muted">Code: ${weathercode}</p>
</div>
`;
}


function renderMeal(meal){
const html = `
<div>
<h4>${escapeHtml(meal.strMeal)}</h4>
<p class="muted">Category: ${escapeHtml(meal.strCategory) || '—'}</p>
<img src="${meal.strMealThumb}" alt="Photo of ${escapeHtml(meal.strMeal)}" width="240" />
<p><a href="${meal.strSource || '#'}" target="_blank" rel="noopener">Recipe source</a></p>
</div>
`;
recipeResult.innerHTML = html;
}


// minimal XSS escape
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]); }