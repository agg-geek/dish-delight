import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import bookmarksView from './views/bookmarksView.js';

const controlRecipe = async function () {
	try {
		const recipeId = window.location.hash.slice(1);
		if (!recipeId) return;

		resultsView.update(model.getSearchResultsPage());

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

const controlAddBookmark = function () {
	// 1. add/remove bookmarks
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.removeBookmark(model.state.recipe.id);

	// render recipe as bookmarked
	recipeView.update(model.state.recipe);

	// render bookmarks in the bookmarks toggle (booksmarksView)
	bookmarksView.render(model.state.bookmarks);
};

const init = function () {
	searchView.addHandlerSearch(controlSearchResults);
	recipeView.addHandlerRender(controlRecipe);
	recipeView.addHandlerServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	paginationView.addHandlerBtnClick(controlPagination);
};

init();
