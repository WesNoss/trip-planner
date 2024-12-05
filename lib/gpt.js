const { Configuration, OpenAIApi } = require("openai");

// Initialize with API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store API key in .env
});
const openai = new OpenAIApi(configuration);

async function getTravelEstimates(start, end, origin, destination, people) {
  const prompt = `Provide a JSON object estimating costs for a trip to ${destination} from ${origin} leaving on ${start} and returning ${end}. Include:
  - flights
  - accommodations
  - transportation
  - food
  - activities.`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });

    console.log(response.data.choices[0].text.trim());
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}

getTravelEstimates();
