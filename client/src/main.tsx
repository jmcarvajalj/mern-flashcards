import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Deck from './Deck.tsx'
import Header from './Header.tsx'
import './index.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/decks/:deckId",
    element: <Deck />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="page">
      <Header />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
