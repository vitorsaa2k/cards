import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/common/header";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const queryClient = new QueryClient();

const inter = Inter({
	subsets: ["latin"],
	weight: "400",
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<main className={`${inter.className}, text-white`}>
			<Head>
				<title>Cards App</title>
			</Head>
			<SessionProvider session={session}>
				<QueryClientProvider client={queryClient}>
					<Header />
					<Component {...pageProps} />
				</QueryClientProvider>
			</SessionProvider>
		</main>
	);
}
