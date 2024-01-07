class SearchView {
	_parentElem = document.querySelector('.search');

	_clearParentElem() {
		this._parentElem.querySelector('.search__field').value = '';
	}

	getQuery() {
		const query = this._parentElem.querySelector('.search__field').value;
		this._clearParentElem();
		return query;
	}

	addHandlerSearch(handler) {
		this._parentElem.addEventListener('submit', function (evt) {
			evt.preventDefault(); // since parentElem is a form
			handler();
		});
	}
}

export default new SearchView();
