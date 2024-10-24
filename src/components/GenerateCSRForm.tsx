import { invoke } from "@tauri-apps/api/core";
import { Button } from "./ui/button"
import { useState } from "react";
import { ZapIcon } from "lucide-react";

export function GenerateCSR() {
	const [greetMsg, setGreetMsg] = useState("");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name: "Gustavo" }));
	}

	return (
		<Button className="mx-auto flex px-6 my-6" onClick={() => greet()}>
			<ZapIcon className="me-2 flex-shrink-0" />
			<span className="block text-xl leading-6">Generar CSR</span>
		</Button>
	)
}