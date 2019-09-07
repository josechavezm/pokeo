import React, { Fragment } from 'react'

const Main = ({ children }) => {
  return (
    <Fragment>
      <header className="text-4xl">
        <div className="container m-auto py-4">
          <h1>Pokeo</h1>
        </div>
      </header>
      <main className="container m-auto">{children}</main>
    </Fragment>
  )
}

export default Main
