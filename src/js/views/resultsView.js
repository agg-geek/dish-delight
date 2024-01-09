import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
	_parentElem = document.querySelector('.results');
	_message = '';
	_errorMessage = 'No recipes found for your query! Please try again ;)';

	_generateMarkup() {
		return this._data.map(preview => previewView.render(preview, false)).join('');
	}
}

export default new ResultsView();
