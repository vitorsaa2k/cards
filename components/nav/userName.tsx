import { UserNameType } from "@/types/components";
import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { DropDown } from "./dropDown";
import { animated, useTransition } from "@react-spring/web";

export function UserName({ session }: UserNameType) {
	const [isShowing, setIsShowing] = useState(false);
	const transition = useTransition(isShowing, {
		from: { opacity: 0, y: 0 },
		enter: { opacity: 1, y: 10 },
		leave: { opacity: 0, y: 0 },
		config: { mass: 1, tession: 300, friction: 20 },
	});
	return (
		<>
			<div
				onClick={() => setIsShowing(prevState => !prevState)}
				className="flex gap-1 hover:cursor-pointer"
			>
				<p>{session.user?.name}</p>
				<VscTriangleDown size={24} />
			</div>
			{transition((style, item) =>
				item ? (
					<animated.div style={style}>
						<DropDown session={session} />
					</animated.div>
				) : null
			)}
		</>
	);
}
