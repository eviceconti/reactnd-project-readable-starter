//Reducer
import { GET_POSTS, GET_CATEGORIES } from '../Actions'
import { combineReducers } from 'redux'

function getPosts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.state
    default:
      return state
  }
}

function getCategories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.state
    default:
      return state
  }
}

export default combineReducers({
  getPosts,
  getCategories
})