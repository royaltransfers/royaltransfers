import { createResponse } from "@/utils/createResponse";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log("lat and lng are ", lat, lng);
  if (!lat || !lng) {
    return NextResponse.json(
      createResponse(false, "Latitude and longitude are required.", null),
      { status: 400 }
    );
  }

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  console.log("map key is ", GOOGLE_MAPS_API_KEY);
  if (!GOOGLE_MAPS_API_KEY) {
    return NextResponse.json(
      createResponse(
        false,
        "Missing Google Maps API key in environment.",
        null
      ),
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const geoData = response.data;

    if (geoData.status !== "OK" || !geoData.results.length) {
      return NextResponse.json(
        createResponse(
          false,
          "No address found for provided coordinates.",
          geoData
        ),
        { status: 404 }
      );
    }
    console.log("geo data", geoData);
    const address = geoData.results[0].formatted_address;
    return NextResponse.json(createResponse(true, "Success", { address }), {
      status: 200,
    });
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.message
      : String(error);
    return NextResponse.json(createResponse(false, errorMessage, null), {
      status: 500,
    });
  }
}
