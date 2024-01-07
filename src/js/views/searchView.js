class SearchView {
	#parentElem = document.querySelector('.search');

	#clearParentElem() {
		this.#parentElem.querySelector('.search__field').value = '';
	}

	getQuery() {
		const query = this.#parentElem.querySelector('.search__field').value;
		this.#clearParentElem();
		return query;
	}

	addHandlerSearch(handler) {
		this.#parentElem.addEventListener('submit', function (evt) {
			evt.preventDefault(); // since parentElem is a form
			handler();
		});
	}
}

export default new SearchView();
