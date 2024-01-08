import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
	_parentElem = document.querySelector('.pagination');

	_generateMarkup() {
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
		const currPage = this._data.page;

		// 0. numPages = 0

		// 1. page = 1 and numPages = 1 (no pagination buttons)
		if (currPage === 1 && numPages === 1) return 'No buttons';

		// 2. page = 1 and numPages > 1 (only next btn)
		if (currPage === 1 && numPages > 1) return 'Next button only';

		// 3. page != 1 and page != last and numPages > 1 (both btns)
		if (currPage != 1 && currPage != numPages && numPages > 1) return 'Both buttons';

		// 4. page === last (prev btn)
		if (currPage === numPages) return 'Previous button only';
	}
}

export default new PaginationView();
