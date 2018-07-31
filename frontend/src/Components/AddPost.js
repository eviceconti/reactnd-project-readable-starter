import React, { Component } from 'react'
import '../App.css'
import Modal from 'react-modal'
import * as ReadableAPI from "../ReadableAPI"
import { MdEdit, MdAdd, MdDelete } from 'react-icons/lib/md'
import { connect } from 'react-redux'
import { addPost, deletePost, editPost } from '../Actions'

class AddPost extends Component {
  state = {
    modalOpen: false,
    action: 'add',
    id: '',
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
    console.log(this.state)
    let id = require('uuid/v4')

    let post = {
      id: id(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    }
    
    this.handlePost(post)
    //reset form
    this.setState({
      title: '',
      body: '',
      author: '',
      category: 'react'
    })
  }

  handlePost(post) {
    if (this.state.action === 'add') {
      ReadableAPI.createPost(post)
        .then((response) => {
          this.closeModal()
          this.props.addPost(response)
        })
    } else {
      //edit post. title and body = strings
    let params = {title: post.title, body: post.body}
    ReadableAPI.editPost(this.state.id, params)
      .then(response => {
        console.log(response)
        this.props.editPost(response)
        this.closeModal()
      })
      //set state.action to default = add
      this.setState({action: 'add'})
    } 
  }

  deletePost(postId) {
    console.log(postId)
    ReadableAPI.deletePost(postId)
      .then(response => {
        this.props.deletePost(response)
      })
  }

  editPost(post) {
    console.log(post)
    this.setState({
      action: 'edit',
      id: post.id,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    })
    this.openModal()
    console.log(this.state)
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
    deletePost: (post) => dispatch(deletePost(post)),
    editPost: (post) => dispatch(editPost(post))
  }
}

export default connect(null, mapDispatchToProps)(AddPost)