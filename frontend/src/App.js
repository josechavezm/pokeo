import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Master from './pages/Master'
import { Main } from './layouts'
import { Room } from './pages'
import { app, services } from './feathers'
import Auth from './layouts/Auth'

const App = () => {
  return (
    <Router>
      <Auth>
        <Main>
          <Route path="/" exact component={Master} />
          <Route path="/:roomSlug" component={Room} />
        </Main>
      </Auth>
    </Router>
  )
}

export default App
