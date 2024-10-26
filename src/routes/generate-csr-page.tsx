import { CSRGenerationResult } from "@/components/CSRGenerationResult";
import { GenerateCSRForm } from "@/components/GenerateCSRForm";
import { Layout } from "@/layout";
import { PrivateKeyWithCSR } from "@/models";
import { useState } from "react";

export function GenerateCSRPage() {
	const [privateKeyWithCSR, setPrivateKeyWithCSR] = useState<PrivateKeyWithCSR | null>(null)

	return (
		<Layout className="grid gap-10 grid-cols-5">
			<GenerateCSRForm
				className="col-span-2"
				setPrivateKeyWithCSR={setPrivateKeyWithCSR}
			/>
			<CSRGenerationResult
				className="col-span-3"
				privateKeyWithCSR={privateKeyWithCSR}
				setPrivateKeyWithCSR={setPrivateKeyWithCSR}
			/>
		</Layout>
	)
}