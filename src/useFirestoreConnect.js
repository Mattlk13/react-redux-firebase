import { isEqual } from 'lodash'
import { useRef, useMemo, useEffect } from 'react'
import { invokeArrayQuery, getChanges } from './utils'
import useFirestore from './useFirestore'

/**
 * React hook that automatically listens/unListens
 * to provided Cloud Firestore paths. Make sure you have required/imported
 * Cloud Firestore, including it's reducer, before attempting to use.
 * **Note** Populate is not yet supported.
 * @param {object|string|Array|Function} queriesConfigs - An object, string,
 * or array of object or string for paths to sync from firestore. Can also be
 * a function that returns the object, string, or array of object or string.
 * @see http://docs.react-redux-firebase.com/history/v3.0.0/docs/api/useFirestoreConnect.html
 * @example <caption>Basic</caption>
 * import React from 'react'
 * import { map } from 'lodash'
 * import { useSelector } from 'react-redux'
 * import { useFirebaseConnect } from 'react-redux-firebase'
 *
 * function TodosList() {
 *   useFirebaseConnect('todos') // sync todos collection from Firestore into redux
 *   const todos = useSelector(state => state.firebase.data.todos)
 *   return (
 *     <ul>
 *       {map(todos, (todo, todoId) => (
 *        <li>id: {todoId} todo: {JSON.stringify(todo)}</li>
 *       ))}
 *    </ul>
 *   )
 * }
 * export default TodosList
 * @example <caption>Object as query</caption>
 * import React, { useMemo } from 'react'
 * import { get } from 'lodash'
 * import { connect } from 'react-redux'
 * import { useFirebaseConnect } from 'react-redux-firebase'
 *
 * function TodoItem({ todoId, todoData }) {
 *   useFirebaseConnect(() => ({
 *     collection: 'todos',
 *     doc: todoId
 *   }), [todoId]) // include dependency in the hook
 *
 *   return <div>{JSON.stringify(todoData)}</div>
 * }
 *
 * // pass todo data from redux as props.todosList
 * export default compose(
 *   connect((state) => ({
 *     todoData: get(state, ['firestore', 'data', 'todos', todoId])
 *   })
 * )(TodoItem)
 */
export default function useFirestoreConnect(queriesConfigs) {
  const firestore = useFirestore()
  const firestoreIsEnabled = !!firestore
  const queryRef = useRef()

  const data = useMemo(() => invokeArrayQuery(queriesConfigs), [queriesConfigs])

  useEffect(
    () => {
      if (firestoreIsEnabled && !isEqual(data, queryRef.current)) {
        const changes = getChanges(data, queryRef.current)

        queryRef.current = data

        // Remove listeners for inactive subscriptions
        firestore.unsetListeners(changes.removed)

        // Add listeners for new subscriptions
        firestore.setListeners(changes.added)
      }
    },
    [data]
  )

  // Emulate componentWillUnmount
  useEffect(() => {
    return () => {
      if (firestoreIsEnabled && queryRef.current) {
        firestore.unsetListeners(queryRef.current)
      }
    }
  }, [])
}
