import React, { Component } from "react"
import { Redirect } from "react-router"
import "../App.css"
import { connect } from "react-redux"
import Votes from "./Votes"
import AddPost from "./AddPost"
import Comments from "./Comments"

class Post extends Component {
  canRender = false
  date
  post = {}

  setPost() {
    this.post = this.props.posts.filter(p => p.id === this.props.id)[0]
    if (this.post) {
      this.canRender = true;
      this.date = new Date(this.post.timestamp)
    }
  }

  render() {
    if (this.props.posts.length !== 0) {
      this.setPost()
    }

    if (!this.post || this.post.deleted) {
      return <Redirect to="/page-404" />;
    } else {
      return (
        this.canRender && (
          <div className="post-page">
            <div className="post-area">
              <Votes
                type="post"
                votes={this.post.voteScore}
                id={this.post.id}
              />
              <div className="post-main">
                <div className="add-edit">
                  <AddPost action="edit" post={this.post} />
                  <AddPost action="delete" post={this.post} />
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
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(Post);
