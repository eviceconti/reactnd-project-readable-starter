//Action
import * as ReadableAPI from '../ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts
  }
}

export const fetchPosts = () => dispatch => {
  ReadableAPI.getPosts()
    .then(posts => {
      dispatch(getPosts(posts))
    })
}

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => dispatch => {
  ReadableAPI.getCategories()
    .then(categories => {
      dispatch(getCategories(categories))
    })
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post
  }
}

export const sendVote = ([id, params]) => dispatch => {
  console.log('action', id, params)
  ReadableAPI.votePost(id, params)
    .then(post => {
      dispatch(votePost(post))
  })
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export const addPostAPI = (post) => dispatch => {
  ReadableAPI.createPost(post)
    .then((post) => {
      dispatch(addPost(post))
    })
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export const editPostAPI = ([id, params]) => dispatch => {
  ReadableAPI.editPost(id, params)
    .then(post => {
      dispatch(editPost(post))
    })
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post
  }
}

export const deletePostAPI = (postId) => dispatch => {
  ReadableAPI.deletePost(postId)
    .then(post => {
      dispatch(deletePost(post))
    })
}


export function sortPosts(posts, query) {
  return {
    type: SORT_POSTS,
    posts,
    query
  }
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const fetchComments = (postId) => dispatch => {
  ReadableAPI.getPostComments(postId)
    .then(comments => {
      dispatch(getComments(comments))
    })
}

export function voteComment(comment) {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export const sendComment = ([id, params]) => dispatch => {
  console.log('action comment', id, params)
  ReadableAPI.voteComment(id, params)
    .then(comment => {
      dispatch(voteComment(comment))
  })
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const addCommentAPI = (comment) => dispatch => {
  ReadableAPI.createComment(comment)
    .then((comment) => {
      dispatch(addComment(comment))
    })
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export const editCommentAPI = ([id, params]) => dispatch => {
  ReadableAPI.editComment(id, params)
    .then(comment => {
      dispatch(editComment(comment))
    })
}

export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export const deleteCommentAPI = (commentId) => dispatch => {
  ReadableAPI.deleteComment(commentId)
    .then(comment => {
      dispatch(deleteComment(comment))
    })
}