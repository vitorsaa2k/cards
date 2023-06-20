import { SignIn } from "@/components/auth/signIn";
import SignUp from "@/components/auth/signup";
import { useState } from "react";

function Auth() {
	const [isSignIn, setIsSignIn] = useState(true);

	function flipState() {
		setIsSignIn(prevState => !prevState);
	}

	return (
		<div className="flex justify-center">
			<div className="flex flex-col gap-2 justify-center items-center h-screen">
				{isSignIn ? <SignIn /> : <SignUp />}
				{isSignIn ? (
					<p>
						Ainda não tem uma conta?{" "}
						<span
							className="cursor-pointer text-blue-600 underline"
							onClick={flipState}
						>
							Criar conta
						</span>
					</p>
				) : (
					<p>
						Já tem uma conta?{" "}
						<span
							className="cursor-pointer text-blue-600 underline"
							onClick={flipState}
						>
							Entrar
						</span>
					</p>
				)}
			</div>
		</div>
	);
}

export default Auth;
