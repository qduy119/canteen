import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Header from "../Header/Header";
import UserMask from "../User/UserMask";
import { useLazyGetMeQuery } from "../../services/privateAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Navbar() {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [getUser, { data: user }] = useLazyGetMeQuery();

    useEffect(() => {
        if (accessToken) {
            getUser();
        }
    }, [accessToken, getUser]);

    return (
        <div className="border-b-[1px] p-3 md:p-4 w-full z-50 fixed top-0 left-0 h-[130px] md:h-[90px] flex items-center bg-white">
            <div className="hidden md:flex flex-1 items-center justify-between gap-2">
                <div className="inline">
                    <Link to="/" className="text-3xl font-bold text-primary">
                        hcmus@canteen
                    </Link>
                </div>
                <Header user={user} />
                {accessToken ? (
                    <UserMask imageUrl={user?.avatar} role={user?.role} />
                ) : (
                    <div className="flex items-center justify-end flex-wrap">
                        <Button>
                            <Link to="/login" className="text-primary">
                                Login
                            </Link>
                        </Button>
                        <Button>
                            <Link to="/signup" className="text-primary">
                                Sign up
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
            <div className="block md:hidden w-full">
                <div className="flex flex-1 items-center justify-between gap-2">
                    <div className="inline">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-primary"
                        >
                            hcmus@canteen
                        </Link>
                    </div>
                    {accessToken ? (
                        <UserMask imageUrl={user?.avatar} role={user?.role} />
                    ) : (
                        <div className="flex items-center justify-end flex-wrap">
                            <Button sx={{ p: 0 }}>
                                <Link to="/login" className="text-primary">
                                    Login
                                </Link>
                            </Button>
                            <Button sx={{ p: 0 }}>
                                <Link to="/signup" className="text-primary">
                                    Sign up
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full flex justify-center pl-0 sm:pl-5">
                    <Header user={user} />
                </div>
            </div>
        </div>
    );
}
