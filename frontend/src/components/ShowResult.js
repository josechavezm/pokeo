import React from 'react'
import Confetti from 'react-confetti'
import Card from './Card'
import Button from './Button'

const ShowResult = ({ isCreator, room, onNewVote }) => {
  const isAllEqual = room.estimations.every(e => e.value === room.estimations[0].value)
  return (
    <div>
      {isAllEqual ? (
        <div className="">
          <Confetti />
          <Card className="w-full max-w-sm m-auto h-128 text-7xl" value={room.estimations[0].value} />
        </div>
      ) : (
        <div>
          <p>El equipo no se puso de acuerdo, está fue la votación</p>
          <div className="flex flex-wrap mt-4 -mx-4">
            {room.estimations.map((e, index) => (
              <Card className="mx-4" key={index} value={e.value} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowResult
