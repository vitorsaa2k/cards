import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { signUp } from "@/actions/cards";
import { VscMail } from "react-icons/vsc";
import { BsPhone } from "react-icons/bs";
import { RxPerson, RxLockClosed } from "react-icons/rx";
import { BsPersonVcard } from "react-icons/bs";
import { formatCpf } from "@/actions/common";
import { toast } from "react-toastify";
import { UserType } from "@/types/api";
import { signIn } from "next-auth/react";
import UserContext from "@/contexts/user";
import { FieldValues, useForm } from "react-hook-form";

export default function SignUp() {
	const [isCpf, setIsCpf] = useState(false);
	const [credencials, setCredentials] = useState({
		cpf: "",
		email: "",
		password: "",
		name: "",
		phone: "",
	});
	const user = useContext(UserContext);

	useEffect(() => {
		if (isCpf) {
			setCredentials(prevState => ({
				...prevState,
				email: "",
			}));
		} else {
			setCredentials(prevState => ({
				...prevState,
				cpf: "",
			}));
		}
	}, [isCpf]);

	const { register, handleSubmit, unregister } = useForm<FieldValues>({
		mode: "onBlur",
	});

	async function createUser() {
		await signUp(credencials)
			.then((response: { user: UserType | null; error: string | null }) => {
				if (!response.error && response.user) {
					toast.success("Conta Criada!");
					user.triggerUpdate(response.user);
					signIn("credentials", {
						...credencials,
						callbackUrl: "/cards",
					});
				} else {
					toast.error(response.error);
				}
			})
			.catch(error => console.log(error));
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		let { name, value } = e.currentTarget;
		if (name === "cpf") {
			value = formatCpf(value, credencials.cpf);
		}
		setCredentials(prevState => ({
			...prevState,
			[name]: value,
		}));
	}
	return (
		<>
			<form className="flex flex-col gap-2">
				<label>
					Nome
					<Input
						register={register}
						icon={<RxPerson size={24} />}
						placeholder="Nome"
						name="name"
						onChange={handleChange}
						value={credencials.name}
					/>
				</label>

				<label>
					{isCpf ? (
						<>
							CPF
							<Input
								register={register}
								icon={<BsPersonVcard size={22} />}
								onChange={handleChange}
								name="cpf"
								placeholder="CPF"
								value={credencials.cpf}
							/>
						</>
					) : (
						<>
							Email
							<Input
								register={register}
								icon={<VscMail size={24} />}
								onChange={handleChange}
								name="email"
								placeholder="Email"
								value={credencials.email}
							/>
						</>
					)}
				</label>
				<Button type="button" onClick={e => setIsCpf(!isCpf)}>
					{isCpf ? "Usar Email" : "Usar CPF"}
				</Button>
				<label>
					Telefone
					<Input
						register={register}
						icon={<BsPhone size={24} />}
						value={credencials.phone}
						onChange={handleChange}
						name="phone"
						placeholder="Número de telefone"
					/>
				</label>
				<label>
					Senha
					<Input
						register={register}
						icon={<RxLockClosed size={24} />}
						onChange={handleChange}
						name="password"
						type="password"
						placeholder="Senha"
						value={credencials.password}
					/>
				</label>
				<Button type="button" onClick={createUser}>
					Criar conta
				</Button>
			</form>
		</>
	);
}
