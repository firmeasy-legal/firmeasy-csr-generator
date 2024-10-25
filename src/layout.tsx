import "./globals.css";

import { ReactNode } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { Toaster } from "sonner";
import { cn } from "./lib/utils";

type Props = {
	children: ReactNode;
	className?: string;
}

export function Layout({
	children,
	className,
}: Props) {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<main className="p-8">
				<Header />
				<div className={cn("pt-10", className)}>
					{children}
				</div>
			</main>
			<Toaster richColors />
		</ThemeProvider>
	)
}