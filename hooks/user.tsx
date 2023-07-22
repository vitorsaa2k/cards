import { getUser } from "@/actions/user";
import { UserType } from "@/types/api";
import { useSession } from "next-auth/react";
import {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";

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

async function triggerUpdate(email: string) {}

const UserContext = createContext({ ...initialUser, triggerUpdate });

export function UserProvider({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<UserType>(initialUser);
	const [isLoading, setIsLoading] = useState(true);
	async function triggerUpdate(email: string) {
		await getUser(email).then(data => {
			setUser(data);
		});
	}
	const get = useCallback(
		async () =>
			getUser(session?.user?.email!).then(data => {
				setUser(data);
				setIsLoading(false);
				return data;
			}),
		[session]
	);

	useEffect(() => {
		isLoading ? get() : null;
	}, [isLoading, get]);
	return (
		<UserContext.Provider value={{ ...user!, triggerUpdate }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
