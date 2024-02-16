export const getRequest = async<T>(url: string, signal: AbortSignal): Promise<T> => {
    try {
        const response = await fetch(url, { signal });
        const data: T = await response.json();
        return data;
    } catch (err: unknown) {
        const error = err as Error;
        throw new Error(`Download error: ${error.message}`);
    }
};
