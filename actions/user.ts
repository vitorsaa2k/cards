import { UserType } from "@/types/api";
import axios from "axios";

export async function getUser(type: 'cpf' | 'email', field: string): Promise<UserType> {
  return await axios.get(`/api/user/${type}/${field}`).then(res => res.data).catch(err => console.error(err))
}

export async function updateUser(type: 'cpf' | 'email', field: string, user: {email: string, phone: string, name: string, cpf: string}) {
  return await axios.post(`/api/user/${type}/${field}`, {...user, type}).then(res => res.data).catch(err => console.error(err))
}