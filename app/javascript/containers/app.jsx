import React, { useState, useEffect, useCallback } from 'react'
import { isEmpty } from 'lodash'
import styled from 'styled-components'

import Button from '../components/button'
import List from './list'
import Form from './form'
import Navbar from '../components/navbar'

const App = () => {
  const [isError, setIsError] = useState(null)
  const [objectives, setObjectives] = useState([])
  const [objectiveErrors, setObjectiveErrors] = useState([])
  const [displayForm, setDisplayForm] = useState(false)

  useEffect(() => {
    fetch('/objectives')
      .then(response => response.json())
      .then((data) => setObjectives(data))
      .catch(error => {
        setIsError(error)
      })
  }, [])

  const handleClick = useCallback(() => {
    setDisplayForm(true)
  })

  const handleSubmit = useCallback((values) => {
    fetch('/objectives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then((data) => {
        if (isEmpty(data.errors)) {
          setObjectives([...objectives, data ])
          setObjectiveErrors([])
          setDisplayForm(false)
        } else {
          setObjectiveErrors(data.errors)
        }
      })
      .catch(error => {
        setIsError(error)
      })
  })

  const handleCancel = useCallback(() => {
    setDisplayForm(false)
  })

  return (
    !isError &&
    <Container>
      <Navbar />
      {!displayForm &&
        <Button
          text='Add new objective +'
          handleClick={handleClick}
        />
      }
      {!!displayForm &&
        <Form
          handleSubmit={handleSubmit}
          errors={objectiveErrors}
          handleCancel={handleCancel}
        />
      }
      {!isEmpty(objectives) &&
        <List items={objectives} />
      }
    </Container>
  )
}

const Container = styled.div`
  max-width: 1030px;
  margin: auto;
`

export default App
