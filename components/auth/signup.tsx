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

	async function register() {
		await signUp(credencials)
			.then((response: UserType) => {
				if (response) {
					toast.success("Conta Criada!");
					user.triggerUpdate(response);
					signIn("credentials", {
						...credencials,
						callbackUrl: "/cards",
					});
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
						icon={<RxLockClosed size={24} />}
						onChange={handleChange}
						name="password"
						type="password"
						placeholder="Senha"
						value={credencials.password}
					/>
				</label>
				<Button type="button" onClick={register}>
					Criar conta
				</Button>
			</form>
		</>
	);
}
