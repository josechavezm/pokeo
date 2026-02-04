import React from 'react'
import cxs from 'classnames'

const Button = ({ size = 'big', children, className, variant = 'primary', ...props }) => {
  return (
    <button
      className={cxs(
        'm-auto block cursor-pointer text-headers rounded font-bold',
        {
          'bg-primary hover:bg-primary-600 ': variant === 'primary',
          'bg-secondary hover:bg-secondary-600': variant === 'secondary'
        },
        {
          'min-w-8': size === 'small',
          'min-w-16 text-xl': size === 'big',
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
