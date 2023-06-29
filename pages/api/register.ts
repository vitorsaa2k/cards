import prismadb  from '@/libs/prismadb';
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateRandomKey } from '@/actions/common';
import { redirect } from 'next/navigation'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }
  const {email, cpf, name, password, phone} = req.body.user

  if(cpf.toString().length <= 0) {
    try {
  
      const existingUser = await prismadb.user.findUnique({
        where: {
          email,
        }
      })
      if(existingUser) {
        return res.status(422).json({email: 'Email taken'})
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
        res.status(200).json(data) 
        return redirect('/cards')
      })
  
    } catch (error) {
      console.log(error)
      return res.status(400).end()
    }
  } else {
    try {
  
      const existingUser = await prismadb.user.findUnique({
        where: {
          cpf,
        }
      })
      if(existingUser) {
        return res.status(422).json({cpf: 'esse cpf já esta sendo usado'})
      }
      const formatedCpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = await prismadb.user.create({
        data: {
          email: generateRandomKey(),
          name,
          hashedPassword,
          emailVerified: undefined,
          cpf: formatedCpf,
          phone
        }
      }).then(data => {
        res.status(200).json(data) 
        return redirect('/cards')
      })
  
    } catch (error) {
      console.log(error)
      return res.status(400).end()
    }
  }

}