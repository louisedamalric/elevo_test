import React, { memo, useContext } from 'react'
import styled from 'styled-components'

import ListItem from './list_item'
import { StateContext } from "../contexts/state"

const List = () => {
  const { state: { objectives } } = useContext(StateContext)

  return (
    <Container>
      {objectives.map((e) =>
        <ListItem
          key={e.id}
          item={e}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  margin: 3rem auto;
  max-width: 800px;
`

export default memo(List)
