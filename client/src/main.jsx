import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Store from "./App/Store";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getAuthUserThunk } from "./App/Features/LoginedUser/UserThunks";

Store.dispatch(getAuthUserThunk());

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={Store}>
      <App />
    </Provider>
  </BrowserRouter>
);
