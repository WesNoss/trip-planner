import { OpenAI } from "openai";
import { NextResponse } from "next/server";

interface RequestBody {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
}

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "", // Ensure this key is set
});

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { origin, destination, startDate, endDate } = body;

    const prompt = `
      Provide a JSON object with estimated costs for a trip from ${origin} to ${destination} starting ${startDate} and returning ${endDate}. Include only one value each for:
      - flights
      - accommodations
      - transportation
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    const data = response.choices[0]?.message;
    if (!data) {
      return NextResponse.json(
        { error: "No valid response received from OpenAI." },
        { status: 500 }
      );
    }

    console.log(data);
    return NextResponse.json({data});
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch estimates." },
      { status: 500 }
    );
  }
}
