import { useTheme } from "./theme-provider"

type Props = {

}

export function Header({ }: Props) {
	const { theme } = useTheme()

	return (
		<header className="w-full p-4">
			<a href="https://girasol.pe" target="_blank">
				<img src="/logo-girasol.png" alt="Tauri Logo" className="h-10 transition-[filter] duration-300" style={
					theme !== "light" ? { filter: "brightness(0) invert(1)" } : {}} />
			</a>
		</header>
	)
}