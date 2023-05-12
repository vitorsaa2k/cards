import { CardType } from "@/types/api";
import axios from "axios";

export async function addCard(card: CardType) {
  return await axios.post('/api/card', card).then(res => res.data).catch(error => console.error(error))
}

export async function getCard() {
  return await axios.get('/api/card').then(res => res.data).catch(error => console.error(error))
}