import React from 'react'
import cxs from 'classnames'

const Button = ({ children, className, ...props }) => {
  return (
    <button className={cxs('min-w-8 block bg-red-300 border-blue-700 border-2', className)} {...props}>
      {children}
    </button>
  )
}

export default Button
