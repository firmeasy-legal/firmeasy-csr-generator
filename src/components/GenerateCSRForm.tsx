import { invoke } from "@tauri-apps/api/core";
import { Button } from "./ui/button"
import { KeyIcon, LoaderIcon, ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

type GeneratedPrivateKeyWithCSR = {
	base64_private_key_pem: string,
	base64_csr_pem: string,
}

type GenerationError = {
	message: string,
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
			.catch((error: GenerationError) => {
				toast.error("Ocurrió un error al intentar generar el CSR", {
					description: error.message,
					closeButton: true,
				})
				setIsGenerating(false);
			})

		if (!response) return;

		const privateKeyPem = globalThis.atob(response.base64_private_key_pem);
		const csrPem = globalThis.atob(response.base64_csr_pem);

		setResult({
			privateKeyPem,
			csrPem,
		});

		toast.success("CSR generado correctamente", {
			description: "Copia el CSR y luego descarga la Private Key",
			closeButton: true,
		});

		setIsGenerating(false);
	}

	function downloadPrivateKey() {
		if (!result) return;
		const privateKeyBlob = new Blob([result.privateKeyPem ?? ""], { type: "text/plain" });
		const privateKeyUrl = URL.createObjectURL(privateKeyBlob);
		const privateKeyAnchor = document.createElement("a");
		privateKeyAnchor.href = privateKeyUrl;
		privateKeyAnchor.download = "private-key.pem";
		privateKeyAnchor.click();
		URL.revokeObjectURL(privateKeyUrl);
	}

	return (
		<section>
			<div className="flex justify-between mb-6">
				<Button
					disabled={isGenerating}
					className="flex px-6 dark:text-gray-100 hover:dark:text-gray-50 select-none"
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
					className="bg-[hsl(247,94%,19%)] hover:bg-[hsl(247,94%,19%)]/90 dark:bg-[hsl(247,94%,30%)] hover:dark:dark:bg-[hsl(247,94%,25%)] flex px-6 dark:text-gray-100 hover:dark:text-gray-50 select-none"
					disabled={!result}
					onClick={() => {
						downloadPrivateKey()
						setResult(null)
						toast.success("Private Key descargada correctamente", {
							description: "Se ha descargado la Private Key en formato PEM y se ha limpiado el CSR",
							closeButton: true,
						});
					}}
				>
					<KeyIcon className="w-5 h-5 me-2 flex-shrink-0" />
					<span className="block text-lg leading-6">Descargar Private Key</span>
				</Button>
			</div>
			<Textarea
				className="font-mono h-[65dvh] text-base resize-none overflow-y-auto"
				placeholder="Tu CSR aparecerá aquí"
				value={result?.csrPem ?? ""}
				onChange={() => { }}
				contentEditable={false}
			/>
		</section>
	)
}