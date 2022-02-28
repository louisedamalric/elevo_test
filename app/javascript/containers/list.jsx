import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

import ListItem from '../components/list_item'

const List = ({ items }) => {
  const handleItemClick = () => {
    console.log('creating')
  }

  return (
    <Container>
      {items.map((e) =>
        <ListItem
          key={e.id}
          item={e}
          handleItemClick={handleItemClick}
        />
      )}
    </Container>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired
};

const Container = styled.div`
  margin: 10rem auto;
  max-width: 800px;
`

export default List
