import { ChangeEvent, useCallback, useState } from "react"
import axios from 'axios'
import { Input } from "@/components/input"
import {RxMagnifyingGlass} from 'react-icons/rx'


const Cards = () => {
	return (
		<>
			<div>
			  <h1>Cards</h1>
        <div>50 cartões</div>
        <div>
				<Input 
        icon={
        <RxMagnifyingGlass size={24} />
      } 
        placeholder="Nome" />
        
        </div>
			</div>
		</>
	);
};

export default Cards;