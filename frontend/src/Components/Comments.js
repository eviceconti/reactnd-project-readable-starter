import React, { Component } from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPostComments } from '../Actions'

class Comments extends Component {
  state = {}

  render() {
    return (
      <div className="comments">
        <h4 className="comments-title">Comments</h4>
        <ul className="comments-list">
          {this.props.comments.map(comment => (
            <li 
              className="comment"
              key={comment.id}
            >
              {comment.body}
              {comment.author}
              {comment.voteScore}
            </li>
          ))}
        </ul>
      </div>

    )
  }

  componentDidMount() {
    ReadableAPI.getPostComments(this.props.postId)
      .then(response => {
        this.props.getPostComments(response)
        console.log('comments props: ', this.props)
      })
  }
}

function mapStateToProps(state) {
  return { 
    comments: state.postComments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostComments: (comments) => dispatch(getPostComments(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)