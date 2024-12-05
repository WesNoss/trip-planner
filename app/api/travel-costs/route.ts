import { NextResponse } from "next/server";
import amadeus from "../../../lib/amadeus"; // Adjust path as needed

export async function POST(req: Request) {
  const body = await req.json();
  const { origin, destination, startDate, endDate, adults } = body;

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: startDate,
      returnDate: endDate,
      adults: adults,
      currencyCode: "USD"
    });

    const flightOffers = response.data;

    // Calculate average price
    const averageCost =
      flightOffers.reduce((sum: number, offer: any) => {
        return sum + parseFloat(offer.price.total);
      }, 0) / flightOffers.length;

    return NextResponse.json({
      averageCost,
      currency: flightOffers[0]?.price?.currency || "USD",
    });
  } catch (error: any) {
    console.error("Error fetching flight data:", error);
    return NextResponse.json(
      { error: "Unable to fetch flight prices" },
      { status: 500 }
    );
  }
}
