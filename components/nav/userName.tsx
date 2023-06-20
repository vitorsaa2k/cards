import { UserNameType } from "@/types/components";
import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { DropDown } from "./dropDown";

export function UserName({ session }: UserNameType) {
	const [isShowing, setIsShowing] = useState(false);
	return (
		<>
			<div
				onClick={() => setIsShowing(prevState => !prevState)}
				className="flex gap-1 hover:cursor-pointer"
			>
				<p>{session.user?.name}</p>
				<VscTriangleDown size={24} />
			</div>
			{isShowing ? <DropDown session={session} /> : null}
		</>
	);
}
