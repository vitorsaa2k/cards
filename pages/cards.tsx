import { ChangeEvent, useCallback, useState } from "react"
import { Input } from "@/components/input"
import {RxMagnifyingGlass} from 'react-icons/rx'
import { TableRow } from "@/components/cards/tableRow";
import { NewCardForm } from "@/components/cards/registerCard";
import axios from "axios";


function Cards() {
  function getCards() {
    axios.get('/api/card').then(response => alert(response)).catch(err => alert(err))
  }

	return (
    <>
      <div className="text-white">
        <h1>Cards</h1>
        <div>50 cartões</div>
        <div>
          <Input
            icon={<RxMagnifyingGlass className="text-black" size={24} />}
            placeholder="Name"
          />
        </div>
        <div>
          <button onClick={getCards}>asda</button>
          <TableRow name="Laura" cpf="192.168.955-88" dateAdded="11/10/2006" />
        </div>
        
      </div>
    </>
  );
};

export default Cards;