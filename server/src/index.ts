import { config } from "dotenv"
config()
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { getDecksController } from "./controllers/getDecksController"
import { createDeckController } from "./controllers/createDeckController"
import { deleteDeckController } from "./controllers/deleteDeckController"
import { createCardForDeckController } from "./controllers/createCardForDeckController"
import { getDeckController } from "./controllers/getDeckController"
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController"

const PORT = 5000
const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

app.get("https://mern-flashcards-k8rkw2lkn-jmcarvajalj.vercel.app/decks", getDecksController)

app.post("https://mern-flashcards-k8rkw2lkn-jmcarvajalj.vercel.app/decks", createDeckController)

app.delete("https://mern-flashcards-k8rkw2lkn-jmcarvajalj.vercel.app/decks/:deckId", deleteDeckController)

app.get("https://mern-flashcards-k8rkw2lkn-jmcarvajalj.vercel.app/decks/:deckId", getDeckController)

app.post("https://mern-flashcards-k8rkw2lkn-jmcarvajalj.vercel.app/:deckId/cards", createCardForDeckController)

app.delete("https://mern-flashcards-k8rkw2lkn-jmcarvajalj.vercel.app/decks/:deckId/cards/:index", deleteCardOnDeckController)

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Listening in port ${PORT}`);
    app.listen(PORT)
})
