import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { deleteDeck } from './api/deleteDeck'
import { getDecks } from './api/getDecks'
import { createDeck } from './api/createDeck'
import { TDeck } from './types/TDeck'
import './App.css'

export default function App() {

  const [title, setTitle] = useState("")
  const [decks, setDecks] = useState<TDeck[]>([])


  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault()
    const deck = await createDeck(title)
    setDecks([...decks, deck])
    setTitle("")
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter(deck => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <div className="App">
      <div className="header">
        <h2>Flashcard App</h2>
        <h5>Made by Jose Carvajal</h5>
      </div>
      <h1>Your Decks</h1>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title: </label>
        <input
          type="text"
          id="deck-title"
          autoFocus
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button className="create-deck">Create Deck</button>
      </form>
      <div className="decks">
        {decks.map((deck) => (
          <div key={deck._id} className="container">
            <Link to={`decks/${deck._id}`}>
              <div className='item'>
                {deck.title}
              </div>
            </Link>
            <button className="delete-button" onClick={() => handleDeleteDeck(deck._id)}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  )
}