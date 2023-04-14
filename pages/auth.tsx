import axios from "axios"
import { signIn } from "next-auth/react"
import { ChangeEvent, useCallback, useState } from "react"


const Auth = () => {
  const [variant , setVariant] = useState('login')
  const [fields, setFields] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const register = useCallback(async () => {
    try {
      axios.post('/api/register', fields)
    } catch (error) {
      console.log(error)
    }
  }, [fields])

  const logIn = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      })
    } catch (error) {
      console.log(error)
    }
  }, [email, password])


  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget
    setFields(prevState => ({
      ...prevState,
      [name]: value,
    }))
    switch(name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'name':
        setName(value)
        break
    }
  }
  console.log(email, password, name)
  return (
    <div>
      <div>
      <div>
        <input className="bg-black" name="email" value={fields.email} onChange={e => handleInput(e)}></input>
        <input name="password" value={fields.password} onChange={e => handleInput(e)}></input>
        {variant === 'register' && (
          <input name="name" value={fields.name} onChange={e => handleInput(e)}></input>
        )}
        <button onClick={variant === 'login' ? logIn : register}>
          {variant === 'login' ? 'Sign In' : 'Sign up'}
        </button>
      </div>
      <div>
        Already have an account? 
        <button onClick={() => setVariant(prevState => prevState === 'login' ? 'register' : 'login')}>
          {variant === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
      </div>
    </div>
  )
}

export default Auth