import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/auth";
import { toast } from "react-toastify";
import Toast from "../../components/Toast/Toast";
import { bg } from "../../assets";

export default function SignupPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({});
    const [errors, setErrors] = useState(null);
    const [register, { isLoading, isSuccess, isError, error }] =
        useRegisterMutation();
    function handleChange(e) {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
    function handleSubmit(e) {
        e.preventDefault();

        const emptyFields = ["email", "password", "confirmPassword", "fullName", "phoneNumber"];
        const emptyFieldErrors = {};

        emptyFields.forEach(field => {
            if (!credentials[field] || credentials[field].trim() === "") {
                emptyFieldErrors[field] = "This field is required";
            }
        });

        if (Object.keys(emptyFieldErrors).length > 0) {
            setErrors(emptyFieldErrors);
            return;
        }

        let flag = 1;
        if (credentials.password !== credentials.confirmPassword) {
            setErrors(prev => ({
                ...prev,
                confirmPassword: "Confirm Password is incorrect",
            }));
            flag = 0;
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=^]).{8,20}$/;
        if (!passwordRegex.test(credentials.password)) {
            setErrors(prev => ({
                ...prev,
                password: "Password must be 8-20 characters, include at least one lowercase letter, one uppercase letter, one digit, and one special character",
            }));
            flag = 0;
        }

        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/g;
        if (!regex.test(credentials.email)) {
            setErrors(prev => ({
                ...prev,
                email: "Email is not valid",
            }));
            flag = 0;
        }

        if (!flag) return;

        setErrors(null);
        register({
            email: credentials.email,
            password: credentials.password,
            fullName: credentials.fullName,
            phoneNumber: credentials.phoneNumber,
        });
    }

    useEffect(() => {
        if (isSuccess) {
            setCredentials({});
            toast.success("Sign up successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }, [isSuccess, navigate, error]);

    return (
        <div
            className="relative h-screen w-full bg-contain"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <form
                action="/"
                method="post"
                onSubmit={(e) => handleSubmit(e)}
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-8 py-6 rounded-md shadow-lg w-[80%] sm:w-[60%] max-w-md"
            >
                <p className="text-center text-2xl sm:text-3xl font-bold text-primary">
                    <Link to="/">hcmus@canteen</Link>
                </p>
                <h2 className="text-center text-xl sm:text-2xl font-bold pt-4 sm:pt-6 text-primary-dark">
                    Create a new account
                </h2>
                <div className="flex flex-col gap-y-3 w-full mt-4">
                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-[100%] border-none outline-none px-3 py-2 rounded-[4px] bg-gray-200"
                            type="text"
                            id="email"
                            placeholder="Your Email"
                            value={credentials.email ?? ""}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors && errors.email && (
                            <p className="font-semibold text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            className="w-[100%] border-none outline-none px-3 py-2 rounded-[4px] bg-gray-200"
                            type="text"
                            id="fullName"
                            placeholder="Your Full Name"
                            value={credentials.fullName ?? ""}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors && errors.fullName && (
                            <p className="font-semibold text-red-600">{errors.fullName}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="phoneNumber">
                            Phone Number
                        </label>
                        <input
                            className="w-[100%] border-none outline-none px-3 py-2 rounded-[4px] bg-gray-200"
                            type="text"
                            id="phoneNumber"
                            placeholder="Your Phone Number"
                            value={credentials.phoneNumber ?? ""}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors && errors.phoneNumber && (
                            <p className="font-semibold text-red-600">{errors.phoneNumber}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-[100%] border-none outline-none px-3 py-2 rounded-[4px] bg-gray-200"
                            type="password"
                            id="password"
                            placeholder="Your Password"
                            value={credentials.password ?? ""}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors && errors.password && (
                            <p className="font-semibold text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            className="w-[100%] border-none outline-none px-3 py-2 rounded-[4px] bg-gray-200"
                            type="password"
                            id="confirmPassword"
                            placeholder="Your Confirm Password"
                            value={credentials.confirmPassword ?? ""}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors && errors.confirmPassword && (
                            <p className="font-semibold text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {isError ? (
                        <p className="font-semibold text-red-600">
                            {error.data?.message}
                        </p>
                    ) : null}
                    <button
                        type="submit"
                        className="flex justify-center items-center gap-2 mt-3 max-w-full rounded-[4px] border-none outline-non text-white font-bold text-xl bg-primary hover:bg-primary-dark py-2"
                    >
                        SIGN UP{" "}
                        <span className={`bar ${isLoading ? "" : "hidden"}`} />
                    </button>
                </div>

                <p className="text-small-regular text-light-2 text-center mt-2">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-primary-light font-semibold ml-1 hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </form>
            <Toast />
        </div>
    );
}
