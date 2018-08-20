import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../Actions'
import '../App.css'
import Categories from './Categories'
import Posts from './Posts'
import AddPost from './AddPost'
import Post from './Post'
import Page404 from './Page404'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {
  render() {
    // the App component renders only the routes and the Categories Component, so in all pages is possible to see them and navigate through all the pages
    return (
      <div className="app">
        <div className="main">
          <Route exact path="/" render={() => (
            <Posts category="all"/>
          )} />
          <Route exact path="/:category" render={(props) => (
            <Posts {...props.match.params} />
          )} />
          <Route exact path="/:category/:id" render={(props) => (
            <Post {...props.match.params} />
          )} />
          <Route path="/page-404" component={Page404} />
        </div>

        {//SideBar is always active
        }
        <div className="side-bar">
          <Categories />
          <AddPost action='add' />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
  }

}

function mapStateToProps(state) {
  return { 
    posts: state.posts,
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: categories => dispatch(fetchCategories(categories)),
    getPosts: posts => dispatch(fetchPosts(posts))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))