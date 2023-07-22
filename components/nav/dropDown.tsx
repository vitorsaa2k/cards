import { Button } from "../common/button";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import UserContext from "@/contexts/user";
import Link from "next/link";

export function DropDown() {
	const user = useContext(UserContext);
	return (
		<div className="absolute right-[10px] bg-black/25 flex flex-col p-3 rounded-md">
			<div>
				{user.email.indexOf("@") === -1 ? (
					<p className="flex gap-3">
						Email Não registrado
						<Link className="underline" href={"/userprofile"}>
							registrar
						</Link>
					</p>
				) : (
					<>
						<p>{user.email}</p>
						<Link className="underline" href={"/userprofile"}>
							registrar
						</Link>
					</>
				)}
			</div>
			<div>
				<Button
					onClick={() => {
						localStorage.removeItem("user");
						signOut();
					}}
				>
					Sair
				</Button>
			</div>
		</div>
	);
}
