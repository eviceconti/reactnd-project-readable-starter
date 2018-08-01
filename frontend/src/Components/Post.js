import React, { Component } from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPost } from '../Actions'
import Votes from './Votes'
import AddPost from './AddPost'
import Comments from './Comments'

class Post extends Component {
  state = {}

  render() {
    let post = this.props.post
    let render = false
    console.log(render)
    if (post.length !== 0) {
      render = true
      console.log(render)
      console.log('render post',post)
    }

    return (
      render && (
        <div className="post-page">
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
          <div className="comments">
            <Comments postId={post.id} />
          </div>
        </div>
      )
    )
  }

  componentDidMount() {
    console.log('props', this.props)
    ReadableAPI.getPostDetails(this.props.id)
      .then(response => {
        console.log(response)
        this.props.getPost(response)
      })
  }
}

function mapStateToProps(state) {
  return { 
    post: state.postDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (post) => dispatch(getPost(post))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)