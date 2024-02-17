import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import bookmarksView from './views/bookmarksView.js';
import newRecipeView from './views/newRecipeView.js';

const controlRecipe = async function () {
	try {
		const recipeId = window.location.hash.slice(1);
		if (!recipeId) return;

		resultsView.update(model.getSearchResultsPage());

		bookmarksView.update(model.state.bookmarks);

		recipeView.renderSpinner();

		await model.loadRecipe(recipeId);

		recipeView.render(model.state.recipe);
	} catch (err) {
		console.log(err);
		recipeView.renderError();
	}
};

const controlSearchResults = async function () {
	const query = searchView.getQuery();
	if (!query) return;

	resultsView.renderSpinner();

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
	if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
	else model.removeBookmark(model.state.recipe.id);

	recipeView.update(model.state.recipe);
	bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
	bookmarksView.render(model.state.bookmarks);
};

const controlNewRecipe = async function (newRecipe) {
	try {
		newRecipeView.renderSpinner();

		await model.uploadNewRecipe(newRecipe);

		newRecipeView.renderMessage();
		setTimeout(function () {
			newRecipeView.toggleWindow();
		}, 2000);

		recipeView.render(model.state.recipe);
		bookmarksView.render(model.state.bookmarks);
		window.history.pushState(null, '', `#${model.state.recipe.id}`);
	} catch (err) {
		console.log(err);
		newRecipeView.renderError(err.message);
	}
};

const init = function () {
	bookmarksView.addHandlerRender(controlBookmarks);
	searchView.addHandlerSearch(controlSearchResults);
	recipeView.addHandlerRender(controlRecipe);
	recipeView.addHandlerServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	paginationView.addHandlerBtnClick(controlPagination);
	newRecipeView.addHandlerNewRecipe(controlNewRecipe);
};

init();
