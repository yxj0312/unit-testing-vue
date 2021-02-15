import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'

jest.mock('@/services/axios')

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
    // mock the API call
    const wrapper = mount(MessageDisplay)
    // wait for promise to resolve
    // check that call happened once
    // check that component displays message
  })

  it('Displays an error when getMessage call fails', async () => {
    // mock the failed API call
    const wrapper = mount(MessageDisplay)
    // wait for promise to resolve
    // check that call happened once
    // check that component displays error
  })
})
