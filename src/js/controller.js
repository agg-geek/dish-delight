import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import icons from '../img/icons.svg'; // Normal assets (scripts, etc)
import icons from 'url:../img/icons.svg'; // non-programming static assets (images, audio, videos)
// console.log(icons); // http://localhost:1234/icons.dfd7a6db.svg?1704634778344

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
		// display spinner while loading the recipe
		displaySpinner(recipeContainer);

		// Loading recipe

		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza'); // all recipes

		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'); // pizza
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd0b8'); // chocolate

		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzzz'); // bad id

		console.log(window.location.hash); // #5ed6604591c37cdc054bc886

		const recipeId = window.location.hash.slice(1);
		const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);
		const data = await res.json();
		// console.log(data);

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

		let { recipe } = data.data;
		// console.log(recipe);

		recipe = {
			id: recipe.id,
			title: recipe.title,
			servings: recipe.servings,
			publisher: recipe.publisher,
			ingredients: recipe.ingredients,
			// remove underscores
			cookingTime: recipe.cooking_time,
			sourceUrl: recipe.source_url,
			imageUrl: recipe.image_url,
		};

		// console.log(recipe);

		// =====================================================================
		// Render recipe

		// prettier-ignore
		const html = 
        `<figure class="recipe__fig">
            <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--increase-servings">
                        <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn--tiny btn--increase-servings">
                        <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="recipe__user-generated">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round">
                <svg class="">
                    <use href="${icons}#icon-bookmark-fill"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(ing => 
                `<li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${ing.quantity}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                    </div>
                </li>`).join('')}
            </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${recipe.publisher}</span>. Please check out directions at their
                website.
            </p>
            <a
                class="btn--small recipe__btn"
                href="${recipe.sourceUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
        </div>`

		recipeContainer.innerHTML = '';
		recipeContainer.insertAdjacentHTML('afterbegin', html);
	} catch (err) {
		console.log(err);
	}
};

showRecipe();

// If page is loaded containing a recipe link already:
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
['hashchange', 'load'].forEach(evt => window.addEventListener(evt, showRecipe));
