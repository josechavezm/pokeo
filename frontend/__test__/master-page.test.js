import React from 'react'
import { render } from 'test-utils'
import MembersCountForm from '../src/components/MembersCountForm'
import userEvent from '@testing-library/user-event'

describe('master-page', () => {
  it('should get the voters count number when selected', () => {
    const handleSubmit = jest.fn()
    const { getByLabelText, getByText } = render(<MembersCountForm onSubmit={handleSubmit} />)
    const countNode = getByLabelText('¿Cuántas personas ponen puntos?')
    const submitButton = getByText('Invitar')
    userEvent.selectOptions(countNode, '3')
    userEvent.click(submitButton)
    expect(handleSubmit).toBeCalledWith('3')
  })
})
