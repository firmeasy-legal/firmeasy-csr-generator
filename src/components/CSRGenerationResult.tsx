import { Dispatch, SetStateAction } from "react";
import { InfoIcon, KeyIcon } from "lucide-react";

import { Button } from "./ui/button";
import { PrivateKeyWithCSR } from "@/models";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
	className?: string,
	privateKeyWithCSR: PrivateKeyWithCSR | null,
	setPrivateKeyWithCSR: Dispatch<SetStateAction<PrivateKeyWithCSR | null>>,
}

export function CSRGenerationResult({
	className,
	privateKeyWithCSR,
	setPrivateKeyWithCSR,
}: Props) {
	function downloadPrivateKey() {
		if (!privateKeyWithCSR) return;
		const privateKeyBlob = new Blob([privateKeyWithCSR.privateKeyPem ?? ""], { type: "text/plain" });
		const privateKeyUrl = URL.createObjectURL(privateKeyBlob);
		const privateKeyAnchor = document.createElement("a");
		privateKeyAnchor.href = privateKeyUrl;
		privateKeyAnchor.download = "private-key.pem";
		privateKeyAnchor.click();
		URL.revokeObjectURL(privateKeyUrl);
	}

	return (
		<section className={cn(className, "space-y-6 h-full grid")} style={{
			gridTemplateRows: "min-content 1fr",
		}}>
			<div className="flex gap-2 items-center">
				<Button
					className="bg-[hsl(247,94%,19%)] hover:bg-[hsl(247,94%,19%)]/90 dark:bg-[hsl(247,94%,30%)] hover:dark:dark:bg-[hsl(247,94%,25%)] flex px-6 dark:text-gray-100 hover:dark:text-gray-50 select-none w-max"
					disabled={!privateKeyWithCSR}
					onClick={() => {
						downloadPrivateKey()
						setPrivateKeyWithCSR(null)
						toast.success("Private Key descargada correctamente", {
							description: "Se ha descargado la Private Key en formato PEM y se ha limpiado el CSR",
							closeButton: true,
						});
					}}
				>
					<KeyIcon className="w-5 h-5 me-2 flex-shrink-0" />
					<span className="block text-lg leading-6">Descargar Private Key</span>
				</Button>
				<span className="flex text-sm text-muted leading-4">
					<InfoIcon className="w-4 h-4 flex-shrink-0 me-2" />
					La Private Key firma el CSR y no la debes compartir con nadie
				</span>
			</div>
			<Textarea
				className="font-mono text-base resize-none overflow-y-auto"
				placeholder="Tu CSR aparecerá aquí"
				value={privateKeyWithCSR?.csrPem.trim() ?? ""}
				onChange={() => { }}
				contentEditable={false}
			/>
		</section>
	)
}