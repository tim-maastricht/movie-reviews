import axios from "axios"

// this contains functions which make api calls to the backend endpoints
class MovieDataService {

  // this returns all the movies for a particular page
  getAll(page = 0){
    return axios.get(`http://localhost:3000/api/v1/movies?page=${page}`)
  }

  // get specific movie with supplied id
  get(id) {
    return axios.get(`http://localhost:3000/api/v1/movies/id/${id}`)
  }

  // this connects to the same endpoint as getAll except it has query which consists of the
  // user-entered search title, ratings and page number
  find(query, by = "title", page = 0) {
    return axios.get(
      `https://localhost:3000/api/v1/movies?${by}=${query}&page=${page}`
    )
  }

  // the next four methods are for CRUD ops
  createReview(data) {
    return axios.post("http://localhost:3000/api/v1/movies/review", data)
  }
  
  updateReview(data) {
    return axios.put("http://localhost:3000/api/v1/movies/review", data)
  }

  deleteReview(id, userId) {
    return axios.delete(
      "http://localhost:3000/api/v1/movies/review",
      {data:{review_id: id, user_id: userId}}
    )
  }

  getRatings(){
    return axios.get("http://localhost:3000/api/v1/movies/ratings")
  }
}

export default new MovieDataService()