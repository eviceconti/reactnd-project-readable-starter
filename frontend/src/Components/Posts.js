import React, {Component} from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPosts } from '../Actions'
import Votes from './Votes'

class Posts extends Component {
  state = {}

  getPosts() {
    ReadableAPI.getPosts()
      .then(response => {
        this.props.getPosts(response)
        console.log('getPosts',this.props.posts)
      }) 
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
                <Votes votes={post.voteScore}></Votes>
                <div className="post-main">
                  <h3 className="post-title mb-small">{post.title}</h3> 
                  <p className="post-body">
                    {post.body}
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
    this.getPosts()
  }
}

function mapStateToProps(state) {
  return { posts: state.getPosts }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (posts) => dispatch(getPosts(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)