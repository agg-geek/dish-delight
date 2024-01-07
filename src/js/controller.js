import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

const controlRecipe = async function () {
	try {
		const recipeId = window.location.hash.slice(1);
		if (!recipeId) return;

		recipeView.renderSpinner();

		await model.loadRecipe(recipeId);

		recipeView.render(model.state.recipe);
	} catch (err) {
		console.log(err);
	}
};

controlRecipe();

// we are listening for events here (should belong to recipeView)
// but this requires controlRecipe fn which is present in the controller only
// we may think we can import controlRecipe in the view
// this is bad, as the view and model should not be aware of controller
// and only the controller should delegate tasks to the model and view
// this is a standard problem, and we use design patterns to solve them
// and use publisher-subscriber pattern  (the design pattern)
['hashchange', 'load'].forEach(evt => window.addEventListener(evt, controlRecipe));
