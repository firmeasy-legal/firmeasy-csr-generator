import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/Header";
import { GenerateCSR } from "./components/GenerateCSRForm";

function App() {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<main className="p-8">
				<Header />
				<GenerateCSR />
			</main>
		</ThemeProvider>
	);
}

export default App;
