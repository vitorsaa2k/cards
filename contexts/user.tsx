import { getUser } from "@/actions/common";
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
};

const UserContext = createContext<UserType>(initialUser);

export function UserProvider({ children }: { children: ReactNode }) {
	const { data: session, status } = useSession();
	const [user, setUser] = useState<UserType>(initialUser);
	const [isLoading, setIsLoading] = useState(true);
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
	return <UserContext.Provider value={user!}>{children}</UserContext.Provider>;
}

export default UserContext;
