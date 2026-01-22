import type { APIRoute } from "astro";
import { weatherFetch } from "./weather";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");

    if(!lat || !lon) {
        return new Response("missing params");
    }

    const data = await weatherFetch(
        "/v3/location/near",
        {
        geocode: `${lat},${lon}`,
        product: "pws",
        format: "json"
        }
    );

    return Response.json(data);
};