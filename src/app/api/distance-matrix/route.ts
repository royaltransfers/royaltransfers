import { createResponse } from "@/utils/createResponse";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");

  if (!origin || !destination) {
    return NextResponse.json(
      createResponse(false, "Missing origin or destination.", null),
      {
        status: 400,
      }
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
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin: {
          address: origin,
        },
        destination: {
          address: destination,
        },
        travelMode: "DRIVE",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": "*",
        },
      }
    );
    if (!response.data.routes.length) {
      return NextResponse.json(
        createResponse(false, "No route found.", response.data.suggestions),
        { status: 404 }
      );
    }

    console.log(response.data);
    const distanceMeters = response.data.routes[0].distanceMeters;
    const duration = response.data.routes[0].duration;
    console.log("distance is ", distanceMeters);

    return NextResponse.json(
      createResponse(true, "Success", {
        distance: { distanceMeters, duration },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.message
      : String(error);
    console.log("error is ", errorMessage);
    return NextResponse.json(createResponse(false, errorMessage, null), {
      status: 500,
    });
  }
}
