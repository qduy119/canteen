import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.js";
import ThemeCustomization from "./themes";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <ThemeCustomization>
                <App />
            </ThemeCustomization>
        </PersistGate>
    </Provider>
);
