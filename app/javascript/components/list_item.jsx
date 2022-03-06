import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Form from '../containers/form'

const ListItem = ({ item }) => {
  const [displayItemForm, setDisplayItemForm] = useState(false)

  const handleClick = () => {
    setDisplayItemForm((prev) => !prev)
  }

  const handleCancel = () => {
    setDisplayItemForm(false)
  }

  return (
    <>
      <Item onClick={handleClick}>
        <Arrow>
          {displayItemForm ? '⌵' : '>'}
        </Arrow>
        <Title>{item.title}</Title>
        <div>{item.weight} %</div>
      </Item>
      {displayItemForm &&
        <Form
          handleCancel={handleCancel}
          itemId={item.id}
        />}
    </>
  )
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ListItem

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  margin: 1rem 0;
  background-color: ${props => props.theme.colors.bgLightPink};
  cursor: pointer;
`

const Arrow = styled.div`
  font-size: 18px;
  padding-right: 1rem;
`

const Title = styled.div`
  flex: 1;
`

