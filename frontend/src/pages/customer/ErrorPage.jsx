import { useRouteError, useNavigate } from "react-router-dom";

export default function Error() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <section className="p-6 md:p-12 mt-[130px] md:mt-[90px] min-h-[600px]">
            <div className="p-4 bg-white rounded-md">
                <p className="text-red-700 font-bold">{error.message} !</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-primary rounded-md p-2 mt-2"
                >
                    &larr; Go back
                </button>
            </div>
        </section>
    );
}
