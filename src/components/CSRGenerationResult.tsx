import { Dispatch, SetStateAction } from "react";
import { FileSignatureIcon, InfoIcon, KeyIcon } from "lucide-react";

import { Button } from "./ui/button";
import { PrivateKeyWithCSR } from "@/models";
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
		const privateKeyBlob = new Blob([privateKeyWithCSR.privateKeyPem.trim() ?? ""], { type: "application/x-pem-file" });
		const privateKeyUrl = URL.createObjectURL(privateKeyBlob);
		const privateKeyAnchor = document.createElement("a");
		privateKeyAnchor.href = privateKeyUrl;
		privateKeyAnchor.download = "private-key.key";
		privateKeyAnchor.click();
		URL.revokeObjectURL(privateKeyUrl);
	}

	function downloadCSR() {
		if (!privateKeyWithCSR) return;
		const csrBlob = new Blob([privateKeyWithCSR.csrPem.trim() ?? ""], { type: "application/pkcs10" });
		const csrUrl = URL.createObjectURL(csrBlob);
		const csrAnchor = document.createElement("a");
		csrAnchor.href = csrUrl;
		csrAnchor.download = "csr.csr";
		csrAnchor.click();
		URL.revokeObjectURL(csrUrl);
	}

	return (
		<section className={cn(className, "space-y-6 h-full grid")} style={{
			gridTemplateRows: "min-content min-content 1fr",
		}}>
			<div className="space-y-3">
				<p className="flex text-sm text-amber-600 dark:text-amber-400 font-semibold w-full justify-center leading-4 flex-grow">
					<InfoIcon className="w-4 h-4 flex-shrink-0 me-2" />
					La Private Key firma el CSR y no la debes compartir con nadie
				</p>
				<div className="flex justify-evenly">
					<Button
						className="bg-[hsl(247,94%,19%)] hover:bg-[hsl(247,94%,19%)]/90 dark:bg-[hsl(247,94%,30%)] hover:dark:dark:bg-[hsl(247,94%,25%)] flex px-6 dark:text-gray-100 hover:dark:text-gray-50 select-none w-56"
						disabled={!privateKeyWithCSR}
						onClick={() => {
							downloadPrivateKey()
							setPrivateKeyWithCSR(null)
							toast.success("Private Key descargada correctamente", {
								description: "Se ha descargado la Private Key en formato PEM",
								closeButton: true,
							});
						}}
					>
						<KeyIcon className="w-5 h-5 me-2 flex-shrink-0" />
						<span className="block text-base leading-6">Descargar Private Key</span>
					</Button>
					<Button
						className="bg-primary hover:bg-primary/90 flex px-6 dark:text-gray-100 hover:dark:text-gray-50 select-none w-56"
						disabled={!privateKeyWithCSR}
						onClick={() => {
							downloadCSR()
							setPrivateKeyWithCSR(null)
							toast.success("CSR descargado correctamente", {
								description: "Se ha descargado el CSR en formato PEM",
								closeButton: true,
							});
						}}
					>
						<FileSignatureIcon className="w-5 h-5 me-2 flex-shrink-0" />
						<span className="block text-base leading-6">Descargar CSR</span>
					</Button>
				</div>
			</div>
			<pre
				className="w-[69.5ch] min-h-[50ch] h-fit rounded-md border border-primary bg-transparent focus:outline-none focus:ring-1 focus:ring-ring text-base resize-none overflow-y-auto p-5 pl-6 select-none"
				contentEditable={false}
			>
				{privateKeyWithCSR?.csrPem.trim() ?? "Tu CSR aparecerá aquí"}
			</pre>
		</section>
	)
}