import prismadb  from '@/libs/prismadb';
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateRandomKey } from '@/actions/common';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }
  const {email, cpf, name, password, phone} = req.body.user

  if(!cpf) {
    try {
      if(!email || !name || !password || !phone) {
        return res.json({error: 'Existem campos em branco'})
      }
      const existingUser = await prismadb.user.findUnique({
        where: {
          email,
        }
      })
      if(existingUser) {
        return res.json({error: 'Esse email já está em uso'})
      }
  
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await prismadb.user.create({
        data: {
          email,
          name,
          hashedPassword,
          emailVerified: new Date(),
          cpf: generateRandomKey(),
          phone
        }
      }).then(data => {
        res.status(200).json({user: data}) 
      })
  
    } catch (error) {
      return res.status(400).end()
    }
  } else {
    try {
      if(!cpf || !name || !password || !phone) {
        return res.json({error: 'Existem campos em branco'})
      }
      const existingUser = await prismadb.user.findUnique({
        where: {
          cpf,
        }
      })
      if(existingUser) {
        return res.json({error: 'Esse CPF já está em uso'})
      }
  
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await prismadb.user.create({
        data: {
          email: generateRandomKey(),
          name,
          hashedPassword,
          emailVerified: undefined,
          cpf,
          phone
        }
      }).then(data => {
        res.status(200).json({user: data}) 
      })
  
    } catch (error) {
      console.log(error)
      return res.status(400).end()
    }
  }

}