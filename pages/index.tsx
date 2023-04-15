import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  async function submit() {
    try {
      console.log(email, name, password)
      axios.post('/api/register', {email, name, password}).then(response => console.log(response))
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <>
      <Link href={'/cards'}>Cards</Link>
      <div>
        <label>
          email
        <input onChange={(e) => setEmail(e.currentTarget.value)}></input>
        </label>
        <label>
          name
        <input onChange={(e) => setName(e.currentTarget.value)}></input>
        </label>
        <label>
          password
        <input onChange={(e) => setPassword(e.currentTarget.value)}></input>
        </label>

        <button onClick={submit}>submit</button>
      </div>
    </>
  )
}
