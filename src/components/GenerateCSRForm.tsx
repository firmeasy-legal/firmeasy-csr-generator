import { invoke } from "@tauri-apps/api/core";
import { Button } from "./ui/button"
import { useState } from "react";
import { DownloadIcon, KeyIcon, ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

export function GenerateCSR() {
	const [greetMsg, setGreetMsg] = useState("");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name: "Gustavo" }));
	}

	return (
		<section>
			<div className="flex justify-between">
				<Button
					className="flex px-6 mt-10 mb-6 dark:text-gray-100 hover:dark:text-gray-50" onClick={() => greet()}
				>
					<ZapIcon className="w-5 h-5 me-2 flex-shrink-0" />
					<span className="block text-lg leading-6">Generar CSR</span>
				</Button>
				<Button
					className="bg-[hsl(247,94%,19%)] dark:bg-[hsl(247,94%,30%)] hover:dark:dark:bg-[hsl(247,94%,25%)] flex px-6 mt-10 mb-6 dark:text-gray-100 hover:dark:text-gray-50" disabled onClick={() => greet()}
				>
					<KeyIcon className="w-5 h-5 me-2 flex-shrink-0" />
					<span className="block text-lg leading-6">Descargar Private Key</span>
				</Button>
			</div>
			<Textarea className="font-mono h-[60dvh] text-base resize-none overflow-y-auto" placeholder="Tu CSR aparecerá aquí" />
		</section>
	)
}