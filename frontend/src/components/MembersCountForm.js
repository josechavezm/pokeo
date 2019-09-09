import React, { useRef } from 'react'
import Button from './Button'

const MembersCountForm = ({ onSubmit }) => {
  const selectRef = useRef(null)
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(selectRef.current.value)
  }

  const options = [...Array(10).keys()]
  options.shift()
  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <label className="block mt-4" htmlFor="voters-count">
        ¿Cuántas personas ponen puntos?
      </label>
      <select
        id="voters-count"
        ref={selectRef}
        className=" bg-white mt-4 rounded border-cyan p-2 min-w-8 text-center shadow-inner"
      >
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Button size="small" className="mt-8 text-sm">
        Invitar
      </Button>
    </form>
  )
}

export default MembersCountForm
