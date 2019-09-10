import React from 'react'
import { useUser } from '../layouts/Auth'
import Card from './Card'

const Waiting = ({ room, morphs, availableVotes }) => {
  const { user } = useUser()
  const missing = room.votersCount - room.estimations.length
  const vote = room.estimations.find(e => e.userId === user._id)

  return (
    <div className="text-center">
      <p>{missing > 1 ? `Aún faltan ${missing} votos` : 'aun falta 1 voto'}</p>
      {vote && <p>Ya has emitido tu voto y fue</p>}
      {vote && (
        <div className="flex justify-center mt-4">
          <Card {...morphs[vote.value]} value={vote.value}></Card>
        </div>
      )}
    </div>
  )
}

export default Waiting
