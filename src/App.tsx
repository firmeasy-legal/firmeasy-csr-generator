import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Header } from "./components/Header";

function App() {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	// async function greet() {
	//   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
	//   setGreetMsg(await invoke("greet", { name }));
	// }

	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<Header />
			<ModeToggle />
			<main className="container p-4">
				<h1>Welcome to Tauri + React</h1>

				<Button>Button</Button>
				<p>{greetMsg}</p>
			</main>
		</ThemeProvider>
	);
}

export default App;
