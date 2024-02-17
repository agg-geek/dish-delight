import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg';
import View from './View';

class RecipeView extends View {
	_parentElem = document.querySelector('.recipe');
	_message = '';
	_errorMessage = 'We could not find that recipe. Please try another one!';

	addHandlerRender(handler) {
		['hashchange', 'load'].forEach(evt => window.addEventListener(evt, handler));
	}

	addHandlerServings(handler) {
		this._parentElem.addEventListener('click', function (evt) {
			const btn = evt.target.closest('.btn--update-servings');
			if (!btn) return;

			const newServings = Number(btn.dataset.newServings);
			newServings > 0 && handler(newServings);
		});
	}

	addHandlerAddBookmark(handler) {
		this._parentElem.addEventListener('click', function (evt) {
			const btn = evt.target.closest('.btn--bookmark');
			if (!btn) return;
			handler();
		});
	}

	// turn off whitespace and checkout below
	// notice user--generated!
	// it displays an icon if the recipe is created by the current user
	// we send the key as query while making the API request and hence
	// the user-created recipes also appear, which can be identified
	_generateMarkup() {
		return `<figure class="recipe__fig">
                    <img src="${this._data.imageUrl}" alt="${
			this._data.title
		}" class="recipe__img" />
                    <h1 class="recipe__title">
                        <span>${this._data.title}</span>
                    </h1>
                </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
					this._data.cookingTime
				}</span>
                <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${
					this._data.servings
				}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-servings" data-new-servings="${
						this._data.servings - 1
					}">
                        <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn--tiny btn--update-servings" data-new-servings="${
						this._data.servings + 1
					}">
                        <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- NOTICE! -->
            <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
            </div>
            <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${icons}#icon-bookmark${
			this._data.bookmarked ? '-fill' : ''
		}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
                ${this._data.ingredients
					.map(ing => this._generateIngredientMarkup(ing))
					.join('')}
            </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${
					this._data.publisher
				}</span>. Please check out directions at their
                website.
            </p>
            <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
            >
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </a>
        </div>`;
	}

	_generateIngredientMarkup(ing) {
		return `<li class="recipe__ingredient">
                    <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">${
						ing.quantity ? new Fraction(ing.quantity).toString() : ''
					}</div>
                    <div class="recipe__description">
                        <span class="recipe__unit">${ing.unit}</span>
                        ${ing.description}
                    </div>
                </li>`;
	}
}

export default new RecipeView();
