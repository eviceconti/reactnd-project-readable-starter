//Action
//import * as ReadableAPI from '../ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'

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

export function deletePost(post) {
  return {
    type: DELETE_POST,
    post
  }
}