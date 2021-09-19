import axios from 'axios'

const baseUrl = 'https://api.trivia.willfry.co.uk/questions?categories='


export function getMovieQuestions() {
  return axios.get(`${baseUrl}movies&limit=1`)
}
