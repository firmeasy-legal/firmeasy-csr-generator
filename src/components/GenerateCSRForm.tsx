import { Dispatch, SetStateAction, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { InfoIcon, LoaderIcon, ZapIcon } from "lucide-react";

import { Button } from "./ui/button"
import { Input } from "./ui/input";
import { PrivateKeyWithCSR } from "@/models";
import { cn } from "@/lib/utils";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "sonner";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type CSRGenerationParams = {
	country: string,
	state: string,
	locality: string,
	organization: string,
	organizationUnit: string,
	commonName: string,
}

const formSchema = z.object({
	country: z.string().length(2),
	region: z.string().min(1, "Este campo es requerido"),
	province: z.string().min(1, "Este campo es requerido"),
	district: z.string().min(1, "Este campo es requerido"),
	organization: z.string().min(1, "Este campo es requerido"),
	organizationUnit: z.string().min(1, "Este campo es requerido"),
	softwareName: z.string().min(1, "Este campo es requerido"),
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
			organization: "",
			organizationUnit: "",
			softwareName: ""
		},
	})

	async function generateCSR(data: CSRGenerationParams) {
		setIsGenerating(true);
		await new Promise(resolve => setTimeout(resolve, 150));

		const response = await invoke<GeneratedPrivateKeyWithCSR>("generate_csr", {
			data
		})
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

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const csrData: CSRGenerationParams = {
			country: values.country,
			state: `${values.region}-${values.province}`,
			locality: values.district,
			organization: values.organization,
			organizationUnit: values.organizationUnit,
			commonName: values.softwareName,
		}
		await generateCSR(csrData);
	}

	return (
		<Form {...form} >
			<form className={cn(className, "space-y-6")} onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-10 gap-6">
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="col-span-2">
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
							<FormItem className="col-span-8">
								<FormLabel>Región</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Lima" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-6">
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
				</div>
				<FormField
					control={form.control}
					name="organization"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Organización</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Girasol E.I.R.L" />
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
					name="softwareName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre del Software</FormLabel>
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
					className="flex px-6 dark:text-gray-100 hover:dark:text-gray-50 select-none w-full"
				>
					{
						isGenerating
							? <LoaderIcon className="w-5 h-5 me-2 flex-shrink-0 animate-spin" />
							: <ZapIcon className="w-5 h-5 me-2 flex-shrink-0" />
					}
					<span className="block text-lg leading-6">Generar CSR</span>
				</Button>
				<span className="flex text-sm text-muted leading-4 text-pretty">
					<InfoIcon className="inline w-4 h-4 flex-shrink-0 me-2" />
					Al generar el CSR das fe de que los datos ingresados son correctos y que tienes autorización para solicitar un certificado de FirmEasy.
				</span>
			</form>
		</Form>
	)
}