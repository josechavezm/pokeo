import React from 'react'
import Button from '../components/Button'
import { services } from '../feathers'

const Master = () => {
  const handleSubmit = event => {
    event.preventDefault()
    services.rooms.create({ count: 5 })
  }
  return (
    <div className="">
      <p>¿Cuántas personas ponen puntos?</p>
      <form onSubmit={handleSubmit}>
        <select className="min-w-8 mt-4 text-center">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </select>
        <Button className="mt-4">Invitar</Button>
      </form>
    </div>
  )
}

export default Master
