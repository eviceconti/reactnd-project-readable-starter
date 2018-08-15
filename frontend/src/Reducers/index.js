//Reducer
import { GET_POSTS, GET_CATEGORIES, VOTE_POST, ADD_POST, EDIT_POST, DELETE_POST, SORT_POSTS, GET_COMMENTS, VOTE_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from '../Actions'
import { combineReducers } from 'redux'

let sortBy = require('sort-by')

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts
    case VOTE_POST:
      const newState = state.map( post => {
        if (action.post.id === post.id) {
          return {
            ...post,
            voteScore: action.post.voteScore
          }
        }
        return post
      })
      return newState
    case ADD_POST:
      return [
        ...state,
        action.post
      ]
    case EDIT_POST:
      //remove the edited post (using the .filter) from editedPosts and after that return this array with the new data in the end
      const editedPosts = state.filter(p => p.id !== action.post.id)
      console.log('editedPosts')
      return [
        ...editedPosts,
        action.post
      ]
    case DELETE_POST:
      const deletedState = state.filter((p) => p.id !== action.post.id)
      return deletedState
    case SORT_POSTS:
      let sortedPosts = [...state].sort(sortBy(action.query))
      return sortedPosts
    case ADD_COMMENT:
      const addCommentToPost = state.map( post => {
        if (post.id === action.comment.parentId) {
          return {
            ...post,
            commentCount: post.commentCount + 1
          }
        }
        return post
      })
      return addCommentToPost
      case DELETE_COMMENT:
      const deleteCommentToPost = state.map( post => {
        if (post.id === action.comment.parentId) {
          return {
            ...post,
            commentCount: post.commentCount - 1
          }
        }
        return post
      })
      return deleteCommentToPost
    default:
      return state
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
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
          return {
            ...c,
            voteScore: action.comment.voteScore
          }
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
      const editedComments = state.filter(c => c.id !== action.comment.id)
      console.log('editedComments')
      return [
        ...editedComments,
        action.comment
      ]
    case DELETE_COMMENT:
      const deletedComment = state.filter((c) => c.id !== action.comment.id)
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