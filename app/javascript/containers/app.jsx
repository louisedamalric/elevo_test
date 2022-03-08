import React, { useEffect, useCallback, useContext } from 'react'
import { isEmpty } from 'lodash'
import styled from 'styled-components'

import Button from '../components/button'
import List from './list'
import Form from './form'
import Navbar from '../components/navbar'
import { StateContext } from "../contexts/state"
import { getRequest } from '../api/requester'

const App = () => {
  const { setState, state } = useContext(StateContext)
  const { objectives, error, showButton, weightConsistencyError } = state

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const response = await getRequest('/objectives')
        setState({
          ...state,
          objectives: response.data,
          weightConsistencyError: response.weight_consistency_error
        })
      } catch(error) {
        setState({ ...state, error })
      }
    }

    fetchObjectives()
  }, [])

  const handleClick = useCallback(() => {
    setState({ ...state, showButton: false })
  })

  const hideForm = useCallback(() => {
    setState({ ...state, showButton: true })
  })

  if (error) {
    return <div>{error}</div>
  }

  return (
    !error &&
    <Container>
      <Navbar />
      {showButton &&
        <Button
          text='Add new objective +'
          handleClick={handleClick}
        />}
      {!!weightConsistencyError &&
        <WeightError>{weightConsistencyError}</WeightError>}
      {!showButton &&
        <Form hideForm={hideForm}/>}
      {!isEmpty(objectives) &&
        <List />}
    </Container>
  )
}

const Container = styled.div`
  max-width: 1030px;
  margin: auto;
`

const WeightError = styled.div`
  margin: 3rem auto;
`

export default App
