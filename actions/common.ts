import { UserType } from "@/types/api";
import axios from "axios";

export function generateRandomKey() {
  return (Math.random() * 1).toString(36).substring(2, 13)
}

export function formatCpf(cpf: string, previousValue: string) {
  let value = ''
  const numbersRegex = /^[0-9]+$/;
  if(cpf.length === 0) {
    return ''
  }
  if(cpf.length < previousValue.length) {
    const parsedCpf = cpf.replaceAll(/[-.]/g, '')
    const parsedPreviousValue = previousValue.replaceAll(/[-.]/g, '')
    const finalValue = /^[0-9]+$/.test(parsedCpf) ? parsedCpf : parsedPreviousValue
    return finalValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  numbersRegex.test(cpf) ? (value = cpf) : (value = previousValue);
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export async function getUser(email: string): Promise<UserType> {
  return await axios.post('/api/user', {email}).then(data => data.data).catch(err => console.error(err))
}