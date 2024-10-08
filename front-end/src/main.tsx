import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId =
  "241449959544-pr8c4vrgco13m4u21di7ti08q10mb6lu.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
