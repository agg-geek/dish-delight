import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
	_parentElem = document.querySelector('.pagination');

	addHandlerBtnClick(handler) {
		this._parentElem.addEventListener('click', function (evt) {
			const btn = evt.target.closest('.btn--inline');
			if (!btn) return;

			const goToPage = Number(btn.dataset.goto);
			handler(goToPage);
		});
	}

	_generateMarkup() {
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
		const currPage = this._data.page;

		// 0. numPages = 0

		// 1. page = 1 and numPages = 1 (no pagination buttons)
		if (currPage === 1 && numPages === 1) return '';

		// 2. page = 1 and numPages > 1 (only next btn)
		if (currPage === 1 && numPages > 1) return this._generateBtnMarkup(currPage + 1, 0);

		// 3. page != 1 and page != last and numPages > 1 (both btns)
		if (currPage != 1 && currPage != numPages && numPages > 1) {
			return this._generateBtnMarkup(currPage - 1, 1) + this._generateBtnMarkup(currPage + 1, 0);
		}

		// 4. page === last (prev btn)
		if (currPage === numPages) return this._generateBtnMarkup(currPage - 1, 1);
	}

	_generateBtnMarkup(pageNo, prevBtn = 1) {
		return `<button data-goto="${pageNo}" class="btn--inline pagination__btn--${prevBtn ? 'prev' : 'next'}">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-${prevBtn ? 'left' : 'right'}"></use>
                    </svg>
                    <span>Page ${pageNo}</span>
                </button>`;
	}
}

export default new PaginationView();
