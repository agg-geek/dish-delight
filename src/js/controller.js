import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

const showRecipe = async function () {
	try {
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza'); // all recipes

		const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'); // pizza
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd0b8'); // chocolate

		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzzz'); // bad id
		const data = await res.json();
		console.log(data);

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

		let { recipe } = data.data;
		console.log(recipe);

		recipe = {
			id: recipe.id,
			title: recipe.title,
			servings: recipe.servings,
			publisher: recipe.publisher,
			ingredients: recipe.ingredients,
			// remove underscores
			cookingTime: recipe.cooking_time,
			sourceUrl: recipe.source_url,
			imageUrl: recipe.image_url,
		};

		console.log(recipe);
	} catch (err) {
		console.log(err);
	}
};

showRecipe();
