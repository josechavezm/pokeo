import React from 'react'
import cxs from 'classnames'

const Card = ({ clickable = false, onClick, value, className }) => {
  return (
    <button
      onClick={onClick}
      className={cxs(
        'text-5xl text-cyan font-numbers shadow-xl font-bold mb-8 min-w-8 block bg-white py-20',
        className,
        { zoom: clickable }
      )}
    >
      {value}
    </button>
  )
}

export default Card
