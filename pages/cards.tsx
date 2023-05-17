import { useState, useEffect } from "react";
import { Input } from "@/components/input";
import { RxMagnifyingGlass } from "react-icons/rx";
import { TableRow } from "@/components/cards/tableRow";
import { CardType } from "@/types/api";
import { Modal } from "@/components/common/modal";
import { useQuery } from "@tanstack/react-query";
import { getCard } from "@/actions/cards";
import { AddCardButton } from "@/components/cards/addCardButton";

function Card() {
	const cardsQuery = useQuery<CardType[]>(["cards"], getCard);
	const [cards, setCards] = useState(cardsQuery.data);
	const [name, setName] = useState("");

	const filteredList = cardsQuery.data
		?.filter(value => value.name.toLowerCase().includes(name.toLowerCase()))
		?.map((card: CardType) => {
			const parseUpdated = card?.updatedAt?.split("T")[0].split("-").join("/");
			return (
				<TableRow
					key={card.id}
					id={card.id!}
					name={card.name}
					cpf={card.cpf}
					updatedAt={parseUpdated}
					wasDelivered={card.wasDelivered}
				/>
			);
		});
	console.log(filteredList);

	useEffect(() => {
		setCards(cardsQuery.data);
		console.log(cardsQuery.data);
	}, [cardsQuery.data]);

	const initialCards = cards?.map((card: CardType) => {
		const parseUpdated = card?.updatedAt?.split("T")[0].split("-").join("/");
		return (
			<TableRow
				key={card.id}
				id={card.id!}
				name={card.name}
				cpf={card.cpf}
				updatedAt={parseUpdated}
				wasDelivered={card.wasDelivered}
			/>
		);
	});

	const cardsComponent =
		filteredList?.length === 0 ? initialCards : filteredList;

	return (
		<>
			<div className="text-white">
				<h1>Cards</h1>
				<div>
					{cards?.length! > 1
						? `Cartões Registrados: ${cards?.length}`
						: `1 Cartão`}
					<div className="flex justify-end p-4">
						<AddCardButton />
					</div>
				</div>
				<div></div>
				<div className="p-5">
					<Input
						onChange={e => setName(e.currentTarget.value)}
						icon={<RxMagnifyingGlass className="text-slate-500" size={24} />}
						placeholder="Nome"
					/>
					<TableRow
						id=""
						name="Nome"
						cpf="CPF"
						updatedAt="Atualizado Em"
						wasDelivered="Status"
					/>
					{cardsComponent}
				</div>
			</div>
		</>
	);
}

export default Card;
