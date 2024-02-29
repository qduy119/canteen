import FilterCategoryItem from "./FilterCategoryItem";

export default function FilterCategory({ categories, onAddCategory }) {
    return (
        <ul className="mt-3">
            {categories?.map((category, index) => (
                <FilterCategoryItem key={index} category={category} onAddCategory={onAddCategory} />
            ))}
        </ul>
    );
}
