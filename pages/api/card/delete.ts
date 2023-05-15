import prismadb  from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const {id} = req.body
  
  if(req.method === 'POST') {
    try {
      const deletedCard = prismadb.card.delete({
        where: {id}
      }).then(data => res.status(200).json(data))
    } catch (error) {
      console.log(error)
      return res.status(400).end()
    }
  }

}