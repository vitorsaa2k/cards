import { NextApiRequest, NextApiResponse } from "next";
import prismadb  from '@/libs/prismadb';



export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {email} = req.body
  if(req.method === 'POST') {
    const user = prismadb.user.findUnique({
      where: {
        email
      }
    }).then(data => res.status(200).json(data)).catch(err => console.log(err))
  }
}