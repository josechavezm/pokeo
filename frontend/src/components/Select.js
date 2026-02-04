import React from 'react'

const Select = ({ value, onChange, currentVotersCount = 0, ...props }) => {
  const options = [...Array(51).keys()]
  options.shift()

  return (
    <select
      id="voters-count"
      className=" bg-white mt-4 rounded border-cyan p-2 min-w-8 text-center shadow-inner"
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map(o => (
        <option disabled={o < currentVotersCount} key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

export default Select
