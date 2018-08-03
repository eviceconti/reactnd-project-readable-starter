import React, { Component } from 'react'
import '../App.css'
//import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
//import { getPost } from '../Actions'
import Votes from './Votes'
import AddPost from './AddPost'
import Comments from './Comments'

class Post extends Component {
  state = {}
  post = {}
  canRender = false
  date

  setPost() {
    this.post = this.props.posts.filter(p => p.id === this.props.id)[0]
    this.date = new Date(this.post.timestamp)
    //console.log(this.date.toJSON())
    console.log(this.date.toDateString())
  }


  render() {
    this.post = this.props.posts
    if (this.props.posts.length !== 0) {
      this.canRender = true
      this.setPost()
      console.log(this.canRender)
      console.log('render post',this.post)
    }

    return (
      this.canRender && (
        <div className="post-page">
          <div className="post-main">
            <Votes 
              votes={this.post.voteScore}
              postId={this.post.id}
            ></Votes>
            <div className="add-edit">
              <AddPost action='edit' post={this.post} />
              <AddPost action='delete' post={this.post} />
            </div>
            <h3 className="post-title">{this.post.title}</h3>
            {this.post.body}
            {this.post.author}
            Posted on: {this.date.toDateString()}
            {this.post.commentCount} Comment(s)
          </div>
          <div className="comments">
            <Comments postId={this.post.id} />
          </div>
        </div>
      )
    )
  }

  componentDidMount() {
    console.log('props', this.props)
    /*
    ReadableAPI.getPostDetails(this.props.id)
      .then(response => {
        console.log(response)
        this.props.getPost(response)
      })
      */
  }
}

function mapStateToProps(state) {
  return { 
    posts: state.posts
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
    getPost: (post) => dispatch(getPost(post))
  }
}
*/


export default connect(mapStateToProps)(Post)