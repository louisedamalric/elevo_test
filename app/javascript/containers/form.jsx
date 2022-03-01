import React, { memo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

import { useInput } from '../hooks/use_input';

const Form = ({ handleSubmit, errors, handleCancel }) => {
  const { value:title, bind:bindTitle, reset:resetTitle } = useInput('');
  const { value:weight, bind:bindWeight, reset:resetWeight } = useInput('');

  const handleOnSubmit = (e) => {
    e.preventDefault()
    handleSubmit({ title, weight })
    resetTitle();
    resetWeight();
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <Container>
        <Label>
          Title
          <Input type="text" {...bindTitle} />
        </Label>
        <Label>
          Weight
          <Input type="number" {...bindWeight} />
        </Label>
      </Container>
      <Span onClick={handleCancel}>Cancel</Span>
      <Submit type="submit" value="Add" />
      <Errors>
        {errors.map((error) => (
          <span key={error}>{error}</span>
        ))}
      </Errors>
    </form>
  )
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  errors: PropTypes.array
};

const Container = styled.div`
  margin: 4rem 0 2rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.bgLightBlue};

  >label:first-child {
    flex: 1;
  }
`

const Errors = styled.div`
  color: red;
  display: flex;
  flex-direction: column;
`

const Span = styled.span`
  opacity: 0.7;
  margin-right: 2rem;
  cursor: pointer;
  border-bottom: 1px solid ${({theme}) => theme.colors.fontColor};
`

const Input = styled.input`
  padding: 0.5rem;
  margin: 1rem 0;
  min-height: 2rem;
  min-width: 20rem;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`

const Submit = styled.input`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border: none;
  cursor: pointer;
  min-width: 10rem;
`

export default memo(Form)
