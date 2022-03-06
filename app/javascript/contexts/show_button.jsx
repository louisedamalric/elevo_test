import React, { useState, createContext, useMemo } from "react"
import PropTypes from 'prop-types'

export const showButtonContext = createContext()

export const shoFormProvider = ({ children }) => {
  const [showButton, setShowButton] = useState(true)
  const value = useMemo(() => ({showButton, setShowButton}), [showButton])

  return (
    <showButtonContext.Provider value={value}>
      {children}
    </showButtonContext.Provider>
  )
}

shoFormProvider.propTypes = {
  children: PropTypes.node
}
