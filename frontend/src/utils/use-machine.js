import { useMemo, useState, useRef } from 'react'
import { FSM, assign } from '@xstate/fsm'

export function useMachine (config) {
  const machine = useRef(FSM(config), [])
  const [state, setState] = useState(machine.current.initialState)

  const transition = command => {
    const newState = machine.current.transition(state, command)
    setState(newState)
  }
  console.log(state)

  return { state, transition }
}
