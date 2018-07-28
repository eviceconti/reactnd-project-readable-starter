//Reducer
import { GET_POSTS, GET_CATEGORIES, VOTE_POST } from '../Actions'
import { combineReducers } from 'redux'

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.state
    case VOTE_POST:
      const { post } = action
      let newState = state.map( (p) => {
        if (post.id === p.id) {
          p.voteScore = post.voteScore
        }
        return p
      })

      return newState
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