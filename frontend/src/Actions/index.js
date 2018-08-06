//Action
//import * as ReadableAPI from '../ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
//export const SORT_POSTS = 'SORT_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function getPosts(state) {
  return {
    type: GET_POSTS,
    state
  }
}

export function getCategories(state) {
  return {
    type: GET_CATEGORIES,
    state
  }
}

export function votePost(post) {
  return {
    type: VOTE_POST,
    post
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post
  }
}

/*
export function sortPosts(posts) {
  return {
    type: SORT_POSTS,
    posts
  }
}
*/

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function voteComment(comment) {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}