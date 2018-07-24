//Action

export const GET_POSTS = 'GET_POSTS'

export function getPosts(state) {
  return {
    type: GET_POSTS,
    state
  }
}