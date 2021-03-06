<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [useFirestore][1]
    -   [Examples][2]

## useFirestore

-   **See: [http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/useFirestore.html][3]**

### Examples

_Basic_

```javascript
import React from 'react'
import { useFirestore } from 'react-redux-firebase'

function AddData({ firebase: { add } }) {
  const firestore = useFirestore()

  function addTodo() {
    const exampleTodo = { done: false, text: 'Sample' }
    return firestore.collection('todos').add(exampleTodo)
  }

  return (
    <div>
      <button onClick={addTodo}>
        Add Sample Todo
      </button>
    </div>
  )
}

export default AddTodo
```

Returns **[object][4]** Extended Firestore instance

[1]: #usefirestore

[2]: #examples

[3]: http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/useFirestore.html

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
