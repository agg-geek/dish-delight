export const newRequest = async function (url) {
	try {
		const res = await fetch(url);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data; // this async fn will resolve with data
	} catch (err) {
		console.log(err);
	}
};
