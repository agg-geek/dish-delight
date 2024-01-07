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
		console.error(`You got an error. ${err}`);

		// 1. controller controlRecipe fn calls this method to loadRecipe
		// 2. you cannot fetch the recipe (say bad id)
		// 3. helper throws err in (2) and passes to model
		// 4. model gets error, logs it "You got an error" and again throws it
		// 5. controller controlRecipe fn catches err
		// 6. calls recipeView.renderError(err) which displays error to user
		// model -> controller -> view, chain of passing errors
		// hence controller serves as a bridge
		throw err; // to pass to controller
	}
};
