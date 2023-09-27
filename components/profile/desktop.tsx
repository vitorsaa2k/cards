import { useContext, useEffect, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { getUser, updateUser } from "@/actions/user";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { ScreenLoading } from "../common/loading";
import { useRouter } from "next/navigation";
import UserContext from "@/contexts/user";
import { UserType } from "@/types/api";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { CpfInput } from "../common/cpfInput";

export function DesktopProfile() {
	const { push } = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			push("/auth");
		},
	});
	const userContext = useContext(UserContext);
	const userQuery = useQuery(
		["user"],
		() => getUser("email", userContext.email),
		{
			initialData: userContext,
			refetchOnWindowFocus: false,
		}
	);

	const [initialUser, setInitialUser] = useState(userQuery.data!);

	const {
		register,
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<FieldValues>({
		mode: "onBlur",
		values: userContext,
	});

	const fields = useWatch({
		control,
	});

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		await updateUser("email", initialUser.email, {
			cpf: data.cpf,
			email: data.email,
			name: data.name,
			phone: data.phone,
		})
			.then(async (res: UserType) => {
				setInitialUser(res);
				userContext.triggerUpdate(res);
			})
			.catch(err => console.error(err));
	};

	const areUsersEqual = JSON.stringify(initialUser) === JSON.stringify(fields);

	useEffect(() => {
		setInitialUser(userQuery.data!);
	}, [userQuery.data]);

	useEffect(() => {
		userQuery.refetch();
	}, [initialUser, userQuery]);

	if (status === "authenticated") {
		return (
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="p-3 flex flex-col gap-5"
				>
					<label className="flex flex-col gap-1">
						Email:
						<Input register={register} name="email" type="email" />
					</label>
					<label className="flex flex-col gap-1">
						Nome:
						<Input register={register} name="name" type="text" />
					</label>
					<label className="flex flex-col gap-1">
						CPF:
						<CpfInput register={register} name="cpf" />
					</label>
					<Button disabled={areUsersEqual || isSubmitting} type="submit">
						{isSubmitting ? <ScreenLoading isSpinner /> : "Salvar"}
					</Button>
				</form>
			</div>
		);
	} else {
		return <div>Redirecting...</div>;
	}
}
