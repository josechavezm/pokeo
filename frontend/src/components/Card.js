import React from 'react'
import cxs from 'classnames'

const Card = ({ clickable = false, onClick, value, className, ...props }, ref) => {
  return (
    <div className="mb-8 flex">
      <button
        onClick={clickable ? onClick : null}
        className={cxs('card', className, {
          zoom: clickable
        })}
        ref={ref}
        {...props}
      >
        {value}
      </button>
    </div>
  )
}

export default React.forwardRef(Card)
