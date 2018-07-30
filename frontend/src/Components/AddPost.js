import React, { Component } from 'react'
import '../App.css'
import Modal from 'react-modal'
import * as ReadableAPI from "../ReadableAPI"

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
  }

  createPost(post) {
    ReadableAPI.createPost(post)
      .then(response => {
        console.log(response)
      })
  }

  render() {
    return (
      <div className="add-post">
        <button
          onClick={() => this.openModal()}
        >
          oi
        </button>
        <Modal
          className=''
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          <h3 className="modal-header">
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
              value={this.state.title}
              placeholder="Type the Title"
              onChange={(e) => this.setState({title: e.target.value})}
            />
            <label htmlFor="body">body</label>
            <textarea 
              type="text"
              id="body"
              rows="3"
              value={this.state.body}
              placeholder="Type the Post Body"
              onChange={(e) => this.setState({body: e.target.value})}
            />
            <label htmlFor="author">Author</label>
            <input 
              type="text"
              id="author"
              value={this.state.author}
              placeholder="Type the Author"
              onChange={(e) => this.setState({author: e.target.value})}
            />
            <label htmlFor="category">Select Category</label>
            <select 
              id="category"
              value={this.state.category}
              onChange={(e) => this.setState({category: e.target.value})}
            >
              <option value="react">react</option>
              <option value="redux">redux</option>
              <option value="udacity">udacity</option>
            </select>
            <button>Add Post</button>
          </form>

        </Modal>
      </div>
    )
  }
}

export default AddPost