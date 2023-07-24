import { NextApiRequest, NextApiResponse } from "next";
import prismadb  from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const field = `${req.query.field}`
  console.log('field', field)
  const data = req.body
  console.log('data', data)
  if(req.method === 'GET') {

    if(field.indexOf('@') === -1 && field.indexOf('-') !== -1) {
      const user = prismadb.user.findUnique({
        where: {
          cpf: field
        }
      }).then(data => res.status(200).json(data)).catch(err => console.log(err))

    } else {
      const user = prismadb.user.findUnique({
        where: {
          email: field
        }
      }).then(data => res.status(200).json(data)).catch(err => console.log(err))
    }

  }

  if(req.method === 'POST') {
    if(data.type === 'email') {
      const user = prismadb.user.update({
        data: {
          cpf: data.cpf,
          email: data.email,
          hashedPassword: data.hashedPassword,
          name: data.name,
          phone: data.phone,
        },
        where: {
          email: field
        }
      }).then(data => res.status(200).json(data)).catch(err => res.status(400).json(err))

    } else {
      const user = prismadb.user.update({
        data: {
          cpf: data.cpf,
          email: data.email,
          hashedPassword: data.hashedPassword,
          name: data.name,
          phone: data.phone,
        },
        where: {
          cpf: field
        }
      }).then(data => res.status(200).json(data)).catch(err => res.status(400).json(err))
    }
  }
}