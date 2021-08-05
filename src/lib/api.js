import axios from 'axios'

const baseUrl = 'https://trivia.willfry.co.uk/api/questions?categories='

export function getMovieQuestions() {
  return axios.get(`${baseUrl}movies&limit=1`)
}