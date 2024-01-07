import 'regenerator-runtime/runtime';
import { API_URL } from './config';
import { newRequest } from './helpers';

export const state = {
	recipe: {},
};

export const loadRecipe = async function (recipeId) {
	try {
		const data = await newRequest(`${API_URL}/${recipeId}`);

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
		// any error from newRequest function will be caught here
		// and then we handle it ourselves here (by printing it)
		// (even though this is just basic error handling at this point)
		console.error(`You got an error. ${err}`);
	}
};
