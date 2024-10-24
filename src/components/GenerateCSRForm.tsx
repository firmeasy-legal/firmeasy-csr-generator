import { invoke } from "@tauri-apps/api/core";
import { Button } from "./ui/button"
import { useState } from "react";

type Props = {

}

export function GenerateCSR({ }: Props) {
	const [greetMsg, setGreetMsg] = useState("");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
		setGreetMsg(await invoke("greet", { name: "Gustavo" }));
	}

	return (
		<Button onClick={() => greet()}>
			Generar CSR {greetMsg}
		</Button>
	)
}