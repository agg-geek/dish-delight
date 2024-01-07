class SearchView {
	#parentElem = document.querySelector('.search');

	getQuery() {
		return this.#parentElem.querySelector('.search__field').value;
	}
}

export default new SearchView();
