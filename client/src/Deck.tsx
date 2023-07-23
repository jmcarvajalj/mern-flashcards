import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { createCard } from './api/createCard'
import { getDeck } from './api/getDeck'
import { deleteCard } from './api/deleteCard'
import { TDeck } from './types/TDeck'
import './Deck.css'

export default function Deck() {

    const [deck, setDeck] = useState<TDeck | undefined>()
    const [text, setText] = useState("")
    const { deckId } = useParams()
    const [cards, setCards] = useState<string[]>([])


    async function handleCreateDeck(e: React.FormEvent) {
        e.preventDefault()
        const { cards: serverCards } = await createCard(deckId!, text)
        setCards(serverCards)
        setText("")
    }

    async function handleDeleteCard(index: number) {
        if (!deckId) return
        const newDeck = await deleteCard(deckId, index)
        setCards(newDeck.cards)
    }

    useEffect(() => {
        async function fetchDeck() {
            if (!deckId) return
            const newDeck = await getDeck(deckId)
            setDeck(newDeck)
            setCards(newDeck.cards)
        }
        fetchDeck()
    }, [deckId])

    return (
        <div className="Deck">            
            <div className="header">
                <h2>Flashcard App</h2>
                <h5>Made by Jose Carvajal</h5>
            </div>
            <h1>{deck?.title}</h1>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor="card-text">Card Text</label>
                <input
                    type="text"
                    id="card-text"
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setText(e.target.value)
                    }}
                />
                <button>Create Card</button>
            </form>
            <div className="cards">
                {cards.map((card, index) => (
                    <li key={index}>
                        <button onClick={() => handleDeleteCard(index)}>X</button>
                        {card}
                    </li>
                ))}
            </div>
        </div>
    )
}