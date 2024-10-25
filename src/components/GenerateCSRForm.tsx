import { invoke } from "@tauri-apps/api/core";
import { Button } from "./ui/button"
import { KeyIcon, LoaderIcon, ZapIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { PrivateKeyWithCSR } from "@/models";
import { cn } from "@/lib/utils";

type GeneratedPrivateKeyWithCSR = {
	base64_private_key_pem: string,
	base64_csr_pem: string,
}

type GenerationError = {
	message: string,
}

type Props = {
	className?: string,
	setPrivateKeyWithCSR: Dispatch<SetStateAction<PrivateKeyWithCSR | null>>,
}

export function GenerateCSRForm({
	className,
	setPrivateKeyWithCSR,
}: Props) {
	//! useTransition doesn't work with Tauri yet
	// const [isGenerating, startGeneration] = useTransition();
	const [isGenerating, setIsGenerating] = useState(false);

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

		setPrivateKeyWithCSR({
			privateKeyPem,
			csrPem,
		});

		toast.success("CSR generado correctamente", {
			description: "Copia el CSR y luego descarga la Private Key",
			closeButton: true,
		});

		setIsGenerating(false);
	}

	return (
		<form className={cn(className, "")}>
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
			</div>
		</form>
	)
}