import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Sidebar from "../components/Sidebar/Sidebar";
import UserMask from "../components/User/UserMask";
import AuthErrorPage from "../pages/customer/AuthErrorPage";

export default function AdminLayout() {
    const user = useSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);

    return user?.role === "Admin" ? (
        <div className="max-w-[1440px] mx-auto">
            <div className="block md:hidden">
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    disableScrollLock={true}
                >
                    <Sidebar />
                </Drawer>
            </div>
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <div className="ml-0 md:ml-[200px] py-2 px-5 bg-slate-50">
                <div className="flex justify-between md:justify-end items-center pb-2 border-b-2 border-primary-light">
                    <IconButton
                        className="inline-flex md:hidden"
                        onClick={() => setOpen(true)}
                    >
                        <FormatListBulletedIcon className="text-primary" />
                    </IconButton>
                    <UserMask imageUrl={user.avatar} role={user.role} />
                </div>
                <Outlet />
            </div>
        </div>
    ) : (
        <AuthErrorPage />
    );
}
