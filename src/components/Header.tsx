import { InfoIcon, KeyRoundIcon } from "lucide-react"

import { GithubIcon } from "./icons/github"
import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { ReactNode } from "react"
import { useTheme } from "./theme-provider"

type Props = {

}

function NavigationLink({
	href,
	children,
	external = false,
}: {
	href: string,
	children: ReactNode,
	external?: boolean,
}) {
	const className = "flex items-center gap-1 w-full text-center sm:w-auto text-base font-semibold transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:underline underline-offset-4"
	if (external) {
		return (
			<a
				href={href}
				target="_blank"
				className={className}>
				{children}
			</a>
		)
	}

	return (
		<Link
			to={href}
			className={className}
			viewTransition
		>
			{children}
		</Link>
	)
}

export function Header({ }: Props) {
	const { theme } = useTheme()

	return (
		<header className="w-full flex gap-4 items-center box-border" >
			<a href="https://girasol.pe" target="_blank">
				<img src="/logo-girasol.png" alt="Logo Girasol PE" className="block h-11 transition-[filter] duration-300" style={
					theme !== "light" ? { filter: "brightness(0) invert(1)" } : {}} />
			</a>
			<picture className="block">
				<img src="/verified-by-sunat.svg" className="h-7" alt="Verificados por SUNAT" />
			</picture>
			<nav className="flex-1 flex flex-wrap justify-evenly">
				<NavigationLink href="/about" >
					<InfoIcon className="w-4 h-4 flex-shrink-0" />
					Acerca
				</NavigationLink>
				<NavigationLink href="/" >
					<KeyRoundIcon className="w-4 h-4 flex-shrink-0" />
					Generar CSR
				</NavigationLink>
				<NavigationLink href="https://girasol.pe/casos-de-uso" external>Casos de Uso</NavigationLink>
				<NavigationLink href="https://girasol.pe/partners" external>Partners</NavigationLink>
				<NavigationLink href="https://girasol.pe/soporte" external>Soporte</NavigationLink>
				<NavigationLink href="https://firmeasy.legal" external>FirmEasy</NavigationLink>
			</nav>
			<div className="flex items-center gap-1">
				<a
					href="https://github.com/firmeasy-legal/firmeasy-csr-generator"
					className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-2"
					target="_blank"
				>
					<GithubIcon className="block w-6 h-5" />
				</a>
				<ModeToggle />
			</div>
		</header>
	)
}