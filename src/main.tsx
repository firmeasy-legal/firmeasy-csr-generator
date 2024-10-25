import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GenerateCSRPage } from "./routes/generate-csr-page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <GenerateCSRPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
