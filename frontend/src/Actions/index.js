//Action
//import * as ReadableAPI from '../ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE_POST = 'VOTE_POST'

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