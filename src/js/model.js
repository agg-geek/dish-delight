import { API_URL, API_KEY, RES_PER_PAGE } from './config';
import { newRequest } from './helpers';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: RES_PER_PAGE,
	},
	bookmarks: [],
};

const createRecipeObject = function (recipe) {
	return {
		id: recipe.id,
		title: recipe.title,
		servings: recipe.servings,
		publisher: recipe.publisher,
		ingredients: recipe.ingredients,
		cookingTime: recipe.cooking_time,
		sourceUrl: recipe.source_url,
		imageUrl: recipe.image_url,
		...(recipe.key && { key: recipe.key }),
	};
};

export const loadRecipe = async function (recipeId) {
	try {
		const data = await newRequest(`${API_URL}/${recipeId}?key=${API_KEY}`);

		const { recipe } = data.data;
		state.recipe = createRecipeObject(recipe);

		state.recipe.bookmarked = state.bookmarks.some(
			bookmark => bookmark.id === recipeId
		);
	} catch (err) {
		console.error(`You got an error. ${err}`);
		throw err;
	}
};

export const loadSearchResults = async function (query) {
	try {
		const data = await newRequest(`${API_URL}?search=${query}&key=${API_KEY}`);

		state.search.query = query;
		state.search.results = data.data.recipes.map(recipe => ({
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			imageUrl: recipe.image_url,
			...(recipe.key && { key: recipe.key }),
		}));
		state.search.page = 1;
	} catch (err) {
		console.error(`You got an error. ${err}`);
		throw err;
	}
};

export const getSearchResultsPage = function (page = state.search.page) {
	state.search.page = page;

	const start = state.search.resultsPerPage * (page - 1);
	const end = state.search.resultsPerPage * page;
	return state.search.results.slice(start, end);
};

export const updateServings = function (servings) {
	state.recipe.ingredients.forEach(
		ing => (ing.quantity = (ing.quantity * servings) / state.recipe.servings)
	);
	state.recipe.servings = servings;
};

const persistBookmarks = function () {
	localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
	state.bookmarks.push(recipe);

	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
	persistBookmarks();
};

export const removeBookmark = function (recipeId) {
	const idx = state.bookmarks.findIndex(bookmark => bookmark.id === recipeId);
	state.bookmarks.splice(idx, 1);
	if (recipeId === state.recipe.id) state.recipe.bookmarked = false;
	persistBookmarks();
};

const init = function () {
	const bookmarks = localStorage.getItem('bookmarks');
	if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
};

init();

export const uploadNewRecipe = async function (newRecipe) {
	try {
		const ingredients = Object.entries(newRecipe)
			.filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
			.map(ing => {
				const ingArr = ing[1].split(',').map(el => el.trim());
				if (ingArr.length !== 3) throw new Error('Wrong ingredient format');

				const [quantity, unit, description] = ingArr;
				if (!description) throw new Error('Ingredient name is not mentioned');
				return { quantity: quantity ? +quantity : null, unit, description };
			});

		const recipe = {
			title: newRecipe.title,
			source_url: newRecipe.sourceUrl,
			image_url: newRecipe.image,
			publisher: newRecipe.publisher,
			cooking_time: +newRecipe.cookingTime,
			servings: +newRecipe.servings,
			ingredients,
		};

		console.log(recipe);

		const data = await newRequest(`${API_URL}?key=${API_KEY}`, recipe);
		state.recipe = createRecipeObject(data.data.recipe);
		addBookmark(state.recipe);
		console.log(state.recipe);
	} catch (err) {
		throw err;
	}
};
