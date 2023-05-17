import { Oval } from "react-loader-spinner";

export function ScreenLoading({ isSpinner }: { isSpinner?: boolean }) {
	return (
		<>
			{isSpinner ? (
				<div className="flex items-center justify-center">
					<Oval
						height={24}
						width={24}
						color="#fff"
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#fff"
						strokeWidth={3}
						strokeWidthSecondary={3}
					/>
				</div>
			) : (
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 flex justify-center items-center gap-1">
					Carregando...
					<Oval
						height={30}
						width={30}
						color="#fff"
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#fff"
						strokeWidth={3}
						strokeWidthSecondary={3}
					/>
				</div>
			)}
		</>
	);
}
