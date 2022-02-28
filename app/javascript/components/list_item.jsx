import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ListItem = ({ item, handleItemClick }) => {

  const handleClick = (itemId) => {
    handleItemClick(itemId)
  }

  return (
    <Item onClick={() => handleClick(item.id)}>
      {item.title}
    </Item>
  )
}

ListItem.propTypes = {
  title: PropTypes.string,
}

export default ListItem

const Item = styled.div`
  padding: 2rem;
  margin: 1rem 0;
  background-color: ${props => props.theme.colors.bgLightPink};
  cursor: pointer;
`
