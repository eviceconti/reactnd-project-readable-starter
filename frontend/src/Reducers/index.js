//Reducer
import { GET_POSTS, GET_CATEGORIES, VOTE_POST, ADD_POST, EDIT_POST, DELETE_POST, SORT_POSTS } from '../Actions'
import { combineReducers } from 'redux'

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.state
    case SORT_POSTS:
      return action.posts
    case VOTE_POST:
      const { post } = action
      let newState = state.map( (p) => {
        if (post.id === p.id) {
          p.voteScore = post.voteScore
        }
        return p
      })
      return newState
    case ADD_POST:
      console.log('action.post',action.post)
      console.log('reducer state', state)
      return [
        ...state,
        action.post
      ]
    case EDIT_POST:
      console.log('action.post',action.post)
      console.log('reducer state', state)
      let editedPosts = state.filter(p => p.id !== action.post.id)
      console.log('editedPosts')
      return [
        ...editedPosts,
        action.post
      ]
    case DELETE_POST:
      let deletedState = state.filter((p) => p.id !== action.post.id)
      return deletedState
    default:
      return state
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.state
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
})