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
