import React, { useRef } from 'react'
import Button from '../components/Button'
import { services } from '../feathers'
import MembersCountForm from '../components/MembersCountForm'
import { useUser } from '../layouts/Auth'

const Master = ({ history, ...props }) => {
  const { login } = useUser()
  const handleSubmit = async votersCount => {
    const room = await services.rooms.create({ votersCount })
    const url = `https://pokeo.turbolabs.pe/${room.slug}`
    if (typeof navigator.share !== 'undefined') {
      navigator.share({
        title: 'Invitation to pokeo',
        text: 'Hey, I created a pokeo room to vote in our planning. Join me!',
        url
      })
    }
    navigator.clipboard.writeText(url)
    await login()
    history.push(`/${room.slug}`)
  }
  return (
    <div className="">
      <MembersCountForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Master
