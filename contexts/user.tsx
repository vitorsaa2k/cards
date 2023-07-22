import { UserType } from "@/types/api";
import { ReactNode, createContext, useEffect, useState } from "react";

const initialUser: UserType = {
	cpf: "",
	createdAt: "",
	email: "",
	emailVerified: "",
	hashedPassword: "",
	id: "",
	name: "",
	updatedAt: "",
	phone: "",
};

async function triggerUpdate(user: UserType) {}

const UserContext = createContext({ ...initialUser, triggerUpdate });

export function UserProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserType>(initialUser);
	async function triggerUpdate(user: UserType) {
		setUser(user);
		localStorage.setItem("user", JSON.stringify(user));
	}

	useEffect(() => {
		if (localStorage.getItem("user")) {
			setUser(JSON.parse(localStorage.getItem("user")!));
		}
	}, []);

	return (
		<UserContext.Provider value={{ ...user!, triggerUpdate }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
