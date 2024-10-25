import { CSRGenerationResult } from "@/components/CSRGenerationResult";
import { GenerateCSRForm } from "@/components/GenerateCSRForm";
import { Layout } from "@/layout";
import { PrivateKeyWithCSR } from "@/models";
import { useState } from "react";

export function GenerateCSRPage() {
	const [privateKeyWithCSR, setPrivateKeyWithCSR] = useState<PrivateKeyWithCSR | null>(null)

	return (
		<Layout>
			<GenerateCSRForm setPrivateKeyWithCSR={setPrivateKeyWithCSR} />
			<CSRGenerationResult
				privateKeyWithCSR={privateKeyWithCSR}
				setPrivateKeyWithCSR={setPrivateKeyWithCSR}
			/>
		</Layout>
	)
}