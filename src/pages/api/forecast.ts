import type { APIRoute } from "astro";
import { weatherFetch } from "./weather";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    const latNum = Number(lat).toFixed(2);
    const lonNum = Number(lon).toFixed(2);

    if (!lat || !lon) {
        return new Response("missing params");
    }

    const data = await weatherFetch(
        "/v3/wx/forecast/daily/5day",
        {
            geocode: `${latNum},${lonNum}`,
            format: "json",
            units: "m",
            language: "en-US"
        }
    );

    return Response.json(data);
};