import { useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { Modal } from "../common/modal";
import { RegisterCard } from "./registerCard";

export function AddCardButton() {
	const [isShowing, setIsShowing] = useState(false);

	return (
		<div className="w-44">
			<button
				className="flex items-center justify-center bg-slate-500 text-white p-2 rounded-lg gap-2"
				onClick={e => setIsShowing(prevState => !prevState)}
			>
				Adicionar Cartão
				<RiAddCircleLine size={20} />
			</button>
			<Modal isShowing={isShowing} toggle={() => setIsShowing(false)}>
				<RegisterCard toggle={() => setIsShowing(false)} />
			</Modal>
		</div>
	);
}
