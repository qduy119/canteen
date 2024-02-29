import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FoodItem from "../../components/Food/FoodItem";
import { useProducts } from "../../hooks";
import Skeletons from "../../components/Skeleton/Skeletons";
import SearchPagination from "../../components/Pagination/SearchPagination";
import SearchFilter from "../../components/Filter/SearchFilter";
import InfoIcon from "@mui/icons-material/Info";
import {
    getCategoryFromProducts,
    getProductByCondition,
    getProductByPagination,
} from "../../utils";

export default function SearchPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const { isLoading, error, data } = useProducts({
        keyword: query.get("query"),
        page: "",
        per_page: "",
        categoryId: "",
    });
    const page = parseInt(query.get("page") || "1", 10);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [categoryToFilter, setCategoryToFilter] = useState(null);
    const [priceRange, setPriceRange] = useState(null);
    const [rating, setRating] = useState(null);

    function handleAddCategory(id) {
        if (!categoryToFilter) {
            setCategoryToFilter([id]);
        } else {
            if (categoryToFilter.includes(id)) {
                setCategoryToFilter((prev) => {
                    const temp = [...prev];
                    const indexToDelete = temp.indexOf(id);
                    if (indexToDelete !== -1) {
                        temp.splice(indexToDelete, 1);
                    }
                    return temp.length > 0 ? temp : null;
                });
            } else {
                setCategoryToFilter((prev) => [...prev, id]);
            }
        }
    }
    function handleApplyFilterPrice(priceRange) {
        setPriceRange(priceRange);
    }
    function handleFilterRating(star) {
        setRating(star);
    }
    function handleClearAll() {
        const { rows, total_pages } = getProductByPagination(
            data?.data,
            page,
            10
        );
        setProducts({ data: rows, total_pages });
        setCategoryToFilter(null);
        setPriceRange(null);
        setRating(null);
    }

    useEffect(() => {
        if (data?.data) {
            const productAfter = getProductByCondition(data?.data, {
                categoryToFilter,
                priceRange,
                rating,
            });
            const { rows, total_pages } = getProductByPagination(
                productAfter,
                page,
                10
            );
            setProducts({ data: rows, total_pages });
            setCategories(getCategoryFromProducts(data?.data));
        }
    }, [data?.data, page, categoryToFilter, priceRange, rating]);

    return (
        <div className="min-h-screen px-5 py-8">
            <h1 className="flex items-center gap-2 font-semibold text-2xl sm:text-3xl mb-4 border-b-4 border-b-primary-light w-fit">
                <span className="flex items-center">
                    <InfoIcon />
                </span>
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
                <div className="flex gap-8">
                    <div>
                        <SearchFilter
                            categories={categories}
                            onAddCategory={handleAddCategory}
                            onApplyFilterPrice={handleApplyFilterPrice}
                            onFilterRating={handleFilterRating}
                        />
                        <button
                            className="mt-5 w-full uppercase text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md font-semibold transition-all duration-300"
                            onClick={handleClearAll}
                        >
                            Clear all
                        </button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {products?.data.map((food, index) => (
                            <FoodItem key={index} food={food} />
                        ))}
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center mt-10">
                <SearchPagination
                    page={page}
                    total={products?.["total_pages"]}
                    keyword={query.get("query")}
                />
            </div>
        </div>
    );
}
