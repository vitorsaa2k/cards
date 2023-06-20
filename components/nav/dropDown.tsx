import { Session } from "next-auth";
import { Button } from "../common/button";
import { signOut } from "next-auth/react";

export function DropDown({ session }: { session: Session }) {
	return (
		<div className="absolute translate-y-[30px] translate-x-[-20px] bg-black/25 backdrop-blur-sm flex flex-col animate-dropDown p-3 rounded-md">
			<p>{session.user?.email}</p>
			<div>
				<Button onClick={() => signOut()}>Sair</Button>
			</div>
		</div>
	);
}
