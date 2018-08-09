//Reducer
import { GET_POSTS, GET_CATEGORIES, VOTE_POST, ADD_POST, EDIT_POST, DELETE_POST, GET_COMMENTS, VOTE_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../Actions'
import { combineReducers } from 'redux'

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.state
    case VOTE_POST:
      let newState = state.map( (p) => {
        if (action.post.id === p.id) {
          p.voteScore = action.post.voteScore
        }
        return p
      })
      return newState
    case ADD_POST:
      return [
        ...state,
        action.post
      ]
    case EDIT_POST:
      //remove the edited post (using the .filter) from editedPosts and after that return this array with the new data in the end
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

function comments(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    case VOTE_COMMENT:
      let newVote = state.map( (c) => {
        if (action.comment.id === c.id) {
          c.voteScore = action.comment.voteScore
        }
        return c
      })
      return newVote
    case ADD_COMMENT:
      return [
        ...state,
        action.comment
      ]
    case EDIT_COMMENT:
      //similar than edit post
      let editedComments = state.filter(c => c.id !== action.comment.id)
      console.log('editedComments')
      return [
        ...editedComments,
        action.comment
      ]
    case DELETE_COMMENT:
      let deletedComment = state.filter((c) => c.id !== action.comment.id)
      return deletedComment
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  comments
})