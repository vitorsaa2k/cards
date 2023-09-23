import { deleteCard, setDelivered } from "@/actions/cards";
import { TableRowType } from "@/types/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VscTrash, VscCheck } from "react-icons/vsc";
import { ScreenLoading } from "../common/loading";

export function TableRow({
	id,
	cpf,
	name,
	updatedAt,
	wasDelivered,
}: TableRowType) {
	const queryClient = useQueryClient();

	const mutateToDelete = useMutation((id: string) => deleteCard(id), {
		onSuccess: () => {
			queryClient.invalidateQueries(["cards"]);
		},
	});

	const mutateToDelivered = useMutation((id: string) => setDelivered(id), {
		onSuccess: () => {
			queryClient.invalidateQueries(["cards"]);
		},
	});

	return (
		<div className="grid grid-cols-4 items-center gap-2 border-b text-black m-1">
			<div className="p-4 h-full text-center">{name ?? null}</div>
			<div className="p-4 h-full text-center">
				{cpf?.length === 0 ? "Não informado" : cpf}
			</div>
			<div className="p-4 h-full text-center">{updatedAt ?? null}</div>

			{mutateToDelete.isLoading || mutateToDelivered.isLoading ? (
				<ScreenLoading />
			) : null}

			<div className="p-4 h-full text-center flex items-center justify-center gap-1">
				<>
					{wasDelivered !== "Status"
						? `${wasDelivered ? "Entregue" : "Na loja"}`
						: "Status"}
				</>

				<>
					{wasDelivered === "Status" ? null : (
						<button
							title="Deletar cartão"
							onClick={() => {
								mutateToDelete.mutate(id);
							}}
							className="rounded p-1 hover:bg-red-500 transition"
						>
							<VscTrash size={24} />
						</button>
					)}
				</>

				<>
					{wasDelivered === "Status" ? null : (
						<button
							title="Marcar cartão como entrege"
							onClick={() => mutateToDelivered.mutate(id)}
							className="rounded p-1 hover:bg-green-500 transition"
						>
							<VscCheck size={24} />
						</button>
					)}
				</>
			</div>
		</div>
	);
}
