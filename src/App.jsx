import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from '../.src/components/Home/Home'
import RecipeDetails from '../.src/components/RecipeDetails/RecipeDetails'
import Favorite from './../.src/components/Favorite/Favorite';
import NotFound from '../.src/components/NotFound/NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../.src/components/Layout/Layout'
import RecipeProvider from '../.src/components/Context/RecipeProvider'
import React, { useContext } from 'react'


function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {path:"recipeDetails/:id", element:<RecipeDetails/>},
        {path:"favorite", element:<Favorite/>},
        {path:"*", element:<NotFound/>},
       
      ]
    }
       
])

  return (
    <>
     <RecipeProvider>
      <RouterProvider router={router} />
     </RecipeProvider>
    </>
  )
}

export default App
