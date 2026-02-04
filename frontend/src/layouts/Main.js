import React, { Fragment } from 'react'
import { useTracking } from '../hooks/useTracking'

const Main = ({ children }) => {
  // useTracking()
  return (
    <Fragment>
      <header className="text-4xl">
        <div className="container m-auto sm:px-0 py-4">
          <h1 className="font-bold">Pokeo</h1>
          <h2 className="text-2xl">Planning poker for highly productive teams</h2>
        </div>
      </header>
      <main className="container m-auto pt-16">{children}</main>
    </Fragment>
  )
}

export default Main
