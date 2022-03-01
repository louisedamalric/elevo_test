import React from 'react'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <StyledNavbar>
      <img
        src="https://uploads-ssl.webflow.com/612d438094fd002ae70d81fd/612d438094fd0066ee0d8279_logo.svg"
        alt="Logo Elevo"
      />
      <div>Test Elevo Louise d'Amalric</div>
    </StyledNavbar>
  )
}

export default Navbar

const StyledNavbar = styled.div`
  height: 5rem;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  align-items: center;
`
