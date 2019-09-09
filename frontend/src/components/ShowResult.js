import React from 'react'
import Confetti from 'react-confetti'
import Card from './Card'
import Button from './Button'

const ShowResult = ({ isCreator, morphs, room, onNewVote }) => {
  const isAllEqual = room.estimations.every(e => e.value === room.estimations[0].value)
  return (
    <div>
      {isAllEqual ? (
        <div className="">
          <Confetti width={document.body.clientWidth} />
          <h1 className="text-2xl">Felicidades, todos votaron por igual!</h1>
          <Card
            {...morphs[room.estimations[0].value]}
            className="w-full max-w-sm m-auto h-128 text-7xl"
            value={room.estimations[0].value}
          />
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
