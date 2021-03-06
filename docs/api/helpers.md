<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [getVal][1]
    -   [Parameters][2]
    -   [Examples][3]
-   [isLoaded][4]
    -   [Parameters][5]
    -   [Examples][6]
-   [isEmpty][7]
    -   [Parameters][8]
    -   [Examples][9]
-   [populate][10]
    -   [Parameters][11]
    -   [Examples][12]

## getVal

**Deprecated** - This helper will be removed in future versions. Please
use object destructuring or utilities from other libraries such as
[lodash's get][13].
Get a value from firebase using slash notation. This enables an easy
migration from v1's dataToJS/pathToJS/populatedDataToJS functions to v2 syntax
**NOTE:** Setting a default value will cause `isLoaded` to always return true

### Parameters

-   `firebase` **[object][14]** Firebase instance (state.firebase)
-   `path` **[string][15]** Path of parameter to load
-   `notSetValue` **any** Value to return if value is not
    found in redux. This will cause `isLoaded` to always return true (since
    value is set from the start).

### Examples

_Basic_

```javascript
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'

const enhance = compose(
  firebaseConnect(['todos/user1']),
  connect(({ firebase }) => ({
    // this.props.todos loaded from state.firebase.data.todos
    todos: getVal(firebase, 'data/todos/user1')
  }))
)
export default enhance(SomeComponent)
```

_Base Paths_

```javascript
import { connect } from 'react-redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'

export default connect(({ firebase }) => ({
  // this.props.auth loaded from state.firebase.auth
  auth: getVal(firebase, 'auth'),
  profile: getVal(firebase, 'profile')
})(SomeComponent)
```

_Default Value_

```javascript
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, getVal } from 'react-redux-firebase'

const defaultValue = {
 1: {
   text: 'Example Todo'
 }
}

const enhance = compose(
  firebaseConnect(['todos/user1']),
  connect(({ firebase }) => ({
    // this.props.todos loaded from state.firebase.data.todos
    todos: getVal(firebase, 'data/todos/user1', defaultValue)
  }))
)

export default enhance(SomeComponent)
```

Returns **any** Data located at path within firebase.

## isLoaded

Detect whether data from redux state is loaded yet or not

### Parameters

-   `args` **...[object][14]** Items to check loaded status of. A comma separated
    list is also acceptable.

### Examples

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import firebaseConnect from 'react-redux-firebase/lib/firebaseConnect'
import { isLoaded, isEmpty } from 'react-redux-firebase/lib/utils'

const enhance = compose(
  firebaseConnect(['todos']),
  connect(({ firebase: { data: { todos } } }) => ({
    todos // state.firebase.data.todos from redux passed as todos prop
  }))
)

function Todos({ todos }) {
  // Message for if todos are loading
  if (!isLoaded(todos)) {
    return <span>Loading...</span>
  }

  // Message if todos are empty
  if (isEmpty(todos)) {
    return <span>No Todos Found</span>
  }

  return <div><pre>{JSON.stringify(todos, null, 2)}</pre></div>
}

Todos.propTypes = {
  todos: PropTypes.object
}

export default enhance(Todos)
```

Returns **[boolean][16]** Whether or not item is loaded

## isEmpty

Detect whether items are empty or not

### Parameters

-   `args` **[object][14]** Item to check loaded status of. A comma seperated list
    is also acceptable.

### Examples

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'

const enhance = compose(
  firebaseConnect(['todos']),
  connect(({ firebase: { data: { todos } } }) => ({
    todos // state.firebase.data.todos from redux passed as todos prop
  }))
)

function Todos({ todos }) {
  // Message for if todos are loading
  if (!isLoaded(todos)) {
    return <span>Loading...</span>
  }

  // Message if todos are empty
  if (isEmpty(todos)) {
    return <span>No Todos Found</span>
  }

  return <todos>{JSON.stringify(todos)}</todos>
}

Todos.propTypes = {
  todos: PropTypes.object
}

export default enhance(Todos)
```

Returns **[boolean][16]** Whether or not item is empty

## populate

Populate with data from multiple locations of redux state.

### Parameters

-   `state` **[object][14]** Firebase state object (state.firebase in redux store)
-   `path` **[string][15]** Path of parameter to load
-   `populates` **[Array][17]** Array of populate config objects
-   `notSetValue` **([object][14] \| [string][15] \| [boolean][16])** Value to return if value is not found

### Examples

_Basic_

```javascript
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
const populates = [{ child: 'owner', root: 'users' }]

const enhance = compose(
  firebaseConnect([
    { path: 'todos', populates } // load "todos" and matching "users" to redux
  ]),
  connect((state) => ({
    // this.props.todos loaded from state.firebase.data.todos
    // each todo has child 'owner' populated from matching uid in 'users' root
    // for loading un-populated todos use state.firebase.data.todos
    todos: populate(state.firebase, 'todos', populates),
  })
)

export default enhance(SomeComponent)
```

Returns **[object][14]** Data located at path within Immutable Object

[1]: #getval

[2]: #parameters

[3]: #examples

[4]: #isloaded

[5]: #parameters-1

[6]: #examples-1

[7]: #isempty

[8]: #parameters-2

[9]: #examples-2

[10]: #populate

[11]: #parameters-3

[12]: #examples-3

[13]: https://lodash.com/docs/4.17.15#get

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[15]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[17]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
