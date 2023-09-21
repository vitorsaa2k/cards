import { useState, useEffect } from "react";
import { Input } from "@/components/common/input";
import { RxMagnifyingGlass } from "react-icons/rx";
import { TableRow } from "@/components/cards/tableRow";
import { CardType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { getCards, searchCardOnDB } from "@/actions/cards";
import { AddCardButton } from "@/components/cards/addCardButton";
import { useDebounce } from "@/hooks/useDebounce";
import Skeleton from "react-loading-skeleton";
import { FieldValues, useForm } from "react-hook-form";

function Card() {
	const cardsQuery = useQuery<CardType[]>(["cards"], getCards);
	const [cards, setCards] = useState(cardsQuery.data);

	async function searchOnDB(name: string) {
		setCards([]);
		await searchCardOnDB(name).then(res => setCards(res));
	}

	const { register, handleSubmit, unregister } = useForm<FieldValues>({
		mode: "onBlur",
	});

	const debounceSearch = useDebounce(searchOnDB, 500);

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
			<div className="">
				<div className="p-14 flex flex-col">
					<h1 className="text-6xl">Cartões</h1>
					<div className="text-2xl">
						{`Cartões Registrados: ${
							cardsQuery.data?.length ? cardsQuery.data?.length : "0"
						}`}
					</div>
				</div>
				<div className="flex justify-end p-4">
					<AddCardButton />
				</div>
				<div></div>
				<div className="p-5">
					<Input
						register={register}
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
					{cards?.length === 0 ? (
						<Skeleton height={50} count={3} />
					) : (
						cardsComponent || <Skeleton height={50} count={5} />
					)}
				</div>
			</div>
		</>
	);
}

export default Card;
