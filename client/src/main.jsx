import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";
import "./scroll.css";
import NetworkStatus from "./components/NetworkStatus.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <div className="max-w-[1600px] m-auto">
          <NetworkStatus />
          <App />
        </div>
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
