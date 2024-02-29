import FilterListIcon from "@mui/icons-material/FilterList";
import FilterCategory from "./FilterCategory";
import FilterRating from "./FilterRating";
import FilterPrice from "./FilterPrice";

export default function SearchFilter({
    categories,
    onAddCategory,
    onApplyFilterPrice,
    onFilterRating,
}) {
    return (
        <div className="min-w-max mt-3 p-2">
            <p className="font-medium uppercase text-lg">
                <span>
                    <FilterListIcon />
                </span>{" "}
                Search filter
            </p>
            <p className="mt-5">By category</p>
            <FilterCategory
                categories={categories}
                onAddCategory={onAddCategory}
            />
            <p className="mt-5">Price Range</p>
            <FilterPrice onApplyFilterPrice={onApplyFilterPrice} />
            <p className="mt-5">Rating</p>
            <FilterRating onFilterRating={onFilterRating} />
        </div>
    );
}
