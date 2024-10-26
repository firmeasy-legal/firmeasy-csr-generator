import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="p-2">
					<SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem disabled={theme === "light"} onClick={() => setTheme("light")}>
					<SunIcon className="w-5 h-5 flex-shrink-0" />
					Claro
				</DropdownMenuItem>
				<DropdownMenuItem disabled={theme === "dark"} onClick={() => setTheme("dark")}>
					<MoonIcon className="w-5 h-5 flex-shrink-0" />
					Oscuro
				</DropdownMenuItem>
				<DropdownMenuItem disabled={theme === "system"} onClick={() => setTheme("system")}>
					<LaptopIcon className="w-5 h-5 flex-shrink-0" />
					Sistema
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
