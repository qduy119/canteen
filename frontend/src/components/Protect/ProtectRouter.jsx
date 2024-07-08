import { Outlet } from "react-router-dom";
import AuthErrorPage from "../../pages/customer/AuthErrorPage";
import { useSelector } from "react-redux";

export default function ProtectRouter() {
    const accessToken = useSelector((state) => state.auth.accessToken);

    return accessToken ? <Outlet /> : <AuthErrorPage />;
}
