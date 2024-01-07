export const state = {
	recipe: {},
};

export const loadRecipe = async function (recipeId) {
	try {
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza'); // all recipes
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'); // pizza
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd0b8'); // chocolate
		// const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzzz'); // bad id

		const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
		console.log(err);
	}
};
