import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import App from '../containers/app'
import theme from './theme'
import { StateProvider } from "../contexts/state"

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StateProvider>
    ), document.getElementById('app')
  )
})
