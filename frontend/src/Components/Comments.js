import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { fetchComments } from '../Actions'
import Votes from './Votes';
import AddComment from './AddComment';

class Comments extends Component {
  state = {}

  render() {
    return (
      <div>
        <h4 className="comments-title">Comments</h4>
        <div className="add-comment">
          <AddComment action="add" postId={this.props.postId}></AddComment>
        </div>
        <ul className="comments-list">
          {this.props.comments.map(comment => (
            <li 
              className="comment"
              key={comment.id}
            >
              <Votes 
                type="comment"
                votes={comment.voteScore}
                id={comment.id}
              >
              </Votes>
              <div className="add-edit-comment">
                <AddComment action="edit" comment={comment}></AddComment>
                <AddComment action="delete" comment={comment}></AddComment>
              </div>
              <div className="comment-main">
                <h5>{comment.body}</h5>
                <p>Author: {comment.author}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    )
  }

  componentDidMount() {
    console.log('coments postId:',this.props.postId)
    this.props.getComments(this.props.postId)
  }
}

function mapStateToProps(state) {
  return { 
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: (comments) => dispatch(fetchComments(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)