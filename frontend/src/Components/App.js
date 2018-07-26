import React, { Component } from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPosts } from '../Actions'
import Categories from './Categories';

class App extends Component {
  state = {
    categories: '',
    posts: ''
  }

  getPosts() {
    ReadableAPI.getPosts()
      .then(response => {
        this.props.getPosts(response)
        console.log('getPosts',this.props.posts)
      }) 
  }

  render() {
    let render = false
    if (this.props.posts.length !== 0) {
      render = true
    }

    return (
      <div className="main">
        <div className="posts">
          <ul className="posts-list">
            {render && this.props.posts.map(post => (
              <li 
                className="item"
                key={post.id}
              >{post.title}</li>
            ))}
          </ul>
        </div>
        <Categories />
      </div>
    )
  }

  componentDidMount() {
    this.getPosts()
  }

}

function mapStateToProps(state) {
  return { posts: state.getPosts }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (posts) => dispatch(getPosts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

/*
  //Data Structure

  id = require('uuid/v4')

  post = {
      id: this.id(),
      timestamp: Date.now(),
      title: 'title1',
      body: 'body1',
      author: 'me',
      category: 'react'
    }

    comment = {
      id: this.id(),
      timestamp: Date.now(),
      body: 'comment12',
      author: 'MeCommenting',
      parentId: 1
    }

  //Methods to get data from API
  getCategories() {
    ReadableAPI.getCategories()
      .then((response) => {
        this.setState({ categories: response })
        console.log(this.state)
      })
  }

  getCategoryPosts(category) {
    ReadableAPI.getCategoryPosts(category)
      .then((response) => {
        console.log(response)
      })
  }

  getPosts() {
    ReadableAPI.getPosts()
      .then(response => {
        this.setState({ posts: response })
        console.log(this.state)
      })
  }

  getPostDetails(postId) {
    ReadableAPI.getPostDetails(postId)
      .then(response => {
        console.log(response)
      })
  }

  createPost(post) {
    ReadableAPI.createPost(post)
      .then(response => {
        console.log(response)
      })
  }

  votePost(postId, voteType) {
    //voteType = string: 'upVote' or 'downVote'
    let params = { option: voteType }
    ReadableAPI.votePost(postId, params)
      .then(response => {
        console.log(response)
      })
  }

  editPost(postId, title, body) {
    //title and body = strings
    let params = {title: title, body: body}
    ReadableAPI.editPost(postId, params)
      .then(response => {
        console.log(response)
      })
  }

  deletePost(postId) {
    ReadableAPI.deletePost(postId)
      .then(response => {
        console.log(response)
      })
  }

  getPostComments(postId) {
    ReadableAPI.getPostComments(postId)
      .then(response => {
        console.log(response)
      })
  }

  createComment(comment) {
    ReadableAPI.createComment(comment)
      .then(response => {
        console.log(response)
      })
  }

  getCommentDetails(commentId) {
    ReadableAPI.getCommentDetails(commentId)
      .then(response => {
        console.log(response)
      })
  }

  voteComment(commentId, voteType) {
    //voteType = string: 'upVote' or 'downVote'
    let params = { option: voteType }
    ReadableAPI.voteComment(commentId, params)
      .then(response => {
        console.log(response)
      })
  }

  editComment(commentId, body) {
    //body = string
    let params = {timestamp: Date.now(), body: body}
    ReadableAPI.editComment(commentId, params)
      .then(response => {
        console.log(response)
      })
  }

  deleteComment(commentId) {
    ReadableAPI.deleteComment(commentId)
      .then(response => {
        console.log(response)
      })
  }

  //Invoke Methods

  componentDidMount() {
    this.getCategories()
    this.createPost(this.post)
    this.getCategoryPosts('react')
    this.votePost('1', 'upVote')
    this.editPost('1', 'title1 modified again', 'body1 modified again')
    this.deletePost('1')
    this.createComment(this.comment)
    this.getPosts()
    this.getPostDetails('8xf0y6ziyjabvozdd253nd')
    this.editComment('12', 'comment12 modified')
    this.deleteComment('12')
    this.getPostComments('1') //check after
    this.voteComment('12', 'downVote')
    this.getCommentDetails('12')
  }


  
*/
