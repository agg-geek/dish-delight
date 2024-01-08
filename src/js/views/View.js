import icons from 'url:../../img/icons.svg';

export default class View {
	_data;

	_clearParentElem() {
		this._parentElem.innerHTML = '';
	}

	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;
		this._clearParentElem();
		this._parentElem.insertAdjacentHTML('afterbegin', this._generateMarkup());
	}

	// when updating servings of recipes, we re-render the entire recipe view
	// save this overhead by just updating the DOM selectively (DOM updating algorithm)
	update(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;

		const newMarkup = this._generateMarkup(); // we create new markup, but don't render it completely
		const newDOM = document.createRange().createContextualFragment(newMarkup);
		const newElements = newDOM.querySelectorAll('*');
		console.log(newElements);
		// checkout the innerHTML or textcontent of the servings value, etc
		// they will be changed according to the new data
	}

	renderSpinner() {
		// prettier-ignore
		const html =
        `<div class="spinner">
            <svg><use href="${icons}.svg#icon-loader"></use></svg>
        </div>`;

		this._clearParentElem();
		this._parentElem.insertAdjacentHTML('afterbegin', html);
	}

	renderMessage(msg = this._message) {
		// prettier-ignore
		const markup =
        `<div class="message">
            <div><svg><use href="${icons}#icon-smile"></use></svg></div>
            <p>${msg}</p>
        </div>`
		this._clearParentElem();
		this._parentElem.insertAdjacentHTML('afterbegin', markup);
	}

	renderError(msg = this._errorMessage) {
		// prettier-ignore
		const markup =
        `<div class="error">
            <div><svg><use href="${icons}#icon-alert-triangle"></use></svg></div>
            <p>${msg}</p>
        </div>`
		this._clearParentElem();
		this._parentElem.insertAdjacentHTML('afterbegin', markup);
	}
}
