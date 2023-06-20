import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { signUp } from "@/actions/cards";
import { VscMail } from "react-icons/vsc";
import { RxPerson, RxLockClosed } from "react-icons/rx";
import { BsPersonVcard } from "react-icons/bs";
import { formatCpf } from "@/actions/common";
import { useRouter } from "next/navigation";

export default function SignUp() {
	const [isCpf, setIsCpf] = useState(false);
	const [credencials, setCredentials] = useState({
		cpf: "",
		email: "",
		password: "",
		name: "",
	});
	const { push } = useRouter();

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
			.then(response => {
				if (response) {
					push("/cards");
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
