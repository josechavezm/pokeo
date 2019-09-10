import React, { useRef } from 'react'
import Card from './Card'
// import { useTransition, animated } from 'react-spring'

const Voting = ({ availableVotes, firstRender, onVote, morphs }) => {
  // const transitions = useTransition(availableVotes, item => item, {
  //   unique: true,
  //   trail: 400 / availableVotes.length,
  //   immediate: !firstRender,
  //   from: { opacity: firstRender ? 0 : 1, transform: firstRender ? 'scale(0)' : 'scale(1)' },
  //   enter: { opacity: 1, transform: 'scale(1)' }
  // })
  return (
    <div>
      <p>Selecciona una tarjeta para estimar cuanto vale esta tarea</p>
      <div className="flex flex-wrap mt-4 -mx-4">
        {/* {transitions.map(({ item, key, props }) => (
          <animated.div key={key} className="mx-4" style={firstRender ? props : null}>
            <Card clickable {...morphs[item]} onClick={() => onVote(item)} value={item}></Card>
          </animated.div>
        ))} */}
        {availableVotes.map((a, i) => (
          <div key={a} className="px-4 m-auto">
            <Card clickable {...morphs[a]} onClick={() => onVote(a)} value={a}></Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Voting
