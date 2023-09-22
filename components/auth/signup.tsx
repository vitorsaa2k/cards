import { useContext, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { signUp } from "@/actions/cards";
import { VscMail } from "react-icons/vsc";
import { BsPhone } from "react-icons/bs";
import { RxPerson, RxLockClosed } from "react-icons/rx";
import { BsPersonVcard } from "react-icons/bs";
import { toast } from "react-toastify";
import { UserType } from "@/types/api";
import { signIn } from "next-auth/react";
import UserContext from "@/contexts/user";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CpfInput } from "../common/cpfInput";

export default function SignUp() {
	const [isCpf, setIsCpf] = useState(false);
	const user = useContext(UserContext);

	const { register, handleSubmit, unregister } = useForm<FieldValues>({
		mode: "onBlur",
	});

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		await signUp({
			cpf: data.cpf,
			email: data.email,
			name: data.name,
			password: data.password,
			phone: data.phone,
		})
			.then((response: { user: UserType | null; error: string | null }) => {
				if (!response.error && response.user) {
					toast.success("Conta Criada!");
					user.triggerUpdate(response.user);
					signIn("credentials", {
						...data,
						callbackUrl: "/cards",
					});
				} else {
					toast.error(response.error);
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
				<label>
					Nome
					<Input
						register={register}
						icon={<RxPerson size={24} />}
						placeholder="Nome"
						name="name"
					/>
				</label>
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
					Telefone
					<Input
						register={register}
						icon={<BsPhone size={24} />}
						name="phone"
						placeholder="Número de telefone"
					/>
				</label>
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
				<Button type="submit">Criar conta</Button>
			</form>
		</>
	);
}
