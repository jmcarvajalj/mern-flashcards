import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { deleteDeck } from './api/deleteDeck'
import { getDecks } from './api/getDecks'
import { createDeck } from './api/createDeck'
import { TDeck } from './types/TDeck'
import './App.css'

function App() {

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
      <h1>Your Decks</h1>
      <div className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          type="text"
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
