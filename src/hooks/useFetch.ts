import { writable } from 'svelte/store';

export function useFetch<T>(request: () => Promise<T>) {
	const data = writable<T | null>(null);
	const loading = writable(false);
	const error = writable<string | null>(null);

	async function execute() {
		loading.set(true);
		error.set(null);

		try {
			const result = await request();
			data.set(result);
		} catch (e: any) {
			error.set(e.message);
		} finally {
			loading.set(false);
		}
	} 

	return { data, loading, error, execute };
}