import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./components/context/Contexprovider";
import store from "./Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <React.StrictMode>
        <ContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContextProvider>
      </React.StrictMode>
    </Provider>
  </>
);
