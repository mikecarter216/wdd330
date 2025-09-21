// mealDB.js — fetch a random meal suggestion from TheMealDB
export async function fetchRandomMeal(){
const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
const res = await fetch(url);
if(!res.ok) throw new Error('MealDB fetch failed');
const json = await res.json();
return json.meals[0];
}