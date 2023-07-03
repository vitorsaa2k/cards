import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserName } from "./userName";
import { UserProvider } from "@/contexts/user";

export function Header() {
	const { status } = useSession();
	return (
		<nav className="p-4 bg-slate-500 flex items-center justify-between text-white gap-2">
			<div>
				<Link className="hover:bg-black/30 px-2 py-1 rounded" href={"/"}>
					Início
				</Link>
				<Link className="hover:bg-black/30 px-2 py-1 rounded" href={"/cards"}>
					Cartões
				</Link>
			</div>
			<div>
				{status === "authenticated" ? (
					<UserProvider>
						<UserName />
					</UserProvider>
				) : (
					<Link className="hover:bg-black/30 px-2 py-1 rounded" href={"/auth"}>
						Log in
					</Link>
				)}
			</div>
		</nav>
	);
}
