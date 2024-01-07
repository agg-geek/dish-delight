import icons from 'url:../../img/icons.svg';
import View from './View.js';

class ResultsView extends View {
	_parentElem = document.querySelector('.results');

	_generateMarkup() {
		// we call resultsView.render(<searchResultsData>) in controller
		// .render (inherited from parent class View) then assigns that data
		//  to _data (also inherited) and then we simply render that data
		// things are called preview simply because of the classname
		console.log(this._data);
		return this._data.map(preview => this._generateMarkupPreview(preview)).join('');
	}

	_generateMarkupPreview(preview) {
		return `<li class="preview">
            <a class="preview__link" href="#${preview.id}">
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
