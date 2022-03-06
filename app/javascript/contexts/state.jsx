import React, { useState, createContext, useMemo } from "react"
import PropTypes from 'prop-types'

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  const [state, setState] = useState({
    objectives: [],
    error: null,
    weightConsistencyError: null,
    showButton: true
  })
  const value = useMemo(() => ({state, setState}), [state])

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  )
}

StateProvider.propTypes = {
  children: PropTypes.node
}
