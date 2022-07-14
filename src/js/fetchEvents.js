const axios = require('axios');

export async function fetchEvents(searchedValue, code) {
  const API_KEY = 'fEWnHm1nOc4BRRBNn8aA5fAFLjYDK8YZ';
  const params = new URLSearchParams({
    keyword: searchedValue,
    countryCode: code,
    size: 20,
    totalElements,
    totalPages,
    number,
  });

  try {
    const response = await axios({
      method: 'get',
      url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&${params}`,
    });
    return response.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
