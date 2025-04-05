import React from 'react'
import Login from './components/LoginPage'
import Admin from './components/Admin'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddMovieForm from './components/AddMovie';
import MoviesList from './components/deletemovies';
import MovieList from './components/allmovies';
import EditMovies from './components/Editmovie';
import Edit from './components/Edit';
import Alluser from './components/Alluser';

import Moviedetail from './components/Moviedetail';
import Moviecard from './components/home';
import Reviews from './components/Reviews';

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
      ,
      {
        path : "/Add",
        element : <><AddMovieForm/></>
      }
      ,
      {
        path : "/Delete",
        element : <><MoviesList/></>
      }
      ,
      {
        path : "/Allmovies",
        element : <><MovieList/></>
      }
      ,
      {
        path : "/Edit",
        element : <><EditMovies/></>
      }
      ,
      {
        path : "/EditMovie/:id",
        element : <><Edit/></>
      }
      ,
      {
        path : "/AllUsers",
        element : <><Alluser/></>
      }
      ,
      {
        path : "/home",
        element : <><Moviecard/></>
      }
      ,
      {
        path : "/Movie/:id",
        element : <><Moviedetail/></>
      },
      {
        path : "/Reviews/:moviename",
        element : <><Reviews/></>
      }
    ]
  )
  return (

    <RouterProvider router={router}/>
  )
}

export default App
