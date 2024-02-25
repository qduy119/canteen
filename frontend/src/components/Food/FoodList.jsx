import { useLocation } from "react-router-dom";
import { useProducts } from "../../hooks";
import FoodItem from "./FoodItem";
import HomePagination from "../Pagination/HomePagination";
import Skeletons from "../Skeleton/Skeletons";

export default function FoodList() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1", 10);
    const { isLoading, error, data } = useProducts({
        page,
        per_page: 10,
        keyword: "",
        categoryId: "",
    });

    return (
        <div>
            <h1 className="font-semibold text-2xl sm:text-3xl mb-4 border-b-4 border-b-primary-light w-fit">
                List Food Today
            </h1>
            {isLoading ? (
                <Skeletons width={200} height={250} nums={10} />
            ) : error ? (
                <p>Error</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {data?.data?.map((food, index) => (
                            <FoodItem key={index} food={food} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <HomePagination
                            total={data["total_pages"]}
                            page={page}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
