"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DeckSchema = new Schema({
    title: String,
    cards: [String]
});
const DeckModel = mongoose_1.default.model("Deck", DeckSchema);
exports.default = DeckModel;
