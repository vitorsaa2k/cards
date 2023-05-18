import { InputType } from "@/types/components";
import { RxMagnifyingGlass } from "react-icons/rx";
import { IconBaseProps } from "react-icons/lib/esm/iconBase";

export function Input(props: InputType) {
	return (
		<label className='flex items-center gap-2 w-full bg-white border-2 py-2 text-black border-gray-400 rounded-lg'>
			<div className='ml-2'>{props.icon ?? null}</div>
			<input
				{...props}
				autoComplete='off'
				className='w-full outline-none bg-white border-gray-400 placeholder:text-gray-400'
			/>
		</label>
	);
}
