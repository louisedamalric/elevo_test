import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import App from '../containers/app'
import theme from './theme'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (<ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>), document.getElementById('app')
  )
})
