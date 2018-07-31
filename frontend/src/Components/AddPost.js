import React, { Component } from 'react'
import '../App.css'
import Modal from 'react-modal'
import * as ReadableAPI from "../ReadableAPI"
import { MdEdit, MdAdd, MdDelete } from 'react-icons/lib/md'
import { connect } from 'react-redux'
import { addPost, deletePost } from '../Actions'

class AddPost extends Component {
  state = {
    modalOpen: false,
    title: '',
    body: '',
    author: '',
    category: 'react'
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

    let post = {
      id: id(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }
    
    this.createPost(post)
    //reset form
    this.setState({
      title: '',
      body: '',
      author: '',
      category: 'react'
    })
  }

  createPost(post) {
    ReadableAPI.createPost(post)
      .then((response) => {
        this.closeModal()
        this.props.addPost(response)
      })
  }

  deletePost(postId) {
    console.log(postId)
    ReadableAPI.deletePost(postId)
      .then(response => {
        this.props.deletePost(response)
      })
  }

  render() {
    return (
      <div className="categories center">
        {(this.props.action === 'add') && (
          <div className="add-post">
            <h2 className="categories-title">Add Post</h2>
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
            onClick={() => this.deletePost(this.props.post.id)}
            className="btn"
          >
            <MdDelete className="btn-icon"/>
          </button>
        )}
        {(this.props.action === 'edit') && (
          <button
            onClick={() => this.editPost(this.props.post)}
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
            Add New Post
          </h3>
          <form action="" 
            className="modal-form"
            onSubmit={this.handleForm}
          >
            <label htmlFor="title">title</label>
            <input 
              type="text"
              id="title"
              className="modal-input"
              value={this.state.title}
              placeholder="Type the Title"
              onChange={(e) => this.setState({title: e.target.value})}
            />
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
            <label htmlFor="category">Select Category</label>
            <select 
              id="category"
              className="modal-input"
              value={this.state.category}
              onChange={(e) => this.setState({category: e.target.value})}
            >
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option value="udacity">udacity</option>
            </select>
            <button className="btn btn-category">Add Post</button>
          </form>

        </Modal>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(addPost(post)),
    deletePost: (post) => dispatch(deletePost(post))
  }
}

export default connect(null, mapDispatchToProps)(AddPost)