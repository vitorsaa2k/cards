import { NextApiRequest, NextApiResponse } from "next";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body

  if(req.method === 'POST') {
    client.messages.create({
      from: "whatsapp:+14155238886",
      body: message,
      to: "whatsapp:+557488740784",
    }).then((message: any) => res.json(message))
    
  }

}

export async function sendMessage(phone: string) {

  const arrivedCardMessage = 
  `Seu cartão Casas Bahia chegou!
Endereço da loja onde o cartao está:
*R. Barão do Rio Branco, 533 - Centro, Petrolina - PE, 56304-260*`

    client.messages.create({
      from: "whatsapp:+14155238886",
      body: arrivedCardMessage,
      to: `whatsapp:+55${phone}`,
    }).then((message: any) => console.log(message))
    
} 