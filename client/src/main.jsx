import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import process from "process";
// import img from "./images/ai.png";
import "./index.css";

import { PrivyProvider } from "@privy-io/react-auth";

import App from "./App";

window.Buffer = Buffer;
window.process = process;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PrivyProvider
        // appId="cmpmr22or00bu0dkzg3ft9651"
        appId="cmpp104ie00ma0blaeysuoeht"
      config={{
        // Display email and wallet as login methods
        loginMethods: ["email", "google", "sms"],
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
