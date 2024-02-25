import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import getItemsInCart from "../../features/cart/getItemsInCart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toast from "../../components/Toast/Toast";
import { bg } from "../../assets";

export default function LoginPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [login, { data, isLoading, isSuccess, isError, error }] =
        useLoginMutation();

    function handleChange(e) {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Validate empty email and password fields
        const emptyFields = ["email", "password"];
        const emptyFieldErrors = {};

        emptyFields.forEach((field) => {
            if (!credentials[field] || credentials[field].trim() === "") {
                emptyFieldErrors[field] = "This field is required";
            }
        });

        if (Object.keys(emptyFieldErrors).length > 0) {
            setEmailError(emptyFieldErrors.email);
            setPasswordError(emptyFieldErrors.password);
            return;
        }

        // Your existing email validation code
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/g;
        if (!regex.test(credentials.email)) {
            setEmailError("Email is not valid");
            setPasswordError(null); // Clear password error if email is invalid
            return;
        }

        setEmailError(null);
        setPasswordError(null);
        login(credentials);
    }
    function handleLoginGoogle(e) {
        e.preventDefault();
        window.open("https://localhost:3000/auth/google", "_self");
    }
    function handleLoginFacebook(e) {
        e.preventDefault();
        window.open("https://localhost:3000/auth/facebook", "_self");
    }

    useEffect(() => {
        if (isSuccess) {
            setCredentials({});
            dispatch(loginSuccess(data));
            toast.success("Log in successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            const { user } = data;
            dispatch(getItemsInCart({ userId: user.id }));
            setTimeout(() => {
                if (user.role === "Customer") {
                    navigate(location?.state?.from ?? "/");
                } else if (user.role === "Admin") {
                    navigate("/admin");
                }
            }, 2000);
        }
    }, [isSuccess, data, navigate, dispatch, location?.state]);

    return (
        <div
            className="relative h-screen w-full bg-contain"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <form
                action="/"
                method="post"
                onSubmit={(e) => handleSubmit(e)}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-y-4 bg-white px-8 py-6 rounded-md shadow-lg w-[80%] sm:w-[60%] max-w-md"
            >
                <div className="flex flex-col justify-center">
                    <p className="text-center text-2xl sm:text-3xl font-bold text-primary">
                        <Link to="/">hcmus@canteen</Link>
                    </p>
                    <h2 className="text-center text-xl sm:text-2xl font-bold pt-4 sm:pt-8 text-primary-dark">
                        Log in to your account
                    </h2>
                    <p className="text-center text-gray-600 text-[12px] mt-2">
                        Welcome back! Please enter your details.
                    </p>
                    <div className="flex flex-col gap-y-3 w-full mt-4 ">
                        <div className="flex flex-col">
                            <label className="mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                className={`w-[100%] border-none outline-none px-3 py-2 rounded-[4px] bg-gray-200 ${
                                    emailError ? "border-red-500" : ""
                                }`}
                                type="text"
                                id="email"
                                value={credentials.email ?? ""}
                                onChange={(e) => handleChange(e)}
                                placeholder="Your Email"
                            />
                            {emailError ? (
                                <p className="font-semibold text-red-600">
                                    {emailError}
                                </p>
                            ) : null}
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                className={`w-[100%] border-none outline-none px-3 py-2 rounded-[4px] bg-gray-200 ${
                                    passwordError ? "border-red-500" : ""
                                }`}
                                type="password"
                                id="password"
                                value={credentials.password ?? ""}
                                onChange={(e) => handleChange(e)}
                                placeholder="Your Password"
                            />
                            {passwordError ? (
                                <p className="font-semibold text-red-600">
                                    {passwordError}
                                </p>
                            ) : null}
                        </div>
                        {isError ? (
                            <p className="font-semibold text-red-600">
                                {error.data}
                            </p>
                        ) : null}
                        <button
                            type="submit"
                            className="flex justify-center items-center gap-2 mt-3 max-w-full rounded-[4px] border-none outline-non text-white font-bold text-xl bg-primary hover:bg-primary-dark py-2"
                        >
                            LOGIN{" "}
                            <span
                                className={`bar ${isLoading ? "" : "hidden"}`}
                            />
                        </button>
                        <div className="my-2 flex justify-center items-center gap-5">
                            <a
                                href="/"
                                onClick={(e) => handleLoginFacebook(e)}
                                className="bg-[#324a7e] text-white text-2xl flex justify-center items-center w-[50px] h-[50px] rounded-full no-underline"
                            >
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a
                                href="/"
                                onClick={(e) => handleLoginGoogle(e)}
                                className="bg-[#cd3b2e] text-white text-2xl flex justify-center items-center w-[50px] h-[50px] rounded-full no-underline"
                            >
                                <i className="fa fa-google"></i>
                            </a>
                        </div>
                    </div>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Don{"'"}t have an account yet?
                        <Link
                            to="/signup"
                            className="text-primary-light font-semibold ml-1 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
            <Toast />
        </div>
    );
}
