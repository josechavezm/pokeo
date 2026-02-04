import React, { useRef, useState } from 'react'
import Button from './Button'
import Card from './Card'
// import { useTransition, animated } from 'react-spring'

const Voting = ({ availableVotes, firstRender, onVote, morphs, onCantVote }) => {
  const [disabled, setDisabled] = useState(false)

  const handleVote = a => {
    onVote(a)
    setDisabled(true)
  }

  return (
    <div>
      <p>Pick a card to estimate this task</p>
      <div className="flex flex-wrap mt-4 -mx-6">
        {availableVotes.map((a, i) => (
          <div key={a} className="px-4 m-auto">
            <Card clickable={!disabled} {...morphs[a]} onClick={() => handleVote(a)} value={a}></Card>
          </div>
        ))}
      </div>
      <Button variant="secondary" size="small" onClick={onCantVote}>
        I don't vote this time
      </Button>
    </div>
  )
}

export default Voting
