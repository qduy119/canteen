import { useLocation } from "react-router-dom";
import FoodItem from "../../components/Food/FoodItem";
import { useProducts } from "../../hooks";
import Skeletons from "../../components/Skeleton/Skeletons";
import SearchPagination from "../../components/Pagination/SearchPagination";

export default function SearchPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1", 10);
    const { isLoading, error, data } = useProducts({
        page,
        per_page: 10,
        keyword: query.get("query"),
        categoryId: "",
    });

    return (
        <div className="min-h-screen px-5 py-8">
            <h1 className="font-semibold text-2xl sm:text-3xl mb-4 border-b-4 border-b-primary-light w-fit">
                All search for{" "}
                <span className="font-bold">{query.get("query")}</span>
            </h1>
            {isLoading ? (
                <Skeletons width={200} height={250} nums={10} />
            ) : error ? (
                <p>Error</p>
            ) : !data?.data ? (
                <p className="text-2xl font-bold">No result</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {data?.data?.map((food, index) => (
                            <FoodItem key={index} food={food} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <SearchPagination
                            page={page}
                            total={data["total_pages"]}
                            keyword={query.get("query")}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
