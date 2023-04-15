import { useState, useCallback, useEffect } from "react"
import { Input } from "@/components/input"
import {RxMagnifyingGlass} from 'react-icons/rx'
import { TableRow } from "@/components/cards/tableRow";
import { NewCardForm } from "@/components/cards/registerCard";
import axios from "axios";
import { Button } from "@/components/common/button";
import { CardType } from "@/types/api";


function Card() {

  const [cards, setCards] = useState<CardType[]>([]);
  const [name, setName] = useState('')

  
  async function getCards() {
    const res = await axios.get('/api/card').then(response => {
      setCards(response.data)
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    getCards()
  }, [])
  
  
  async function sendCard() {
    try {
      axios.post('/api/card', {name}).then(response => console.log(response))
    } catch (error) {
      console.log(error)
    }
  }
    
	return (
    <>
      <div className="text-white">
        <h1>Cards</h1>
        <div>50 cartões</div>
        <div>
          <Input
            onChange={(e) => setName(e.currentTarget.value)}
            icon={<RxMagnifyingGlass className="text-black" size={24} />}
            placeholder="Name"
          />
          <Button onClick={sendCard}>Send</Button>
        </div>
        <div>
          <Button>Trazer Cartões</Button>
         {cards.map(card => {
            return (
              <TableRow key={card.id} name={card.name} cpf={card.cpf} />
            )
          })}
        </div>
        
      </div>
    </>
  );
};

export default Card
