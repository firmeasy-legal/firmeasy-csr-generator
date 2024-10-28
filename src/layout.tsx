import "./globals.css";

import { Header } from "./components/Header";
import { ReactNode } from "react";
import { ThemeProvider } from "./components/theme-provider";
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
			<Header className="p-8 max-w-screen-xl mx-auto" />
			<main className={cn("px-8 pt-2 pb-8 max-w-screen-xl mx-auto", className)}>
				{children}
			</main>
			<Toaster richColors />
		</ThemeProvider>
	)
}