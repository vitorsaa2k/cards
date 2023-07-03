import { useContext, useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
import { DropDown } from "./dropDown";
import { animated, useTransition } from "@react-spring/web";
import UserContext from "@/contexts/user";

export function UserName() {
	const [isShowing, setIsShowing] = useState(false);
	const user = useContext(UserContext);
	const transition = useTransition(isShowing, {
		from: { opacity: 0, y: 0 },
		enter: { opacity: 1, y: 10 },
		leave: { opacity: 0, y: 0 },
		config: { mass: 1, tession: 300, friction: 20 },
	});
	return (
		<>
			<button
				onClick={() => setIsShowing(prevState => !prevState)}
				className="flex gap-1 hover:cursor-pointer"
			>
				{user?.name}
				<VscTriangleDown size={24} />
			</button>
			{transition((style, item) =>
				item ? (
					<animated.div style={style}>
						<DropDown />
					</animated.div>
				) : null
			)}
		</>
	);
}
