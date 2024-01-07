export const newRequest = async function (url) {
	try {
		const res = await fetch(url);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data; // this async fn will resolve with data
	} catch (err) {
		// if newRequest received any error, we just logged it
		// and it could not be handled by the actual thing that should handle it
		// hence pass the error by throwing it further
		throw err;
	}
};
