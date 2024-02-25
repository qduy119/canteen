import { Link, useLoaderData, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useProducts } from "../../hooks";
import FoodItem from "../../components/Food/FoodItem";
import Skeletons from "../../components/Skeleton/Skeletons";
import CategoryPagination from "../../components/Pagination/DefaultPagination";

export default function CategoryPage() {
    const category = useLoaderData();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1", 10);
    const { isLoading, error, data } = useProducts({
        page,
        per_page: 10,
        keyword: "",
        categoryId: category.id,
    });

    return (
        <div className="px-4 py-8 min-h-screen">
            <Link to="/" className="hover:underline text-primary">
                <ArrowBackIosNewIcon />
                BACK TO HOME PAGE
            </Link>
            <div className="block sm:flex gap-5 items-center mt-5">
                <img
                    src={category.thumbnail}
                    alt="Category"
                    width="150"
                    height="150"
                    className="rounded-md"
                />
                <div className="mt-4 sm:mt-0">
                    <p className="font-medium text-2xl mb-2">{category.name}</p>
                    <p>{category.description}</p>
                </div>
            </div>
            <div className="mt-10">
                <h1 className="font-semibold text-2xl sm:text-3xl mb-10 border-b-4 border-b-primary-light w-fit">
                    All items of <span className="bold">{category.name}</span>
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
                            <CategoryPagination
                                total={data["total_pages"]}
                                page={page}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
