import { ChangeEvent, useState } from "react";
import { Input } from "../input";
import { Button } from "../common/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCard } from "@/actions/cards";
import { CardType } from "@/types/api";

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

	const numbersRegex = /^[0-9]+$/;

	function submitForm() {
		mutation.mutate(form);
	}

	function formatCpf(cpf: string) {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}

	function handleInputs(e: ChangeEvent<HTMLInputElement>) {
		let { name, value } = e.currentTarget;
		if (name === "cpf" && value.length > 0) {
			numbersRegex.test(value) ? (value = value) : (value = form.cpf);
			value = formatCpf(value);
		} else if (name === "cpf" && value.length === 0) {
			value = value = "";
		}
		setForm(prevForm => ({
			...prevForm,
			[name]: value,
		}));
	}

	return (
		<form className="p-2 flex gap-1 flex-col">
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
			<div className="flex gap-3">
				<Button onClick={submitForm} type="button">
					Enviar
				</Button>
				<Button onClick={toggle} type="button">
					Cancelar
				</Button>
			</div>
		</form>
	);
}
