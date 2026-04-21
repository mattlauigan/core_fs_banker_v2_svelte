type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type RequestProps<T> = {
	method?: HttpMethod;
	url: string;
	data?: T;
	headers?: Record<string, string>;
}


export async function http<T>(
	props: RequestProps<T>
): Promise<T> {
		const {
		method = 'GET',
		url,
		data,
		headers = {}
	} = props;

	const res = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		body: data ? JSON.stringify(data) : undefined,
		credentials: 'include' // for cookies/session
	});

	if (!res.ok) {
		const error = await res.json().catch(() => ({}));
		throw new Error(error.message || 'Request failed');
	}

	return res.json();
}