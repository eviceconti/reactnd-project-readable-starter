import React, {Component} from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getPosts } from '../Actions'

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
        <h2 className="main-title">
          Posts
        </h2>
        <ul className="posts">
          {render && this.props.posts.map(post => (
            <li 
              className="post"
              key={post.id}
            >{post.title}</li>
          ))}
        </ul>
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