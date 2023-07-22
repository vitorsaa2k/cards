import { ButtonType } from "@/types/components";

export function Button(props: ButtonType) {
	return (
		<button
			className="w-full flex disabled:bg-slate-400 items-center justify-center bg-slate-500 text-white py-2 rounded-lg"
			{...props}
		>
			{props.children}
		</button>
	);
}
