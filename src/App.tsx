import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './style/main.scss'

// TODO: добавить страницу saas c чатами

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App