import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Master from './pages/Master'
import { Main } from './layouts'
import Member from './pages/Member'

const App = () => {
  return (
    <Router>
      <Main>
        <Route path="/" exact component={Master} />
        <Route path="/:roomSlug" component={Member} />
      </Main>
    </Router>
  )
}

export default App
