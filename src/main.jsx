import React from "react";
import ReactDOM from "react-dom/client"; // Use `react-dom/client` for `createRoot`
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";





// Get the root element
const rootElement = document.getElementById("root");

// Render the app with Redux and React Router
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </React.StrictMode>
);
