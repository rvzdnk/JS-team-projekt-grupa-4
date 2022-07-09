const axios = require('axios');

export async function fetchEvents(searchedValue, code, page) {
  const params = new URLSearchParams({
    apikey: 'fEWnHm1nOc4BRRBNn8aA5fAFLjYDK8YZ',
    keyword: searchedValue,
    countryCode: code,
    size: 20,
    page,
  });

  try{
    const response = await axios({
      method: "get",
      url: `https://app.ticketmaster.com/discovery/v2/events/?${params}`,
      });
      return response.data;
    } 
  catch(error){
      console.log(`Error: ${error}`);
    }
  }

