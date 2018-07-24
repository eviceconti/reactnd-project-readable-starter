//Reducer
import { GET_POSTS } from '../Actions';

const initialPosts = {}

function getPosts(state = initialPosts, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.state;
    default:
      return state;
  }
}

export default getPosts