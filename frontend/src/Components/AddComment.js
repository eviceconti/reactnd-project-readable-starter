import React, { Component } from 'react'
import '../App.css'
import Modal from 'react-modal'
import { MdEdit, MdAdd, MdDelete } from 'react-icons/lib/md'
import { connect } from 'react-redux'
import { addCommentAPI, deleteCommentAPI, editCommentAPI } from '../Actions'

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
      this.props.addComment(comment)
      this.closeModal()
    } else {
      //edit post. body = string
      let params = { body: comment.body, author: comment.author }
      this.props.editComment([this.state.id, params])
      this.closeModal()

      //set state.action to default = add
      this.setState({action: 'add'})
    } 
  }

  deleteComment(commentId) {
    this.props.deleteComment(commentId)
  }

  editComment(comment) {
    this.setState({
      action: 'edit',
      id: comment.id,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    })
    this.openModal()
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
    addComment: (comment) => dispatch(addCommentAPI(comment)),
    deleteComment: (comment) => dispatch(deleteCommentAPI(comment)),
    editComment: (comment) => dispatch(editCommentAPI(comment))
  }
}

export default connect(null, mapDispatchToProps)(AddComment)