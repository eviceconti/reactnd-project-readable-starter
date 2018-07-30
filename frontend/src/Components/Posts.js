import React, {Component} from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPosts } from '../Actions'
import Votes from './Votes'

class Posts extends Component {
  state = {}

  sortBy = require('sort-by')

  getPosts() {
    if (this.props.activeCategory === 'all') {
      ReadableAPI.getPosts()
        .then(response => {
          //response.sort(this.sortBy('voteScore'))
          this.props.getPosts(response)
        }) 
    } else {
      ReadableAPI.getCategoryPosts(this.props.activeCategory)
      .then((response) => {
        this.props.getPosts(response)
      })
    }
  }
  
  render() {
    let render = false
    if (this.props.posts.length !== 0) {
      render = true
    }
    
    return (
      <section className="main">
        <h2 className="main-title mb-small">
          Posts
        </h2>
        <div className="posts">
          <ul className="posts-list">
            {render && this.props.posts.map(post => (
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
                  <p className="post-body">
                    {post.body}
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

  componentDidMount() {
    console.log(this.props)
    this.getPosts()
  }
}

function mapStateToProps(state) {
  return { 
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (posts) => dispatch(getPosts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)