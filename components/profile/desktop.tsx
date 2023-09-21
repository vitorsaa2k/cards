import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { getUser, updateUser } from "@/actions/user";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { ScreenLoading } from "../common/loading";
import { useRouter } from "next/navigation";
import UserContext from "@/contexts/user";
import { UserType } from "@/types/api";
import { FieldValues, useForm } from "react-hook-form";

export function DesktopProfile() {
	const [wasCalled, setWasCalled] = useState(false);
	const { push } = useRouter();
	const {
		data: session,
		update,
		status,
	} = useSession({
		required: true,
		onUnauthenticated() {
			wasCalled ? null : push("/auth");
			setWasCalled(true);
		},
	});

	const userContext = useContext(UserContext);

	const { register, handleSubmit, unregister } = useForm<FieldValues>({
		mode: "onBlur",
	});

	const userQuery = useQuery(
		["user"],
		() => getUser("email", userContext.email),
		{
			initialData: userContext,
			refetchOnWindowFocus: false,
			enabled: userContext.email.length > 0,
		}
	);
	const [initialUser, setInitialUser] = useState(userQuery.data!);
	const [currentUser, setCurrentUser] = useState(userQuery.data!);
	const [isSubmiting, setIsSubmiting] = useState(false);

	const areUsersEqual =
		JSON.stringify(initialUser) === JSON.stringify(currentUser);

	useEffect(() => {
		setInitialUser(userQuery.data!);
		setCurrentUser(userQuery.data!);
	}, [userQuery.data]);
	console.log(userQuery);

	useEffect(() => {
		userQuery.refetch();
	}, [userContext, userQuery]);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		let { name, value } = e.currentTarget;
		setCurrentUser(prevState => ({
			...prevState,
			[name]: value,
		}));
	}

	async function submitUser() {
		setIsSubmiting(true);
		await updateUser("email", initialUser.email, currentUser)
			.then(async (res: UserType) => {
				setCurrentUser(res);
				setInitialUser(res);
				userContext.triggerUpdate(res);
				setIsSubmiting(false);
			})
			.catch(err => console.error(err));
	}

	if (status === "authenticated") {
		return (
			<div>
				<form className="p-3 flex flex-col gap-5">
					<label className="flex flex-col gap-1">
						Email:
						<Input
							register={register}
							value={currentUser?.email}
							name="email"
							type="email"
							onChange={handleChange}
						/>
					</label>
					<label className="flex flex-col gap-1">
						Nome:
						<Input
							register={register}
							value={currentUser?.name}
							name="name"
							type="text"
							onChange={handleChange}
						/>
					</label>
					<label className="flex flex-col gap-1">
						CPF:
						<Input
							register={register}
							value={currentUser?.cpf}
							name="cpf"
							type="cpf"
							onChange={handleChange}
						/>
					</label>
					<Button
						disabled={areUsersEqual}
						onClick={() => submitUser()}
						type="button"
					>
						{isSubmiting ? <ScreenLoading isSpinner /> : "Salvar"}
					</Button>
				</form>
			</div>
		);
	} else {
		return <div>Redirecting...</div>;
	}
}
