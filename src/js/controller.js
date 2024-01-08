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

		console.log(model.state.search.results);

		// when you open a recipe, rerender the whole results page
		// so that if you opened a recipe from the results,
		// the recipe in results is shown active
		// (downside: if you open the page from a link, then no search results
		// so model.state.search.results is [] which causes resultsView render
		// to display 'no results found for your query')
		resultsView.render(model.getSearchResultsPage());

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

	resultsView.render(model.getSearchResultsPage());

	paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
	resultsView.render(model.getSearchResultsPage(goToPage));
	paginationView.render(model.state.search);
};

const controlServings = function (servings) {
	model.updateServings(servings);
	recipeView.update(model.state.recipe);
};

const init = function () {
	searchView.addHandlerSearch(controlSearchResults);
	recipeView.addHandlerRender(controlRecipe);
	recipeView.addHandlerServings(controlServings);
	paginationView.addHandlerBtnClick(controlPagination);
};

init();
