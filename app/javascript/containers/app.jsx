import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import Button from '../components/button'
import List from './list'

const App = () => {
  const [error, setError] = useState(null);
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    fetch("/objectives")
      .then(async response => {
        const data = await response.json();
        setObjectives(data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  const handleClick = () => {
    console.log('yreferfo')
  }

  return (
    !error &&
    <>
      <Button
        text='Add new objective +'
        handleClick={handleClick}
      />
      {!isEmpty(objectives) &&
        <List items={objectives} />
      }
    </>
  )
}

export default App
