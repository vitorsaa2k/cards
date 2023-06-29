import { sendMessage } from '../message';
import prismadb from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {cpf, name }= req.body
  
  if(req.method === 'POST') {
    
  try {
    const parsedCpf: string = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") ?? ''
    const user = await prismadb.user.findUnique({
      where: {
        cpf: parsedCpf,
      },
    })

    const card = await prismadb.card.create({
      data: {
        name,
        cpf: parsedCpf,
        wasDelivered: false
      }
    }).then(async data => {

      if(user && user.phone) {
        await sendMessage(user.phone)
      }
      
      return res.status(200).json(data)
    })

  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}

  if(req.method === 'GET') {
    try {
      const card = prismadb.card.findMany().then(data => res.status(200).json(data))
    } catch (error) {
      console.log(error)
      return res.status(400).end()
    }
  }

}