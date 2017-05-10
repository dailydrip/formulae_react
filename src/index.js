import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RespondToForm } from "./containers";
import { AdministerForm } from "./containers";
import "./index.css";
import { Form } from "./api";
import store from "./store";

// Just a thing to play with the form api
// FIXME: Remove this eventually
window.f = Form;

ReactDOM.render(
  <Provider store={store}>
    <AdministerForm />
  </Provider>,
  document.getElementById("root")
);
