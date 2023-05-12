import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import { RxMagnifyingGlass } from "react-icons/rx";
import { TableRow } from "@/components/cards/tableRow";
import { Button } from "@/components/common/button";
import { CardType } from "@/types/api";
import { Modal } from "@/components/common/modal";
import { RegisterCard } from "@/components/cards/registerCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { addCard, getCard } from "@/actions/cards";

function Card() {
	const cardsQuery = useQuery<CardType[]>(["cards"], getCard);
	const cardsMutation = useMutation((card: CardType) => addCard(card));
	const [cards, setCards] = useState(cardsQuery.data);
	const [name, setName] = useState("");
	const [isShowing, setIsShowing] = useState(false);

	useEffect(() => {
		setCards(cardsQuery.data);
	}, [cardsQuery.data]);

	const cardsComponent = cards?.map((card: CardType) => {
		const parseUpdated = card?.updatedAt?.split("T")[0].split("-").join("/");
		return (
			<TableRow
				key={card.id}
				name={card.name}
				cpf={card.cpf}
				updatedAt={parseUpdated}
			/>
		);
	});

	return (
		<>
			<div className='text-white'>
				<h1>Cards</h1>
				<div>
					{cards?.length! > 1 ? `${cards?.length} Cartões` : `1 Cartão`}
				</div>
				<div>
					<Input
						onChange={e => setName(e.currentTarget.value)}
						icon={<RxMagnifyingGlass className='text-black' size={24} />}
						placeholder='Name'
					/>
				</div>
				<div>
					<Button onClick={e => setIsShowing(prevState => !prevState)}>
						Adicionar Cartão
					</Button>
					<Modal isShowing={isShowing} toggle={() => setIsShowing(false)}>
						<RegisterCard toggle={() => setIsShowing(false)} />
					</Modal>
					<TableRow
						name='Nome'
						cpf='CPF'
						updatedAt='Atualizado Em'
						status='Status'
					/>
					{cardsComponent}
				</div>
			</div>
		</>
	);
}

export default Card;
