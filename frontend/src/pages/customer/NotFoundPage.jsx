import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="relative bg-white w-screen h-screen">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-slate-200 p-8 rounded-md">
                <h1 className="uppercase text-3xl font-bold text-red-500 text-center">
                    404 NOT FOUND
                </h1>
                <p className="text-center text-[64px] text-yellow-400">⚠</p>
                <p className="text-center">
                    <button
                        className="bg-primary-light uppercase hover:bg-primary-dark transition-all duration-300 text-white font-medium p-2 rounded-md text-lg"
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        &larr; Go back
                    </button>
                </p>
            </div>
        </div>
    );
}
