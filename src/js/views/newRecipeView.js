import View from './View.js';

class NewRecipeView extends View {
	_parentElement = document.querySelector('.upload');
	_message = 'Recipe was successfully uploaded :)';

	_window = document.querySelector('.add-recipe-window');
	_overlay = document.querySelector('.overlay');
	_btnOpen = document.querySelector('.nav__btn--add-recipe');
	_btnClose = document.querySelector('.btn--close-modal');

	constructor() {
		super();
		this._addHandlerShowWindow();
		this._addHandlerHideWindow();
	}

	toggleWindow() {
		this._window.classList.toggle('hidden');
		this._overlay.classList.toggle('hidden');
	}

	_addHandlerShowWindow() {
		this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
	}

	_addHandlerHideWindow() {
		this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
		this._overlay.addEventListener('click', this.toggleWindow.bind(this));
	}

	addHandlerNewRecipe(handler) {
		this._parentElement.addEventListener('submit', function (e) {
			e.preventDefault();
			// the new recipe data is in the form
			// we can get the data by manually selecting every form elem and then using elem.value
			// but we use FormData, a browser API
			// here, the this keyword points to this._parentElement, which is the form itself
			// because we are in the event listener
			const dataArr = [...new FormData(this)];
			// console.log(dataArr);

			// fromEntries is reverse of arr.entries()
			const data = Object.fromEntries(dataArr);
			handler(data);
		});
	}

	_generateMarkup() {}
}

export default new NewRecipeView();
