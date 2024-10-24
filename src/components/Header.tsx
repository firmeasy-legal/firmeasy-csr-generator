import { ModeToggle } from "./mode-toggle"
import { useTheme } from "./theme-provider"

type Props = {

}

function NavigationLink({ href, children }: { href: string, children: React.ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			className="block w-full text-center sm:w-auto text-base font-semibold transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:underline underline-offset-4">
			{children}
		</a>
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
				<NavigationLink href="https://girasol.pe/casos-de-uso">Casos de Uso</NavigationLink>
				<NavigationLink href="https://girasol.pe/partners">Partners</NavigationLink>
				<NavigationLink href="https://girasol.pe/soporte">Soporte</NavigationLink>
				<NavigationLink href="https://firmeasy.legal">FirmEasy</NavigationLink>
			</nav>
			<ModeToggle />
		</header>
	)
}