import React, { Component } from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'

class Comments extends Component {
  state = {}

  render() {
    return (
      <h4 className="comments-title">
        Comments
      </h4>
    )
  }

  componentDidMount() {
    console.log('comments props: ', this.props)
  }
}

export default Comments