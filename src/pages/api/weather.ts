const baseUrl = "https://api.weather.com";

export async function weatherFetch(path: string, params: Record<string, string>) {
    const query = new URLSearchParams({
        ...params,
        apiKey: import.meta.env.API_KEY!
    });

    const url = `${baseUrl}${path}?${query.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}