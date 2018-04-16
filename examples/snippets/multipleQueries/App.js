import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import TodoItem from './TodoItem'

const renderList = (list) =>
  !isLoaded(list)
    ? 'Loading'
    : (isEmpty(list))
      ? 'Todo list is empty'
      : map(list, (todo, id) =>
          <TodoItem key={id} id={id} todo={todo} />
        )

const MultipleQueries = ({ incompleteTodos, completeTodos }) => (
  <div>
    <div>
      <h2>react-redux-firebase multiple queries demo</h2>
    </div>
    <div>
      <h4>Incomplete Todos</h4>
      {renderList(incompleteTodos)}
      <h4>Complete Todos</h4>
      {renderList(completeTodos)}
    </div>
  </div>
)

MultipleQueries.propTypes = {
  myProjects: PropTypes.object,
  anonymousProjects: PropTypes.object
}

export default compose(
  firebaseConnect([
    {
      path: 'todos',
      storeAs: 'incompleteTodos',
      queryParams: [ 'orderByChild=done', 'equalTo=true'] },
    {
      path: 'todos',
      storeAs: 'completeTodos',
      queryParams: [ 'orderByChild=done', 'equalTo=false']
    },
  ]),
  connect(
    ({ firebase: { data } }) => ({
      incompleteTodos: data['incompleteTodos'], // path matches storeAs
      completeTodos: data['completeTodos'] // path matches storeAs
    })
  )
)
