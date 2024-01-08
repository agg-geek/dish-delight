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
			// console.log(currEl, newEl.isEqualNode(currEl)); // the node and its parent both will have false

			if (
				!newEl.isEqualNode(currEl) &&
				newEl.firstChild?.nodeValue.trim() !== '' // see explanation below (1)
			) {
				currEl.textContent = newEl.textContent; // see explanation below (2)
			}

			// (1) -> change only if the element is a text node (not some parent etc)
			// nodeValue returns the content of the text node if the elem is a textnode, null otherwise
			// firstchild because newEl is an element, but its child is a text node
			// also notice the firstchild?.

			// (2) -> update curEl's textcontent (not newEl's)
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
