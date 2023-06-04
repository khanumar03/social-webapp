import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./Redux-stores/Redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ChakraProvider>
        <App />
        </ChakraProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
