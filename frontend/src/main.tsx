import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
]);

const container = document.getElementById("root")

if (!container) {
  throw new Error("No root element.")
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);