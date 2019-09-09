import React from 'react'
import Card from './Card'
import { useMorphKeys } from 'react-morph'

const Voting = ({ availableVotes, onVote, morphs }) => {
  return (
    <div>
      <p>Selecciona una tarjeta para estimar cuanto vale esta tarea</p>
      <div className="flex flex-wrap mt-4 -mx-4">
        {availableVotes.map((a, i) => (
          <div key={a} className="mx-4">
            <Card clickable {...morphs[a]} onClick={() => onVote(a)} value={a}></Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Voting
