import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import { canteen } from "../../assets";

const navigationLinks = [
    { to: "dashboard", label: "Dashboard", icon: <HomeIcon /> },
    { to: "category", label: "Category", icon: <LabelIcon /> },
    { to: "menu", label: "Menu", icon: <FastfoodIcon /> },
    { to: "order", label: "Order", icon: <EventNoteIcon /> },
    { to: "customer", label: "Customer", icon: <PeopleIcon /> },
    { to: "revenue", label: "Revenue", icon: <BarChartIcon /> },
];

export default function Sidebar() {
    return (
        <div className="bg-white border-r-[1px] w-[200px] fixed top-0 left-0 z-30 h-full">
            <div className="flex justify-center py-7">
                <Link
                    to="/admin"
                    className="text-3xl font-bold text-primary-light"
                >
                    <img src={canteen} alt="Logo" width={150} height={150} />
                </Link>
            </div>
            <ul className="flex flex-col font-semibold text-white mt-3">
                {navigationLinks.map(({ to, label, icon }) => (
                    <li className="w-full text-lg" key={to}>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "text-primary-light border-r-[3px] bg-orange-100 border-r-primary-light"
                                        : "text-gray-600 hover:bg-orange-100 transition-all duration-300"
                                } flex items-center gap-2 w-full px-6 py-3`
                            }
                        >
                            {icon} {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
