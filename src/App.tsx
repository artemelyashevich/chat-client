import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './style/main.scss'

// TODO: добавить страницу saas c чатами

const App: React.FC = () => {
  return (
    <div className='wrapper'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App