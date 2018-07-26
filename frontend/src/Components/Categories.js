import React, {Component} from 'react'
import '../App.css'
import * as ReadableAPI from '../ReadableAPI'
import { connect } from 'react-redux'
import { getCategories } from '../Actions'

class Categories extends Component {
  state = {}

  getCategories() {
    ReadableAPI.getCategories()
      .then(response => {
        this.props.getCategories(response)
        console.log('getCategories',this.props.categories)
      }) 
  }

  render() {
    let render = false
    if (this.props.categories.length !== 0) {
      render = true
    }
    
    return (
      <div className="categories">
        {render && this.props.categories.map(category => (
          <div 
            className="category"
            key={category.name}
          >{category.name}</div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    this.getCategories()
  }
}

function mapStateToProps(state) {
  return { categories: state.getCategories }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (categories) => dispatch(getCategories(categories))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)