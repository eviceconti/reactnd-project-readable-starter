import React, { Component } from 'react'
import '../App.css'
import Modal from 'react-modal'
import * as ReadableAPI from "../ReadableAPI"
import { MdEdit, MdAdd, MdDelete } from 'react-icons/lib/md'
import { connect } from 'react-redux'
import { addComment, deleteComment, editComment } from '../Actions'

class AddComment extends Component {
  state = {
    modalOpen: false,
    action: 'add',
    id: '',
    timestamp: '',
    body: '',
    author: '',
    parentId: ''
  }

  openModal = () => {
    this.setState(() => ({
      modalOpen: true
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      modalOpen: false
    }))
  }

  handleForm = (e) => {
    e.preventDefault()
    console.log(this.state)
    let id = require('uuid/v4')

    let comment = {
      id: id(),
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.postId
    }
    
    this.handleComment(comment)
    //reset form
    this.setState({
      id: '',
      timestamp: '',
      body: '',
      author: '',
      parentId: ''
    })
  }

  handleComment(comment) {
    if (this.state.action === 'add') {
      ReadableAPI.createComment(comment)
        .then((response) => {
          this.closeModal()
          this.props.addComment(response)
        })
    } else {
      //edit post. body = string
    let params = { body: comment.body }
    ReadableAPI.editComment(this.state.id, params)
      .then(response => {
        this.props.editComment(response)
        this.closeModal()
      })
      //set state.action to default = add
      this.setState({action: 'add'})
    } 
  }

  deleteComment(commentId) {
    console.log(commentId)
    ReadableAPI.deleteComment(commentId)
      .then(response => {
        console.log(response)
        this.props.deleteComment(response)
      })
  }

  editComment(comment) {
    console.log(comment)
    this.setState({
      action: 'edit',
      id: comment.id,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    })
    this.openModal()
    console.log(this.state)
  }

  render() {
    return (
      <div className="categories center">
        {(this.props.action === 'add') && (
          <div className="add-post">
            <h3 className="categories-title">Add Comment</h3>
            <button
              onClick={() => this.openModal()}
              className="btn"
            >
              <MdAdd className="btn-icon"/>
            </button>
          </div>
        )}
        {(this.props.action === 'delete') && (
          <button
            onClick={() => this.deleteComment(this.props.comment.id)}
            className="btn"
          >
            <MdDelete className="btn-icon"/>
          </button>
        )}
        {(this.props.action === 'edit') && (
          <button
            onClick={() => this.editComment(this.props.comment)}
            className="btn"
          >
            <MdEdit className="btn-icon"/>
          </button>
        )}

        <Modal
          className=''
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          <h3 className="modal-header mb-large">
            Add New Comment
          </h3>
          <form action="" 
            className="modal-form"
            onSubmit={this.handleForm}
          >
            <label htmlFor="body">body</label>
            <textarea 
              type="text"
              id="body"
              className="modal-input"
              rows="3"
              value={this.state.body}
              placeholder="Type the Post Body"
              onChange={(e) => this.setState({body: e.target.value})}
            />
            <label htmlFor="author">Author</label>
            <input 
              type="text"
              id="author"
              className="modal-input"
              value={this.state.author}
              placeholder="Type the Author"
              onChange={(e) => this.setState({author: e.target.value})}
            />
            <button className="btn btn-category">Add Comment</button>
          </form>

        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addComment(comment)),
    deleteComment: (comment) => dispatch(deleteComment(comment)),
    editComment: (comment) => dispatch(editComment(comment))
  }
}

export default connect(null, mapDispatchToProps)(AddComment)