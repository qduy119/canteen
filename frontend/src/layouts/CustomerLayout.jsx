import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function CustomerLayout() {
    return (
        <div className="max-w-[1440px] mx-auto">
            <Navbar />
            <div className="mt-[130px] md:mt-[90px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
