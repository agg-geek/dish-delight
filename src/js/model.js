import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { newRequest } from './helpers';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: RES_PER_PAGE,
	},
};

export const loadRecipe = async function (recipeId) {
	try {
		const data = await newRequest(`${API_URL}/${recipeId}`);

		const { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			servings: recipe.servings,
			publisher: recipe.publisher,
			ingredients: recipe.ingredients,
			cookingTime: recipe.cooking_time,
			sourceUrl: recipe.source_url,
			imageUrl: recipe.image_url,
		};
	} catch (err) {
		console.error(`You got an error. ${err}`);
		throw err;
	}
};

export const loadSearchResults = async function (query) {
	try {
		const data = await newRequest(`${API_URL}?search=${query}`);

		state.search.query = query;
		state.search.results = data.data.recipes.map(recipe => ({
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			imageUrl: recipe.image_url,
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
	state.recipe.ingredients.forEach(ing => (ing.quantity = (ing.quantity * servings) / state.recipe.servings));
	state.recipe.servings = servings;
};
