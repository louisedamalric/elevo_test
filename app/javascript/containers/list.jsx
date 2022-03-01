import React, { memo } from 'react'
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
  items: PropTypes.array
};

const Container = styled.div`
  margin: 3rem auto;
  max-width: 800px;
`

export default memo(List)
