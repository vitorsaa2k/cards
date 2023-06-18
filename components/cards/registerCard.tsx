import { ChangeEvent, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCard } from "@/actions/cards";
import { CardType } from "@/types/api";
import { ScreenLoading } from "../common/loading";
import { formatCpf } from "@/actions/common";

export function RegisterCard({ toggle }: { toggle: () => void }) {
	const queryClient = useQueryClient();
	const [form, setForm] = useState({
		name: "",
		cpf: "",
	});

	const mutation = useMutation((card: CardType) => addCard(card), {
		onSuccess: () => {
			queryClient.invalidateQueries(["cards"]);
			toggle();
		},
	});

	function submitForm() {
		mutation.mutate(form);
	}

	function handleInputs(e: ChangeEvent<HTMLInputElement>) {
		let { name, value } = e.currentTarget;
		if (name === "cpf" && value.length > 0) {
			value = formatCpf(value, form.cpf);
		}
		setForm(prevForm => ({
			...prevForm,
			[name]: value,
		}));
	}

	return (
		<>
			<form className="p-2 gap-2 flex flex-col justify-between">
				<div className="text-2xl">Adicionar cartão</div>
				<Input
					name="name"
					placeholder="Digite o nome"
					value={form.name}
					onChange={handleInputs}
				/>
				<Input
					name="cpf"
					placeholder="Digite o CPF"
					value={form.cpf}
					onChange={handleInputs}
				/>
				<div className="flex max-h-10 gap-3">
					<Button onClick={submitForm} type="button">
						{mutation.isLoading ? <ScreenLoading isSpinner /> : "Enviar"}
					</Button>
					<Button onClick={toggle} type="button">
						Cancelar
					</Button>
				</div>
			</form>
		</>
	);
}
