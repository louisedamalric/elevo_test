import * as React from 'react'

import Button from '../components/button'

export default () => {
  const handleClick = () => {
    console.log('yreferfo')
  }

  return (
    <Button
      text='Add new objective +'
      handleClick={handleClick}
    />
  )
}
