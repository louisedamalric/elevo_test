import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ListItem = ({ item }) => {
  return (
    <Item>
      <div>{item.title}</div>
      <div>{item.weight} %</div>
    </Item>
  )
}

ListItem.propTypes = {
  item: PropTypes.object,
}

export default ListItem

const Item = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 2rem;
  margin: 1rem 0;
  background-color: ${props => props.theme.colors.bgLightPink};
  cursor: pointer;
`
