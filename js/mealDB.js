// /js/mealDB.js
export async function fetchRandomMeal() {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Meal fetch failed");

  const json = await res.json();
  return json.meals[0];
}