import React, { Fragment } from 'react'

const Main = ({ children }) => {
  return (
    <Fragment>
      <header className="text-4xl">
        <div className="container m-auto px-4 sm:px-0 py-4">
          <h1>Pokeo</h1>
          <h2 className="text-2xl">Planning poker para equipos de SCRUM</h2>
        </div>
      </header>
      <main className="container m-auto pt-16">{children}</main>
    </Fragment>
  )
}

export default Main
