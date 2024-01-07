import 'regenerator-runtime/runtime';
import { API_URL } from './config';

export const state = {
	recipe: {},
};

export const loadRecipe = async function (recipeId) {
	try {
		const res = await fetch(`${API_URL}/${recipeId}`);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

		const { recipe } = data.data;

		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			servings: recipe.servings,
			publisher: recipe.publisher,
			ingredients: recipe.ingredients,
			cookingTime: recipe.cooking_time,
			sourceUrl: recipe.source_url,
			imageUrl: recipe.image_url,
		};
	} catch (err) {
		console.log(err);
	}
};
