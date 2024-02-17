import View from './View.js';

class NewRecipeView extends View {
	_parentElem = document.querySelector('.upload');
	_message = 'Recipe created successfully!';

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
		this._parentElem.addEventListener('submit', function (e) {
			e.preventDefault();
			// notice the format of the dataArr:
			// ['name' (input.getattribute(name)), 'value' (input.value)]
			const dataArr = [...new FormData(this)];
			console.log(dataArr);

			// fromEntries is reverse of arr.entries()
			const dataObj = Object.fromEntries(dataArr);
			handler(dataObj);
		});
	}

	// _generateMarkup() {}
}

export default new NewRecipeView();
