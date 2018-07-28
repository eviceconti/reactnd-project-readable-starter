import React, { Component } from 'react'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/lib/md'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { votePost } from '../Actions'

class Votes extends Component {
  state = {}

  handleClick(postId, params) {
    console.log(this.props)
    console.log(postId, params)
    ReadableAPI.votePost(postId, params)
      .then(response => {
        console.log(response)
        this.props.votePost(response)
      })
  }

  render() {
    return (
      <div className="post-votes">
        <button 
          className="btn"
          onClick={
            () => this.handleClick(
              this.props.postId, 
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
              this.props.postId, 
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
    votePost: (post) => dispatch(votePost(post))
  }
}

export default connect(null, mapDispatchToProps)(Votes)

