import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../features/auth/authSlice";

export default function OAuthSuccessPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const id = query.get("id");
    const accessToken = query.get("token");
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await axios.get(`${baseUrl}/api/user/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if(res.status === 200) {
                setUser(res.data);
            }
        }
        fetchUser();
    }, [id, accessToken]);
    useEffect(() => {
        if(user) {
            dispatch(loginSuccess({ user, accessToken }));
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [navigate, user, accessToken, dispatch]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-3xl text-primary font-semibold">
                Login successfully. Redirecting to home page
            </h1>
        </div>
    );
}
