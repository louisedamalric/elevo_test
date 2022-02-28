import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const Button = ({ text, handleClick }) => {
  return (
    <StyledButton onClick={handleClick}>
      {text}
    </StyledButton>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string,
};

const StyledButton = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  font-weight: 700;
  cursor: pointer;
`

export default Button
