import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

const showRecipe = async function () {
	try {
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza');
		const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzzz');
		const data = await res.json();
		console.log(data);

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

		const { recipe } = data.data;
		console.log(recipe);
	} catch (err) {
		console.log(err);
	}
};

showRecipe();
