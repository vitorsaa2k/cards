import { useContext, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { CpfInput } from "../common/cpfInput";
import { signIn } from "next-auth/react";
import { VscMail } from "react-icons/vsc";
import { RxLockClosed } from "react-icons/rx";
import { BsPersonVcard } from "react-icons/bs";
import { getUser } from "@/actions/user";
import UserContext from "@/contexts/user";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { ScreenLoading } from "../common/loading";

export function SignIn() {
	const [isCpf, setIsCpf] = useState(false);
	const user = useContext(UserContext);
	const { push } = useRouter();

	const {
		register,
		handleSubmit,
		unregister,
		formState: { isSubmitting },
	} = useForm<FieldValues>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<FieldValues> = async data => {
		const res = await signIn("credentials", {
			redirect: false,
			...data,
			callbackUrl: "/cards",
		}).then(async res => {
			if (!res?.error) {
				toast.success("Login efetuado!");
				const newUser = async () => {
					if (isCpf) {
						return await getUser("cpf", data.cpf);
					} else {
						return await getUser("email", data.email);
					}
				};
				user.triggerUpdate(await newUser());
				push("/userprofile");
			} else {
				toast.error(res.error);
			}
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
				<label>
					{isCpf ? (
						<>
							CPF
							<CpfInput
								register={register}
								icon={<BsPersonVcard size={22} />}
								name="cpf"
								placeholder="CPF"
							/>
						</>
					) : (
						<>
							Email
							<Input
								register={register}
								icon={<VscMail size={24} />}
								name="email"
								placeholder="Email"
							/>
						</>
					)}
				</label>
				<Button
					type="button"
					onClick={e => {
						isCpf ? unregister("cpf") : unregister("email");
						setIsCpf(!isCpf);
					}}
				>
					{isCpf ? "Usar Email" : "Usar CPF"}
				</Button>
				<label>
					Senha
					<Input
						register={register}
						icon={<RxLockClosed size={24} />}
						name="password"
						type="password"
						placeholder="Senha"
					/>
				</label>
				<Button disabled={isSubmitting} type="submit">
					{isSubmitting ? <ScreenLoading isSpinner /> : "Entrar"}
				</Button>
			</form>
		</>
	);
}
