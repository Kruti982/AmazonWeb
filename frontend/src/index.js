import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Contextprovider from "../src/components/profile/context/Contexprovider"; // ✅ Import context
import store from "./Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <React.StrictMode>
        <Contextprovider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Contextprovider>
      </React.StrictMode>
    </Provider>
  </>
);
