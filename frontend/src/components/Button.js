import React from 'react'
import cxs from 'classnames'

const Button = ({ size = 'big', children, className, ...props }) => {
  return (
    <button
      className={cxs(
        'text-xl text-white m-auto block border-white rounded border-2 font-bold',
        {
          'min-w-8': size === 'small',
          'min-w-16': size === 'big',
          'p-2': size === 'small',
          'p-4': size === 'big'
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
