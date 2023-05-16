import { Oval } from "react-loader-spinner";

export function ScreenLoading() {
	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center gap-1">
			Carregando...
			<Oval
				height={30}
				width={30}
				color="#4fa94d"
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="#4fa94d"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</div>
	);
}
