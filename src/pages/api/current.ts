import type { APIRoute } from "astro";
import { weatherFetch } from "./weather";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const stationId = url.searchParams.get("stationId");

    if (!stationId) {
        return new Response("missing stationID")
    }

    const data = await weatherFetch(
         "/v2/pws/observations/current",
        {
        stationId,
        format: "json",
        units: "m"
    }
    );

    return Response.json(data);
};