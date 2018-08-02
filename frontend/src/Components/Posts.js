import React, {Component} from 'react'
import '../App.css'
//import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { sortPosts } from '../Actions'
import Votes from './Votes'
import { Link } from 'react-router-dom';
import AddPost from './AddPost';

class Posts extends Component {
  state = {
    update: 0
  }
  sortBy = require('sort-by')
  posts = []
  filteredPosts = []
  canRender = false
  
  filterPosts() {
    if (this.props.category !== 'all') {
      this.filteredPosts = this.props.posts.filter(post => post.category === this.props.category)
    } else {
      this.filteredPosts = this.props.posts
    }
    //console.log('filtered', this.filteredPosts)
  }

  sortPosts(query) {
    this.filteredPosts.sort(this.sortBy(query))
    this.setState({update: 1})
    //sort action-reducer deleted. The sort is not changing the store, only props
  }
  
  render() {
    if (this.props.posts.length !== 0) {
      this.filterPosts()
      this.canRender = true
    }
    
    return (
      <section className="main">
        <div className="sort">
          <h2 className="sort-title">Sort Posts by:</h2>
          <button 
            className="btn btn-category active-category"
            onClick={() => this.sortPosts('timestamp')}
          >Date</button>
          <button 
            className="btn btn-category active-category"
            onClick={() => this.sortPosts('-voteScore')}
          >Votes</button>
        </div>
        <h2 className="main-title mb-small">
          {this.props.category} Posts
        </h2>
        <div className="posts">
          <ul className="posts-list">
            {this.canRender && this.filteredPosts.map(post => (
              <li 
                className="post"
                key={post.id}
              >
                <Votes 
                  votes={post.voteScore}
                  postId={post.id}
                ></Votes>
                <div className="post-main">
                  <h3 className="post-title mb-small">{post.title}</h3> 
                  <div className="post-category" key={post.category}>
                    <Link
                      to={`/${post.category}`}
                      className="btn btn-category active-category"
                    >
                      {post.category}
                    </Link>
                  </div>
                  <div className="add-edit">
                    <AddPost action='edit' post={post} />
                    <AddPost action='delete' post={post} />
                  </div>
                  <p className="post-body">
                    <Link to={`/${post.category}/${post.id}`}>
                      {post.body}
                    </Link>
                  </p>
                  <p className="post-author">
                    posted by: {post.author}
                  </p>
                  <p className="post-comments">
                    {post.commentCount} comment(s)
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

}

function mapStateToProps(state) {
  return { 
    posts: state.posts
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
    getPosts: (posts) => dispatch(getPosts(posts)),
    /*sortPosts: (posts) => dispatch(sortPosts(posts))
  }
}
*/

export default connect(mapStateToProps)(Posts)