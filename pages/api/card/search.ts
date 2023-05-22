import { NextApiResponse, NextApiRequest } from 'next';
import prismadb from '@/libs/prismadb'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {name} = req.body

  if(req.method === 'POST') {
    try {
      const cards = await prismadb.card.findMany()
      const filtered = cards.filter(value => value.name.toLowerCase().includes(name.toLowerCase()))
      res.status(200).json(filtered)
    } catch (error) {
      console.log(error)
    }
    
  }
}