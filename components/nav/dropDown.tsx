import { Session } from "next-auth";
import { Button } from "../common/button";
import { signOut } from "next-auth/react";

export function DropDown({ session }: { session: Session }) {
	return (
		<div className="absolute right-[10px] bg-black/25 flex flex-col p-3 rounded-md">
			<p>{session.user?.email}</p>
			<div>
				<Button onClick={() => signOut()}>Sair</Button>
			</div>
		</div>
	);
}
