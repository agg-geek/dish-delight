import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
	_parentElem = document.querySelector('.bookmarks__list');
	_message = '';
	_errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';

	addHandlerRender(handler) {
		window.addEventListener('load', handler);
	}

	_generateMarkup() {
		return this._data.map(preview => previewView.render(preview, false)).join('');
	}
}

export default new BookmarksView();
