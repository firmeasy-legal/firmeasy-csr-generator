import { invoke } from "@tauri-apps/api/core";
import { Button } from "./ui/button"
import { LoaderIcon, ZapIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { PrivateKeyWithCSR } from "@/models";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

type CSRGenerationParams = {
	country: string,
	state: string,
	locality: string,
	organizationUnit: string,
	commonName: string,
}

const formSchema = z.object({
	country: z.string().length(2),
	region: z.string(),
	province: z.string(),
	district: z.string(),
	organizationUnit: z.string(),
	commonName: z.string(),
})


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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			country: "PE",
			region: "",
			province: "",
			district: "",
			organizationUnit: "",
			commonName: ""
		},
	})

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

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	return (
		<Form {...form} >
			<form className={cn(className, "space-y-4")}>
				<div className="grid grid-cols-3 gap-6">
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>País</FormLabel>
								<FormControl>
									<Input {...field} value="PE" readOnly />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="region"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormLabel>Región</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Lima" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="province"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Provincia</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Lima" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="district"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Distrito</FormLabel>
							<FormControl>
								<Input {...field} placeholder="San Isidro" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="organizationUnit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unidad Organizacional</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Contabilidad" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="commonName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre Común</FormLabel>
							<FormControl>
								<Input {...field} placeholder="FirmEasy" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
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
			</form>
		</Form>
	)
}