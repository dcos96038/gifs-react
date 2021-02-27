import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('rendering test', async () => {
  const { findByText } = render(<App />)
  const title = await findByText(/Ultima Busqueda/i)
  expect(title).toBeInTheDocument()
})
