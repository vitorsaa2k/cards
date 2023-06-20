import { InputType } from "@/types/components";

export function Input(props: InputType) {
	return (
		<label className="flex items-center transition-all gap-2 w-full bg-transparent ring-1 border-slate-500 py-2 text-black focus-within:ring-2 ring-slate-500 rounded-lg">
			{props.icon ? <div className="ml-2">{props.icon}</div> : null}
			<input
				{...props}
				autoComplete="off"
				className="w-full outline-none p-1 bg-transparent placeholder:text-black"
			/>
		</label>
	);
}
