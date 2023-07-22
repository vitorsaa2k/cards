import { UserType } from "@/types/api";
import axios from "axios";

export async function getUser(email: string): Promise<UserType> {
  return await axios.get(`/api/user/${email}`).then(res => res.data).catch(err => console.error(err))
}

export async function updateUser(user: {email: string, phone: string, name: string, cpf: string}, email: string) {
  return await axios.post(`/api/user/${email}`, {...user}).then(res => res.data).catch(err => console.error(err))
}