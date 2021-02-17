# unit-testing-vue

## Spec meaning

Spec stands for specification because in this file we are essentially specifying how the AppHeader component ought to behave, and testing that behavior.
Note that these file names must include “spec.js” — without it, they won’t be run when we use the ```npm run test:unit``` script.

## Identifying what to test for AppHeader.vue

Before we can write tests for our AppHeader.vue component, we need to identify its inputs and outputs

Inputs

- Data: loggedIn - This data property determines if the button shows or not
  
Outputs

- Rendered Output: <button> - Based on the loggedIn input, is our button displayed in the DOM or not

We know that when loggedIn equals false (default), the Logout button is not displayed in the DOM. When loggedIn equals true, then the Logout button is displayed.

So our tests for this component are:

1. If user is not logged in, do not show logout button
2. If user is logged in, show logout button

## Scaffolding our first unit test

First, we’ll need to import the component that we’re testing.

```JavaScript
import AppHeader from '@/components/AppHeader'
```

Now we can create our first test block by using the Jest describe() function.

```JavaScript
describe('AppHeader', () => {

})
```

A describe block allows us to group related tests. When we run our tests we will see the name of the describe block printed in the console. As its arguments, describe() takes a string for the name of the component along with a function where the tests will go. It’s worth noting here that if we only have one test we don’t need to wrap it in a describe block. But when we have multiple tests, it’s helpful to organize them in this way.

Now that we have a grouping for our tests, we can start writing those individual tests. We do this by using the Jest test() method. For its arguments, the test method takes a string to define the test and a function where the actual testing logic will go.

```JavaScript
test('a simple string that defines your test', () => {
  // testing logic
}
```

TIP: You might also see test blocks that use it() and this will also work because it’s an alias for test().

```JavaScript
test('if user is not logged in, do not show logout button', () => {
  // test body
})

test('if a user is logged in, show logout button', () => {
  // test body
})
```

## Asserting Expectations

In Jest, we use assertions to determine whether what we expect the test to return matches what is actually returned. Specifically, we do this by using Jest’s expect() method, which gives us access to a number of “matchers” that help us match the actual result against the expected result.

The syntax for an assertion basically works like this:

```JavaScript
expect(theResult).toBe(true)
```

Inside the expect() method, we’re putting the result itself that we’re testing. We then use a matcher to determine if that result is what we expected it to be. So here, we’re using the common Jest matcher toBe() to say: we expect the result to be true

Understanding how to write tests means understanding what matchers are available to you, so take some time to understand [the Jest Matchers API](https://jestjs.io/docs/en/expect).

## Testing the Button’s visibility

In our first test case, we know that by default the user is not logged in (our input is loggedIn: false) so we want to check and make sure the logout button is not visible.

To make assertions on the state of the logout button, we’ll need to get a reference to the button element that is defined in the template. To accomplish this we will rely on two methods available to us on our new wrapper: find() and isVisible(). The find() method will search through our template for a matching selector in order to locate our button, and isVisible() will return a boolean, telling us if that button is visible in our component or not.

So our first test will look like:

```JavaScript
  test('if user is not logged in, do not show logout button', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('button').isVisible()).toBe(false)
  })

  test("if logged in, show logout button", () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('button').isVisible()).toBe(true)
  })
```

Because we are testing the components behavior when we have a user (when loggedIn is true), we need to update that value or else this test will fail. How we do we this? Vue Test Utils to the rescue!

```JavaScript
test("if logged in, show logout button", () => {
    const wrapper = mount(AppHeader)
    wrapper.setData({ loggedIn: true }) // setting our data value
    expect(wrapper.find('button').isVisible()).toBe(true)
  })
```

Here, we’re using the wrapper’s built-in setData() method to set our data to fit the correct scenario that we’re testing. However, if we were to run this test, it would fail. That’s because when we set the data, this triggers DOM updates, and we need to wait for those updates to happen, otherwise we can’t be sure that we’re testing the final rendered results. To accomplish this, we’ll need to make this test asynchronous using async / await, and rely on $nextTick(), like so:

```JavaScript
test("if logged in, show logout button", async () => {
    const wrapper = mount(AppHeader)
    wrapper.setData({ loggedIn: true }) // setting our data value

    await wrapper.vm.$nextTick() 
    expect(wrapper.find('button').isVisible()).toBe(true)
  })
```

## Random Number Component

### What tests should we write?

Inputs

Props:

- min & max
  
User Interaction:

Clicking of the Generate Random Number button
Outputs

Rendered Output (DOM)

- Is the number displayed on the screen between min and max?

We can use this knowledge to figure out what to test in this component:

1. By default, the randomNumber data value should be 0
2. If we click the generate button, randomNumber should be between 1 (min) and 10 (max)
3. If we change the min and max props to 200 and 300 and click the button, randomNumber should be between 200 (min) and 300 (max).

## Testing Emitted Events

### Scaffolding the test file

we need to accomplish the following steps:

1. Find text input
2. Set value for text input
3. Simulate form submission
4. Assert event has been emitted
5. Assert payload is correct

### A note about targeting inputs

```JavaScript
const input = wrapper.find('input[type="text"]')
```

This works great for our specific needs, but it’s worth mentioning here that in production tests, you might considering using test-specific attribute on your elements, like so:

```JavaScript
<input data-testid="name-input" type="text" v-model="name" />
```

Then, in your test file, you’d find the input using that attribute.

```JavaScript
const input = wrapper.find('[data-testid="name-input"]')
```

This is beneficial for a few reasons.
First, if we had multiple inputs we could target them specifically with these ids, and perhaps more importantly this decouples the DOM from your test.
For example, if you eventually replaced the native input with an input from a component library, the test would still conform to the same interface and wouldn’t need to change.
 It also solves the issue of a designer changing the class or id name of the element, causing your test to fail. Test-specific attributes are one way to future-proof your tests.

### Simulating the form submission

While you might be tempted to use trigger on our form’s button to simulate our form submission, there’s a potential problem with that.
What if we eventually removed the button from this component and instead relied on the input’s keyup.enter event to submit the form?

We would have to refactor our test. In other words: in that case our test would have been too tightly coupled with the implementation details of our component’s form. So the more future-proofed solution would be to force a submit even on the form itself, without relying on our button as the middle man.

Now by using wrapper.trigger('submit'), we’ve implemented a more scalable, decoupled solution to simulate a user submitting our form.

## Testing API Calls

run json-server --watch db.json (install npm install -g json-server before)

### Inputs & Outputs

Well, we know that the response from the getMessage call is our input, and we have two possible outputs:

1. The call happens successfully and the message is displayed
2. The call fails and the error is displayed

So in our test file, we’ll need to:

1. Mock a successful call to getMessage, checking that the message is displayed

2. Mock a failed call to getMessage, checking that the error is displayed

### Mocking Axios

```JavaScript
jest.mock('@/services/axios')
```

You can think of jest.mock as saying: “I’ll take your getMessage function, and in return I’ll give you a mocked getMessage function.” Now, when we call getMessage within our tests, we’re actually calling the mocked version of that function, not the actual one.

```JavaScript
import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'

jest.mock('@/services/axios')

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
     const mockMessage = 'Hello from the db' 
     getMessage.mockResolvedValueOnce({ text: mockMessage }) // calling our mocked get request
     const wrapper = mount(MessageDisplay)
      // wait for promise to resolve
      // check that call happened once
      // check that component displays message
  })
})
```

By using jest’s [mockResolvedValueOnce()](https://jestjs.io/docs/en/mock-function-api.html#mockfnmockresolvedvalueoncevalue) method, we’re doing exactly what the method name suggests: pretending to make the API call and returning a mocked value for the call to resolve with. As its argument, this method takes in the value we want this mocked function to resolve with. In other words, this is where we put a stand-in for what the request should’ve returned. So we’ll pass in { text: mockMessage } to replicate what the server would respond with.

As you can see, we’re using async like we have in previous tests, because axios (and our mocked axios call) is asynchronous. This means that before we write any assertions, we’ll need to make sure that the promise that our mocked call returns gets resolved. Otherwise, our tests would run before the promise is resolved, and fail.

### Awaiting Promises

When figuring out where to await in our test, we have to think back to how getMessage is being called in the component we’re testing. Remember, it’s being called on the component’s created lifecycle hook?

```JavaScript
async created() {
            try {
               this.message = await getMessage()
            } catch (err) {
               this.error = 'Oops! Something went wrong.'
            }
       }
```

Since vue-test-utils doesn’t have access to the internals of promises that are enqueued by the created lifecycle hook, we can’t really tap into anything to await for that promise. So the solution here is to use a third-party library called flush-promises which allows us to—well—flush the promises, ensuring they’re all resolved prior to running our assertions.

Once we’ve installed the library with npm i flush-promises --save-dev, we’ll import it into our testing file and await the flushing of the promises.

```JavaScript
await flushPromises()
```

Now that we’ve ensured promises will be resolved before our assertions are run, we can write those assertions.

### Our Assertions

We’re simply running the method .toHaveBeenCalledTimes() and passing in the number of times we expect getMessage to have been called: 1. Now we’ve ensured that we aren’t accidentally hitting our server more times than we should be.

Next up, we need to check that our component is displaying the message it received from our getMessage request. In the MessageDisplay component’s template, the p tag that displays the message has an id to be used for tests: data-testid="message"

### Mocking a failed request

Notice how we’re using mockRejectedValueOnce to simulate the failed get request, and we’re passing it the mockError for it to resolve with.

After awaiting the flushing of the promises, we can then check that the call only happened once and verify that our component’s template is displaying the expected mockError.

```JavaScript
  it('Displays an error when getMessage call fails', async () => {
    const mockError = 'Oops! Something went wrong.'
    getMessage.mockRejectedValueOnce(mockError)
    const wrapper = mount(MessageDisplay)

    await flushPromises()
    expect(getMessage).toHaveBeenCalledTimes(1)
    const displayedError = wrapper.find('[data-testid="message-error"]').element
      .textContent
    expect(displayedError).toEqual(mockError)
  })
```

Just like our first test, we’re using .toHaveBeenCalledTimes(1) to make sure we’re not making the API call more than we should be, and we’re finding the element that displays the error message and checking its text content against the mockError that our mocked failed request returned.

Now if we run these tests, what happens? The test is failing:

Expected number of calls: 1 Received number of calls: 2

Hmm… what’s happening here? Well, in our first test, getMessage was called, and then it gets called again in our second test. We haven’t done anything to clear out our mocked getMessage function before running the second test. Fortunately, the fix is quite simple.

### Clear All Mocks

Below where we’re creating our jest mock, we can add the solution, clearing all of our mocks.

```JavaScript
  jest.mock('@/services/axios')
beforeEach(() => {
  jest.clearAllMocks()
})

```

Now, beforeEach test is run, we’ll make sure the getMessage mock has been cleared, which will reset the number of times it’s been called back to 0.

## Stubbing Child Components

This concept of mocking something within our unit test is a broader topic than just mocking modules, whether they be axios or some other external dependency. In this lesson, we’ll delve deeper into this topic and look at another form of faking something within a component’s test, called stubbing, and why and when this approach might be useful.

### Children with Baggage

```JavaScript
<template>
  <MessageDisplay />
</template>

<script>
import MessageDisplay from '@/components/MessageDisplay'

export default {
  components: {
    MessageDisplay
  }
}
</script>
```

As you can see, MessageContainer simply imports and wraps MessageDisplay. This means that when MessageContainer gets rendered, MessageDisplay is also rendered. So we’re hitting up against the same problem from our previous lesson. We don’t want to actually fire the real axios get request that happens on MessageDisplay’s created hook.

So what’s the solution here? How do we test MessageContainer without triggering its child’s axios request? Or to make the question more general: What do we do when a child component has module dependencies that we don’t want to use the real version of within our tests?

The answer to that is perhaps not a very satisfying one. Because the answer is: it depends. It depends on the complexity and number of modules that the child has. For this example, things are fairly lightweight. We only have one module, so we could simply mock axios in MessageContainer’s test, just like we did in our MessageDisplay.spec.js. But what if our child component had multiple module dependencies? In more complex cases, it’s often the simpler approach to skip mocking the child component’s module baggage and instead mock the child component itself. In other words: we can use a stub, or fake placeholder version, of the child component.

### The MessageContainer Test
