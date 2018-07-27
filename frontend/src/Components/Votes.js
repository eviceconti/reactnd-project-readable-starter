import React, { Component } from 'react'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/lib/md'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPosts } from '../Actions'

class Votes extends Component {
  state = {}

  votePost(postId, voteType) {
    //voteType = string: 'upVote' or 'downVote'
    let params = { option: voteType }
    ReadableAPI.votePost(postId, params)
      .then(response => {
        console.log(response)
      })
  }

  render() {
    return (
      <div className="post-votes">
        <button className="btn">
          <MdArrowUpward className="btn-icon" />
        </button>
        {this.props.votes}
        <p>votes</p>
        <button className="btn">
          <MdArrowDownward className="btn-icon" />
        </button>
      </div>
    )
  }

}

export default Votes

