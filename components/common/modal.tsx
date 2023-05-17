import { ModalType } from "@/types/components";
import { useEffect, useState } from "react";

export function Modal({ isShowing, toggle, children }: ModalType) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 100);
	}, []);

	return (
		<>
			{isShowing ? (
				<div
					onClick={toggle}
					className="absolute animate-opacityUp bg-black/40 flex justify-center items-center w-full h-full right-0 left-0 bottom-0 top-0"
				>
					<div
						onClick={e => {
							e.stopPropagation();
						}}
						className="animate-slideUp bg-slate-400 min-w-[500px] flex flex-col justify-arround rounded-lg"
					>
						{children}
					</div>
				</div>
			) : null}
		</>
	);
}
