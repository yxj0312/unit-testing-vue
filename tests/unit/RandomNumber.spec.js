import RandomNumber from '@/components/RandomNumber'
import { mount } from '@vue/test-utils'

describe('RandomNumber', () => {
  test('By default, the randomNumber data value should be 0', () => {
    const wrapper = mount(RandomNumber)
    expect(wrapper.html()).toContain('<span>0</span>')
  })
  test('If we click the generate button, randomNumber should be between 1 and 10', async () => {
    const wrapper = mount(RandomNumber)
    wrapper.find('button').trigger('click')

    await wrapper.vm.$nextTick()
    const randomNumber = parseInt(wrapper.find('span').element.textContent)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(10)
  })
  test('If we change the min and max props to 200 and 300 and click the button, randomNumber should be between 200 and 300', () => {
    expect(true).toBe(false)
  })
})
