import { PrivateKeyWithCSR } from "@/models";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { KeyIcon } from "lucide-react";

type Props = {
	privateKeyWithCSR: PrivateKeyWithCSR | null,
	setPrivateKeyWithCSR: Dispatch<SetStateAction<PrivateKeyWithCSR | null>>,
}

export function CSRGenerationResult({
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
		<>
			<Button
				className="bg-[hsl(247,94%,19%)] hover:bg-[hsl(247,94%,19%)]/90 dark:bg-[hsl(247,94%,30%)] hover:dark:dark:bg-[hsl(247,94%,25%)] flex px-6 dark:text-gray-100 hover:dark:text-gray-50 select-none"
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
			<Textarea
				className="font-mono h-[65dvh] text-base resize-none overflow-y-auto"
				placeholder="Tu CSR aparecerá aquí"
				value={privateKeyWithCSR?.csrPem ?? ""}
				onChange={() => { }}
				contentEditable={false}
			/>
		</>
	)
}