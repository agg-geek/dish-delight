class SearchView {
	#parentElem = document.querySelector('.search');

	getQuery() {
		return this.#parentElem.querySelector('.search__field').value;
	}

	addHandlerSearch(handler) {
		this.#parentElem.addEventListener('submit', function (evt) {
			evt.preventDefault(); // since parentElem is a form
			handler();
		});
	}
}

export default new SearchView();
