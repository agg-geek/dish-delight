import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

export const newRequest = async function (url, postReqData = null) {
	try {
		// if there is any post request data, then perform a post request
		const requestOptions = {
			...(postReqData && {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				// pass in the post data
				body: JSON.stringify(postReqData),
			}),
		};

		const res = await Promise.race([
			fetch(url, requestOptions),
			timeout(TIMEOUT_SEC),
		]);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err;
	}
};
