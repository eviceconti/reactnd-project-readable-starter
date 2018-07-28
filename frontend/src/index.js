import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './Reducers'
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
  reducer, 
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )  
)

ReactDOM.render(
<Provider store={store}>  
  <App />
</Provider>, document.getElementById('root'))
registerServiceWorker()
