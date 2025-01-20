import { Layout } from "@/layout";

export function AboutPage() {
	return (
		<Layout className="max-w-3xl ml-0">
			<h1 className="text-2xl font-bold mb-4">
				Girasol CSR Generator
			</h1>

			<p className="">
				<span className="font-semibold">Versión: </span>
				<span>1.1.0</span>
			</p>

			<p className="">
				<span className="font-semibold">Fecha de Lanzamiento: </span>
				<span>2024-11-01</span>
			</p>

			<p className="mb-4">
				<span className="font-semibold">Código fuente: </span>
				<a
					className="text-blue-500 dark:text-blue-600 underline visited:text-purple-500 dark:visited:text-purple-400 group"
					href="https://github.com/firmeasy-legal/firmeasy-csr-generator"
					target="_blank"
				>
					github.com
				</a>
			</p>

			<div className="mb-6">
				<p className="font-semibold mb-1">Descripción </p>
				<p className="text-balance mb-2">Esta es una aplicación de código abierto desarrollada por Girasol PE S.C.R.L., identificada con el RUC 20605042512, diseñada para facilitar a sus clientes la generación de un CSR para solicitar un certificado de agente automatizado emitido por la autoridad de certificación FirmEasy.</p>
				<p className="text-balance">
					Esta aplicación no envía ninguna información a servidores externos.
				</p>
			</div>
		</Layout>
	)
}