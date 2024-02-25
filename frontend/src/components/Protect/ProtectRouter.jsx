import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AuthErrorPage from "../../pages/customer/AuthErrorPage";

export default function ProtectRouter() {
    const user = useSelector((state) => state.auth.user);

    return user ? <Outlet /> : <AuthErrorPage />;
}
