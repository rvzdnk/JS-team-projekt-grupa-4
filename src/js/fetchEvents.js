const axios = require('axios');

export async function fetchEvents (searchedValue, code) {
  const API_KEY = 'fEWnHm1nOc4BRRBNn8aA5fAFLjYDK8YZ'
  const params = new URLSearchParams({
    keyword: 'concert',
    countryCode: 'US',
    size: 21,
  });

  try{
    const response = await axios({
      method: "get",
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&${params}`,
      });
      return response.data;
    } 
  catch(error){
      console.log(`Error: ${error}`);
    }
  }

