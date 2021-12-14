import { render } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Fallback() {
    return <p> Oops, an error occurred</p>;
}

render(
    <ErrorBoundary FallbackComponent={Fallback}>
        <BrowserRouter>
            <ToastContainer />
            <App />
        </BrowserRouter>
    </ErrorBoundary>,
    document.getElementById("root")
);
