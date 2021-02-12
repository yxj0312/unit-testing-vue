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
