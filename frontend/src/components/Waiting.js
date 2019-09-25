import React, { useState } from 'react'
import { useUser } from '../layouts/Auth'
import Card from './Card'
import Select from './Select'
import { services } from '../feathers'

const Waiting = ({ room, morphs, availableVotes, onCanVote }) => {
  const { user } = useUser()
  const [selectedCount, setSelectedCount] = useState(room.votersCount)
  const isCreator = user._id === room.createdBy
  const currentCount = room.estimations.length
  const missing = room.votersCount - room.estimations.length
  const vote = room.estimations.find(e => e.userId === user._id)

  function handleVotersCountChange (e) {
    e.preventDefault()
    setSelectedCount(e.target.value)
    services.rooms.patch(room._id, { votersCount: e.currentTarget.value })
  }

  return (
    <div className="text-center">
      <p>
        {missing === 0 ? 'Aun no hay votos' : missing === 1 ? 'Hay 1 voto' : `Hay ${currentCount} votos`} de{' '}
        {isCreator ? (
          <Select onChange={handleVotersCountChange} currentVotersCount={currentCount} value={selectedCount} />
        ) : (
          room.votersCount
        )}
      </p>
      {!vote && <a onClick={onCanVote}>Yo también voto</a>}
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
