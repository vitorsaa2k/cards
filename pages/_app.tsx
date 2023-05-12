import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const inter = Inter({
	subsets: ["latin"],
	weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={inter.className}>
			<Head>
				<title>Cards App</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</main>
	);
}
