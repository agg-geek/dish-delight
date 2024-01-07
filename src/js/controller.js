import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

const controlRecipe = async function () {
	try {
		const recipeId = window.location.hash.slice(1);
		if (!recipeId) return;

		recipeView.renderSpinner();

		await model.loadRecipe(recipeId);

		recipeView.render(model.state.recipe);
	} catch (err) {
		console.log(err);
		recipeView.renderError(`You got an error. ${err}`);
	}
};

const controlSearchResults = async function () {
	const query = searchView.getQuery();
	if (!query) return;

	await model.loadSearchResults('pizza');
	console.log(model.state.search.results);
};

const init = function () {
	recipeView.addHandlerRender(controlRecipe);
};

init();
