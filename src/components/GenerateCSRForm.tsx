import { invoke } from "@tauri-apps/api/core";
import { Button } from "./ui/button"
import { KeyIcon, LoaderIcon, ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

type GeneratedPrivateKeyWithCSR = {
	base64_private_key_pem: string,
	base64_csr_pem: string,
}

type PrivateKeyWithCSR = {
	privateKeyPem: string,
	csrPem: string,
}

export function GenerateCSR() {
	//! useTransition doesn't work with Tauri yet
	// const [isGenerating, startGeneration] = useTransition();
	const [isGenerating, setIsGenerating] = useState(false);
	const [result, setResult] = useState<PrivateKeyWithCSR | null>(null);

	async function generateCSR() {
		setIsGenerating(true);
		await new Promise(resolve => setTimeout(resolve, 150));
		const response = await invoke<GeneratedPrivateKeyWithCSR>("generate_csr")
			.catch(error => {
				console.error(error);
				setIsGenerating(false);
			})

		if (!response) return;

		setResult({
			privateKeyPem: response.base64_private_key_pem,
			csrPem: response.base64_csr_pem,
		});

		setIsGenerating(false);
	}

	return (
		<section>
			<div className="flex justify-between">
				<Button
					disabled={isGenerating}
					className="flex px-6 mt-10 mb-6 dark:text-gray-100 hover:dark:text-gray-50"
					onClick={generateCSR}
				>
					{
						isGenerating
							? <LoaderIcon className="w-5 h-5 me-2 flex-shrink-0 animate-spin" />
							: <ZapIcon className="w-5 h-5 me-2 flex-shrink-0" />
					}
					<span className="block text-lg leading-6">Generar CSR</span>
				</Button>
				<Button
					className="bg-[hsl(247,94%,19%)] dark:bg-[hsl(247,94%,30%)] hover:dark:dark:bg-[hsl(247,94%,25%)] flex px-6 mt-10 mb-6 dark:text-gray-100 hover:dark:text-gray-50"
					disabled={!result}
				>
					<KeyIcon className="w-5 h-5 me-2 flex-shrink-0" />
					<span className="block text-lg leading-6">Descargar Private Key</span>
				</Button>
			</div>
			<Textarea
				className="font-mono h-[60dvh] text-base resize-none overflow-y-auto"
				placeholder="Tu CSR aparecerá aquí"
				value={result?.csrPem ?? ""}
				contentEditable={false}
			/>
		</section>
	)
}