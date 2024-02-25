import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
    return (
        <ToastContainer
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            theme="light"
            pauseOnHover={false}
        />
    );
}
