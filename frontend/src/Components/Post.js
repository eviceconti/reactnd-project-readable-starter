import React, { Component } from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPosts, sortPosts } from '../Actions'
import Votes from './Votes'
import AddPost from './AddPost'

class Post extends Component {
  state = {}

  render() {
    let post = {}
    let render = false
    console.log(render)
    if (this.props.posts.length !== 0) {
      render = true
      console.log(render)
      post = this.props.posts.filter(p => p.id === this.props.id)[0]
      console.log(post)
    }

    return (
      render && (
        <div className="post-main">
          <Votes 
            votes={post.voteScore}
            postId={post.id}
          ></Votes>
          <div className="add-edit">
            <AddPost action='edit' post={post} />
            <AddPost action='delete' post={post} />
          </div>
          <h3 className="post-title">{post.title}</h3>
          {post.body}
          {post.author}
          {post.commentCount} Comment(s)
        </div>
      )
    )
  }

  componentDidMount() {
    console.log('props', this.props)
    ReadableAPI.getPostDetails(this.props.id)
      .then(response => {
        console.log(response)
      })
  }
}

function mapStateToProps(state) {
  return { 
    posts: state.posts
  }
}


export default connect(mapStateToProps)(Post)