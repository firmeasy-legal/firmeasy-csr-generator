import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { GenerateCSR } from "./components/GenerateCSRForm";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<main className="p-8">
				<Header />
				<h1 className="text-primary font-bold text-2xl text-center my-4">
					Generador de CSR
				</h1>
				<GenerateCSR />
			</main>
		</ThemeProvider>
	);
}

export default App;
