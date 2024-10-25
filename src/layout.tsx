import "./globals.css";

import { ReactNode } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { Toaster } from "sonner";

type Props = {
	children: ReactNode;
}

export function Layout({ children }: Props) {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<main className="p-8">
				<Header />
				{children}
			</main>
			<Toaster richColors />
		</ThemeProvider>
	)
}