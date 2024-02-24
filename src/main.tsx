import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>
);
