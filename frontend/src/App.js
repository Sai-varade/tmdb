import React from 'react'
import Login from './components/LoginPage'
import Admin from './components/Admin'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path : "/",
        element : <><Login/></>
      }
      ,
      {
        path : "/Admin",
        element : <><Admin/></>
      }
    ]
  )
  return (

    <RouterProvider router={router}/>
  )
}

export default App
