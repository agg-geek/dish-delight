import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';

const controlRecipe = async function () {
	try {
		const recipeId = window.location.hash.slice(1);
		if (!recipeId) return;

		recipeView.renderSpinner();

		await model.loadRecipe(recipeId);

		recipeView.render(model.state.recipe);
	} catch (err) {
		console.log(err);
		recipeView.renderError();
		// recipeView.renderError(`You got an error. ${err}`);
	}
};

const controlSearchResults = async function () {
	const query = searchView.getQuery();
	if (!query) return;

	await model.loadSearchResults(query);

	// Render the search results
	// resultsView.render(model.state.search.results);
	resultsView.render(model.getSearchResultsPage()); // test pagination buttons with different page values

	// Render the pagination buttons
	paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
	resultsView.render(model.getSearchResultsPage(goToPage));
	paginationView.render(model.state.search);
};

const init = function () {
	searchView.addHandlerSearch(controlSearchResults);
	recipeView.addHandlerRender(controlRecipe);
	paginationView.addHandlerBtnClick(controlPagination);
};

init();
