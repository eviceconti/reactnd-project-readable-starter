import React, { Component } from "react";
import "../App.css";
import * as ReadableAPI from "../ReadableAPI";
import { connect } from "react-redux";
import { getCategories, selectCategory } from "../Actions";
import { Link } from "react-router-dom";

class Categories extends Component {
  state = {};

  getCategories() {
    ReadableAPI.getCategories().then(response => {
      this.props.getCategories(response);
    });
  }

  render() {
    let render = false;
    if (this.props.categories.length !== 0) {
      render = true;
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
    );
  }

  componentDidMount() {
    this.getCategories();
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    activeCategory: state.activeCategory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: categories => dispatch(getCategories(categories))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
