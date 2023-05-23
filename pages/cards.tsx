import { useState, useEffect } from "react";
import { Input } from "@/components/common/input";
import { RxMagnifyingGlass } from "react-icons/rx";
import { TableRow } from "@/components/cards/tableRow";
import { CardType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { getCard } from "@/actions/cards";
import { AddCardButton } from "@/components/cards/addCardButton";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";

function Card() {
	const cardsQuery = useQuery<CardType[]>(["cards"], getCard);
	const [cards, setCards] = useState(cardsQuery.data);

	const debounceSearch = useDebounce(searchOnDB, 500);

	async function searchOnDB(name: string) {
		await axios.post("/api/card/search", { name }).then(response => {
			setCards(response.data);
		});
	}
	useEffect(() => {
		setCards(cardsQuery.data);
	}, [cardsQuery.data]);

	const cardsComponent = cards?.map((card: CardType) => {
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

	return (
		<>
			<div className="text-white">
				<div className="p-14 flex flex-col">
					<h1 className="text-6xl">Cartões</h1>
					<div className="text-2xl">
						{`Cartões Registrados: ${cards?.length}`}
					</div>
				</div>
				<div className="flex justify-end p-4">
					<AddCardButton />
				</div>
				<div></div>
				<div className="p-5">
					<Input
						onChange={e => debounceSearch(e.currentTarget.value)}
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
