
const api = "http://localhost:3001"


const headers = {
  'Authorization': true
}

export const getCategories = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getCategoryPosts = (category) => 
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const getPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPostDetails = (postId) => 
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

export const createPost = (post) => 
  fetch(`${api}/posts`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const votePost = (postId, params) => 
  fetch(`${api}/posts/${postId}`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json())

export const editPost = (postId, params) => 
  fetch(`${api}/posts/${postId}`, { 
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json())

export const deletePost = (postId) => 
  fetch(`${api}/posts/${postId}`, { 
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

export const getPostComments = (postId) => 
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const createComment = (comment) => 
  fetch(`${api}/comments`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const getCommentDetails = (commentId) => 
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())

export const voteComment = (commentId, params) => 
  fetch(`${api}/comments/${commentId}`, { 
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json())

export const editComment = (commentId, params) => 
  fetch(`${api}/comments/${commentId}`, { 
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json())

export const deleteComment = (commentId) => 
  fetch(`${api}/comments/${commentId}`, { 
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

