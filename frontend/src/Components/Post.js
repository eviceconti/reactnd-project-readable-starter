import React, { Component } from 'react'
import { Redirect } from 'react-router';
import '../App.css'
import { connect } from 'react-redux'
//import { getPost } from '../Actions'
import Votes from './Votes'
import AddPost from './AddPost'
import Comments from './Comments'

class Post extends Component {
  post = []
  canRender = false
  postDeleted = true
  page404 = false
  date

  setPost() {
    console.log()
    this.post = this.props.posts.filter(p => p.id === this.props.id)[0]
    console.log('this.post',this.post)
    if (this.post) {
      this.date = new Date(this.post.timestamp)
      //console.log(this.date.toJSON())
      console.log(this.date.toDateString())
      if (this.postDeleted) {
        this.page404 = true
      } else {
        this.canRender = true
      }
    }
  }


  render() {
    //this.post = this.props.posts
    console.log('render', this.props.posts, this.post, this.canRender)
    if (this.props.posts.length !== 0) {
      this.postDeleted = true
      this.setPost()
    }
    if (!this.postDeleted) {
      console.log(this.canRender, this.postDeleted)
      console.log('render post',this.post)
    }

    if (this.page404 && this.canRender) {
      return (
        <Redirect to="/page-404" />
      )
    } else {
    return (
      this.canRender && (
        <div className="post-page">
            <div className="post-area">
            <Votes 
              type="post"
              votes={this.post.voteScore}
              id={this.post.id}
            ></Votes>
              <div className="post-main">
            <div className="add-edit">
              <AddPost action='edit' post={this.post} />
              <AddPost action='delete' post={this.post} />
            </div>
            <h3 className="post-title">{this.post.title}</h3>
                <p>{this.post.body}</p>
                <p>Author: {this.post.author}</p>
                <p>Posted on: {this.date.toDateString()}</p>
                <p>{this.post.commentCount} Comment(s)</p>
              </div>
          </div>
          <div className="comments">
            <Comments postId={this.post.id} />
          </div>
        </div>
      )
    )
  }
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