const axios = require('axios');
const readline = require('readline');

const API_KEY = '6a10b345';
const API_URL = 'http://www.omdbapi.com/';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function searchMovies(query) {
  return axios.get(API_URL, {
    params: {
      apikey: API_KEY,
      s: query
    }
  });
}

rl.question('Enter a movie title: ', async (answer) => {
  try {
    const response = await searchMovies(answer);
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
  rl.close();
});
