import React from 'react'
import Card from './Card'

const Voting = ({ onVote }) => {
  const availableVotes = [1, 2, 3, 5, 8, 13, 100]

  return (
    <div>
      <p>Selecciona una tarjeta para estimar cuanto vale esta tarea</p>
      <div className="flex flex-wrap mt-4 -mx-4">
        {availableVotes.map(a => (
          <Card clickable className="mx-4" key={a} onClick={() => onVote(a)} value={a}></Card>
        ))}
      </div>
    </div>
  )
}

export default Voting
