import { CardType } from "@/types/api";
import axios from "axios";

export async function addCard(card: CardType) {
  return await axios.post('/api/card', card).then(res => res.data).catch(error => console.error(error))
}

export async function getCards() {
  return await axios.get('/api/card').then(res => res.data).catch(error => console.error(error))
}

export async function deleteCard(id: string) {
  return await axios.post('/api/card/delete', {id}).then(res => res.data).catch(error => console.error(error))
}

export async function setDelivered(id: string) {
  return await axios.post('/api/card/deliver', {id}).then(res => res.data).catch(error => console.error(error))
}

export async function searchCardOnDB(name: string) {
  return await axios.post('/api/card/search', { name }).then(res => res.data).catch(error => console.error(error))
}

export async function signUp(user: { cpf: string; email: string; password: string, name: string, phone: string }) {
  return await axios.post('/api/register', {user}).then(res => res.data).catch(error => console.error(error))
}