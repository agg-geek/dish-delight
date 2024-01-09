import icons from 'url:../../img/icons.svg';
import View from './View.js';

class ResultsView extends View {
	_parentElem = document.querySelector('.results');
	_message = '';
	_errorMessage = 'No recipes found for your query! Please try again ;)';

	_generateMarkup() {
		return this._data.map(preview => this._generateMarkupPreview(preview)).join('');
	}

	_generateMarkupPreview(preview) {
		const id = window.location.hash.slice(1);

		return `<li class="preview">
            <a class="preview__link ${preview.id === id ? 'preview__link--active' : ''}" href="#${preview.id}">
                <figure class="preview__fig">
                    <img src="${preview.imageUrl}" alt="${preview.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${preview.title}</h4>
                    <p class="preview__publisher">${preview.publisher}</p>
                    <!-- 
                        <div class="preview__user-generated">
                            <svg><use href="${icons}#icon-user"></use></svg>
                        </div>
                    -->
                </div>
            </a>
        </li>`;
	}
}

export default new ResultsView();
