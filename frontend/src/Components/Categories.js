import React, { Component } from "react"
import "../App.css"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class Categories extends Component {
  render() {
    let render = false
    if (this.props.categories.length !== 0) {
      render = true
    }

    return (
      <div className="categories">
        <h2 className="categories-title">Categories</h2>
        <div className="categories-box">
          <div className="category">
            <Link
              to="/"
              className="btn btn-category active-category"
            >
              ALL POSTS
            </Link>
          </div>

          {render &&
            this.props.categories.map(category => (
              <div className="category" key={category.name}>
                <Link
                  to={`/${category.path}`}
                  className="btn btn-category active-category"
                >
                  {category.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Categories)
