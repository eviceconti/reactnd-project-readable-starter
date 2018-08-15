import React, { Component } from 'react'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/lib/md'
import { connect } from 'react-redux'
import { sendVote, sendComment } from '../Actions'

class Votes extends Component {
  state = {}

  /*
  Votes works for both posts and comments
  Props received should be 
  type: 'post' or 'comment'
  id: id of the post or comment
  params: object { option: 'str' } - str: 'upVote' or 'downVote'
  */
  handleClick(type, id, params) {
    if (type === 'post') {
      this.props.votePost([id, params])
    }
    if (type === 'comment') {
      this.props.voteComment([id, params])
    }
  }

  render() {
    return (
      <div className="post-votes">
        <button 
          className="btn"
          onClick={
            () => this.handleClick(
              this.props.type,
              this.props.id, 
              { option: 'upVote' }
            )
          }
        >
          <MdArrowUpward className="btn-icon" />
        </button>
        {this.props.votes}
        <p>votes</p>
        <button 
          className="btn"
          onClick={
            () => this.handleClick(
              this.props.type,
              this.props.id, 
              { option: 'downVote' }
            )
          }
        >
          <MdArrowDownward className="btn-icon" />
        </button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (post) => dispatch(sendVote(post)),
    voteComment: (comment) => dispatch(sendComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(Votes)

