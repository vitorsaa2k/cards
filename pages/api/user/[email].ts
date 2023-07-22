import { NextApiRequest, NextApiResponse } from "next";
import prismadb  from '@/libs/prismadb';
import { UserType } from "@/types/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const email = `${req.query.email}`
  const data: UserType = req.body
  if(req.method === 'GET') {
    const user = prismadb.user.findUnique({
      where: {
        email
      }
    }).then(data => res.status(200).json(data)).catch(err => console.log(err))
  }

  if(req.method === 'POST') {
    const user = prismadb.user.update({
      data: {
        cpf: data.cpf,
        email: data.email,
        hashedPassword: data.hashedPassword,
        name: data.name,
        phone: data.phone,
      },
      where: {
        email
      }
    }).then(data => res.status(200).json(data)).catch(err => res.status(400).json(err))
  }
}