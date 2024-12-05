import Amadeus from "amadeus";

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY, // Add your key to an .env file
  clientSecret: process.env.AMADEUS_API_SECRET, // Add your secret to an .env file
});

export default amadeus;
