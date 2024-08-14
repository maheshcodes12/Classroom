import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";

const defaultTheme = createTheme();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>
);
