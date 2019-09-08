import React from 'react'

const Waiting = ({ room }) => {
  const missing = room.votersCount - room.estimations.length
  return (
    <div>
      <p>{missing > 1 ? `Faltan ${missing} votos` : 'Falta 1 voto'}</p>
    </div>
  )
}

export default Waiting
