//Action

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'

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