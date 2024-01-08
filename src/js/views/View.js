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

	update(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;

		const newMarkup = this._generateMarkup();
		const newDOM = document.createRange().createContextualFragment(newMarkup);
		const newElements = Array.from(newDOM.querySelectorAll('*'));
		const currElements = Array.from(this._parentElem.querySelectorAll('*'));

		newElements.forEach((newEl, i) => {
			const currEl = currElements[i];

			if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '') {
				currEl.textContent = newEl.textContent;
			}

			if (!newEl.isEqualNode(currEl)) {
				Array.from(newEl.attributes).forEach(attr => currEl.setAttribute(attr.name, attr.value));
			}
		});
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
