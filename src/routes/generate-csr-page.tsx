import { CSRGenerationResult } from "@/components/CSRGenerationResult";
import { GenerateCSRForm } from "@/components/GenerateCSRForm";
import { Layout } from "@/layout";
import { PrivateKeyWithCSR } from "@/models";
import { useState } from "react";

export function GenerateCSRPage() {
	const [privateKeyWithCSR, setPrivateKeyWithCSR] = useState<PrivateKeyWithCSR | null>(null)

	return (
		<Layout>
			<div className="mb-10">
				<h1 className="text-primary font-bold text-2xl text-center mb-2">Generador de CSR</h1>
				<p className="text-center">
					Genera un CSR para solicitar un certificado de agente automatizado de la autoridad de certificación FirmEasy
				</p>
			</div>
			<div className="flex gap-10 justify-between">
				<GenerateCSRForm
					className="flex-grow-0"
					setPrivateKeyWithCSR={setPrivateKeyWithCSR}
				/>
				<CSRGenerationResult
					className="flex-shrink-0"
					privateKeyWithCSR={privateKeyWithCSR}
					setPrivateKeyWithCSR={setPrivateKeyWithCSR}
				/>
			</div>
		</Layout>
	)
}