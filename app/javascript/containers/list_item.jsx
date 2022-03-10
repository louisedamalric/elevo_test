import React, { useState, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Form from '../containers/form'
import { request } from '../api/requester'
import { StateContext } from '../contexts/state'

const ListItem = ({ item }) => {
  const { state, setState } = useContext(StateContext)
  const [displayItemForm, setDisplayItemForm] = useState(false)

  const handleClick = () => {
    setDisplayItemForm((prev) => !prev)
  }

  const hideForm = useCallback(() => {
    setDisplayItemForm(false)
  })

  const reduce = (response) => (
    (prev) => prev.objectives.filter((objective) => (
        objective.id != response.id
    ))
  )

  const handleDelete = async () => {
    try {
      const response = await request(`/objectives/${item.id}`, {}, 'DELETE')
      setState((prev) => ({
        ...state,
        objectives: reduce(response)(prev),
        weightConsistencyError: response.weight_consistency_error
      }))
    } catch(error) {
      setState({...state, error })
    }
  }

  return (
    <>
      <Container>
        <Item onClick={handleClick}>
          <Arrow>
            {displayItemForm ? '⌵' : '>'}
          </Arrow>
          <Title>{item.title}</Title>
          <div>{item.completion} %</div>
          <div>{item.weight} %</div>
        </Item>
        <Button onClick={handleDelete}>
          🗑
        </Button>
      </Container>
      {displayItemForm &&
        <Form
          hideForm={hideForm}
          itemId={item.id}
        />}
    </>
  )
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ListItem

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Item = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin: 1rem 0;
  background-color: ${props => props.theme.colors.bgLightPink};
  cursor: pointer;
`

const Button = styled.div`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  padding: 1rem;
`

const Arrow = styled.div`
  font-size: 18px;
  padding-right: 1rem;
`

const Title = styled.div`
  flex: 1;
`

