import { CSRGenerationResult } from "@/components/CSRGenerationResult";
import { GenerateCSRForm } from "@/components/GenerateCSRForm";
import { Layout } from "@/layout";
import { PrivateKeyWithCSR } from "@/models";
import { useState } from "react";

export function GenerateCSRPage() {
	const [privateKeyWithCSR, setPrivateKeyWithCSR] = useState<PrivateKeyWithCSR | null>(null)

	return (
		<Layout className="grid gap-10 grid-cols-6 items-center max-w-screen-lg mx-auto">
			<div className="col-span-6">
				<h1 className="text-primary font-bold text-2xl text-center mb-2">Generador de CSR</h1>
				<p className="text-center">
					Genera un CSR para solicitar un certificado de agente automatizado de la autoridad de certificación FirmEasy
				</p>
			</div>
			<GenerateCSRForm
				className="col-span-2"
				setPrivateKeyWithCSR={setPrivateKeyWithCSR}
			/>
			<CSRGenerationResult
				className="col-span-4"
				privateKeyWithCSR={privateKeyWithCSR}
				setPrivateKeyWithCSR={setPrivateKeyWithCSR}
			/>
		</Layout>
	)
}