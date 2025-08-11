import { createResponse } from "@/utils/createResponse";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  if (!input) {
    return NextResponse.json(createResponse(false, "Missing input.", null), {
      status: 400,
    });
  }

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
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
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        input: input,
        regionCode: "GB",
        languageCode: "en",
        locationBias: {
          rectangle: {
            low: { latitude: 51.3, longitude: -0.5 },
            high: { latitude: 51.7, longitude: 0.3 },
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "*",
        },
      }
    );

    if (!response.data.suggestions.length) {
      return NextResponse.json(
        createResponse(false, "No location found.", response.data.suggestions),
        { status: 404 }
      );
    }
    const suggestions = response.data.suggestions.map(
      (suggestion: { placePrediction: { text: { text: string } } }) =>
        suggestion.placePrediction.text.text
    );

    return NextResponse.json(createResponse(true, "Success", { suggestions }), {
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
