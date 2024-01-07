import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import icons from 'url:../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

function displaySpinner(parentElem) {
	// prettier-ignore
	const html = 
    `<div class="spinner">
        <svg>
            <use href="${icons}.svg#icon-loader"></use>
        </svg>
    </div>`;

	parentElem.innerHTML = '';
	parentElem.insertAdjacentHTML('afterbegin', html);
}

const showRecipe = async function () {
	try {
		// keep this part before you display the spinner
		// so that the default msg when no recipe is opened keeps showing
		const recipeId = window.location.hash.slice(1);
		if (!recipeId) return;

		// display spinner while loading the recipe
		displaySpinner(recipeContainer);

		// Loading recipe
		await model.loadRecipe(recipeId); // notice async fn calling other async fn

		// Render recipe
		recipeView.render(model.state.recipe);
	} catch (err) {
		console.log(err);
	}
};

showRecipe();

// If page is loaded containing a recipe link already:
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
['hashchange', 'load'].forEach(evt => window.addEventListener(evt, showRecipe));
