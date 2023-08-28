import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { Input } from "../common/input";
import { Button } from "../common/button";
import { signIn } from "next-auth/react";
import { VscMail } from "react-icons/vsc";
import { RxLockClosed } from "react-icons/rx";
import { BsPersonVcard } from "react-icons/bs";
import { formatCpf } from "@/actions/common";
import { getUser } from "@/actions/user";
import UserContext from "@/contexts/user";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function SignIn() {
	const [isCpf, setIsCpf] = useState(false);
	const [credencials, setCredentials] = useState({
		cpf: "",
		email: "",
		password: "",
	});
	const user = useContext(UserContext);
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

	async function logIn() {
		const res = await signIn("credentials", {
			redirect: false,
			...credencials,
			callbackUrl: "/cards",
		}).then(async data => {
			if (!data?.error) {
				toast.success("Login efetuado!");
				const newUser = async () => {
					if (isCpf) {
						return await getUser("cpf", credencials.cpf);
					} else {
						return await getUser("email", credencials.email);
					}
				};
				console.log(await newUser());
				user.triggerUpdate(await newUser());
				push("/userprofile");
			} else {
				toast.error(data.error);
			}
			console.log(data);
		});
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
				<Button
					type="button"
					onClick={e => {
						setIsCpf(!isCpf);
					}}
				>
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
				<Button type="button" onClick={logIn}>
					Entrar
				</Button>
			</form>
		</>
	);
}
