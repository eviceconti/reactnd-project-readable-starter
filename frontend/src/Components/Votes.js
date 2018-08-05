import React, { Component } from 'react'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/lib/md'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { votePost, voteComment } from '../Actions'

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
    console.log(this.props)
    console.log(id, params)

    if (type === 'post') {
      ReadableAPI.votePost(id, params)
        .then(response => {
          console.log(response)
          this.props.votePost(response)
        })
    }
    if (type === 'comment') {
      ReadableAPI.voteComment(id, params)
        .then(response => {
          console.log(response)
          this.props.voteComment(response)
        })
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
    votePost: (post) => dispatch(votePost(post)),
    voteComment: (comment) => dispatch(voteComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(Votes)

