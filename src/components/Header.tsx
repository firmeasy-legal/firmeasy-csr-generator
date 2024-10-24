import { useTheme } from "./theme-provider"

type Props = {

}

export function Header({ }: Props) {
	const { theme } = useTheme()

	return (
		<header className="w-full p-6 flex gap-4 items-center box-border" >
			<a href="https://girasol.pe" target="_blank">
				<img src="/logo-girasol.png" alt="Logo Girasol PE" className="block h-12 transition-[filter] duration-300" style={
					theme !== "light" ? { filter: "brightness(0) invert(1)" } : {}} />
			</a>
			<picture className="block">
				<img src="/verified-by-sunat.svg" className="h-7" alt="Verificados por SUNAT" />
			</picture>
		</header>
	)
}