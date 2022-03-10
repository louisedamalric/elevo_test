import React, { memo, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { StateContext } from "../contexts/state"
import { request } from '../api/requester'

const Form = ({ itemId, hideForm }) => {
  const { state, setState } = useContext(StateContext)
  const { objectives, error } = state
  const [objectiveErrors, setObjectiveErrors] = useState([])
  const [value, setValue] = useState({
    weight: '',
    title: '',
    completion: ''
  })

  useEffect(() => {
    const selectedItem = objectives.find(item => item.id == itemId)
    if (selectedItem) {
      setValue({
        weight: selectedItem.weight,
        title: selectedItem.title,
        completion: selectedItem.completion || ''
      })
    }
  }, [itemId])

  const handleChange = (newValue, valueType) => {
    setValue({ ...value, [valueType]: newValue })
  }

  const handleDataReceived = (data, reducer) => {
    if (isEmpty(data.errors)) {
      setState((prev) => ({
        ...state,
        weightConsistencyError: data.weight_consistency_error,
        objectives: reducer(data)(prev.objectives),
        showButton: true,
        displayItemForm: false
      }))
      setObjectiveErrors([])
    } else {
      setObjectiveErrors(data.errors)
    }
  }

  const updateObjective = (data) => (
    (prev) => prev.map((objective) => (
      objective.id === data.id ? data : objective
    )
  ))

  const createObjective = (data) => (
    (prev) => [...prev, data]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (itemId) {
        const response = await request(`/objectives/${itemId}`, value, 'PUT')
        handleDataReceived(response, updateObjective)
        hideForm()
      } else {
        const response = await request('/objectives', value, 'POST')
        handleDataReceived(response, createObjective)
        setValue({ weight: '', title: '', completion: '' })
      }
    } catch(error) {
      setState({...state, error })
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Container>
        <Label>
          Title
          <Input
            type="text"
            onChange={(e) => handleChange(e.target.value, 'title')}
            value={value.title}
          />
        </Label>
        <Label>
          Completion
          <Input
            type="number"
            onChange={(e) => handleChange(e.target.value, 'completion')}
            value={value.completion}
          />
        </Label>
        <Label>
          Weight
          <Input
            type="number"
            onChange={(e) => handleChange(e.target.value, 'weight')}
            value={value.weight}
          />
        </Label>
      </Container>
      <Span onClick={hideForm}>
        Cancel
      </Span>
      <Submit type="submit" value={itemId ? "Update" : "Add"} />
      <Errors>
        {objectiveErrors.map((error) => (
          <span key={error}>{error}</span>
        ))}
      </Errors>
    </StyledForm>
  )
}

Form.propTypes = {
  hideForm: PropTypes.func,
  errors: PropTypes.array,
  itemId: PropTypes.number
};

const StyledForm = styled.form`
  margin: auto;
  max-width: 800px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  align-items: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.bgLightPink};

  >label:first-child {
    flex: 1;
  }
`

const Errors = styled.div`
  color: red;
  display: flex;
  flex-direction: column;
`

const Span = styled.span`
  opacity: 0.7;
  margin-right: 2rem;
  cursor: pointer;
  border-bottom: 1px solid ${({theme}) => theme.colors.fontColor};
`

const Input = styled.input`
  padding: 0.5rem;
  margin: 1rem 0;
  min-height: 2rem;
  min-width: 20rem;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`

const Submit = styled.input`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border: none;
  cursor: pointer;
  min-width: 10rem;
`

export default memo(Form)
