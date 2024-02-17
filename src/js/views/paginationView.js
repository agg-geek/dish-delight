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

		if (currPage === 1 && numPages === 1) return '';
		if (currPage === 1 && numPages > 1)
			return this._generateBtnMarkup(currPage + 1, 0);
		if (currPage != 1 && currPage != numPages && numPages > 1) {
			return (
				this._generateBtnMarkup(currPage - 1, 1) +
				this._generateBtnMarkup(currPage + 1, 0)
			);
		}
		if (currPage === numPages) return this._generateBtnMarkup(currPage - 1, 1);
	}

	_generateBtnMarkup(pageNo, prevBtn = 1) {
		return `<button data-goto="${pageNo}" class="btn--inline pagination__btn--${
			prevBtn ? 'prev' : 'next'
		}">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-${
			prevBtn ? 'left' : 'right'
		}"></use>
                    </svg>
                    <span>Page ${pageNo}</span>
                </button>`;
	}
}

export default new PaginationView();
