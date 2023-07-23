import { TDeck } from "../types/TDeck"
import { API_URL } from "./config"

export async function createCard(deckId: string, text: string): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: text
        })
    })
    return response.json()
}