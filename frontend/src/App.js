import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReadableAPI from './ReadableAPI';


class App extends Component {
  post = {
    id: 1,
    timestamp: Date.now(),
    title: 'title1',
    body: 'body1',
    author: 'me',
    category: 'react'
  };

  comment = {
    id: 12,
    timestamp: Date.now(),
    body: 'comment12',
    author: 'MeCommenting',
    parentId: 1
  }
  
  state = {
    categories: '',
    posts: ''
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

  getCategories() {
    ReadableAPI.getCategories()
      .then((response) => {
        this.setState({ categories: response });
        console.log(this.state);
      });
  }

  getCategoryPosts(category) {
    ReadableAPI.getCategoryPosts(category)
      .then((response) => {
        console.log(response);
      });
  }

  getPosts() {
    ReadableAPI.getPosts()
      .then(response => {
        this.setState({ posts: response });
        console.log(this.state);
      });
  }

  getPostDetails(postId) {
    ReadableAPI.getPostDetails(postId)
      .then(response => {
        console.log(response);
      });
  }

  createPost(post) {
    ReadableAPI.createPost(post)
      .then(response => {
        console.log(response);
      });
  }

  votePost(postId, voteType) {
    //voteType = string: 'upVote' or 'downVote'
    let params = { option: voteType }
    ReadableAPI.votePost(postId, params)
      .then(response => {
        console.log(response);
      });
  }

  editPost(postId, title, body) {
    //title and body = strings
    let params = {title: title, body: body}
    ReadableAPI.editPost(postId, params)
      .then(response => {
        console.log(response)
      });
  }

  deletePost(postId) {
    ReadableAPI.deletePost(postId)
      .then(response => {
        console.log(response);
      });
  }

  getPostComments(postId) {
    ReadableAPI.getPostComments(postId)
      .then(response => {
        console.log(response)
      })
  }

  createComment(comment) {
    ReadableAPI.createComment(comment)
      .then(response => {
        console.log(response);
      });
  }

  getCommentDetails(commentId) {
    ReadableAPI.getCommentDetails(commentId)
      .then(response => {
        console.log(response);
      });
  }

  voteComment(commentId, voteType) {
    //voteType = string: 'upVote' or 'downVote'
    let params = { option: voteType }
    ReadableAPI.voteComment(commentId, params)
      .then(response => {
        console.log(response);
      });
  }

  editComment(commentId, body) {
    //body = string
    let params = {timestamp: Date.now(), body: body}
    ReadableAPI.editComment(commentId, params)
      .then(response => {
        console.log(response)
      });
  }

  deleteComment(commentId) {
    ReadableAPI.deleteComment(commentId)
      .then(response => {
        console.log(response);
      });
  }

  componentDidMount() {
    this.getCategories();
    //this.createPost(this.post);
    this.getCategoryPosts('react');
    //this.votePost('1', 'upVote');
    //this.editPost('1', 'title1 modified again', 'body1 modified again');
    //this.deletePost('1');
    //this.createComment(this.comment);
    this.getPosts();
    this.getPostDetails('8xf0y6ziyjabvozdd253nd');
    //this.editComment('12', 'comment12 modified');
    //this.deleteComment('12');
    this.getPostComments('1'); //check after
    //this.voteComment('12', 'downVote');
    this.getCommentDetails('12');
  }


}

export default App;
