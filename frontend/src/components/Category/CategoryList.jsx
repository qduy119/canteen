import { useCategories } from "../../hooks";
import CategoryItem from "./CategoryItem";
import Skeletons from "../Skeleton/Skeletons";

export default function CategoryList() {
    const { isLoading, error, data } = useCategories();

    return (
        <div className="mb-10">
            <div>
                <h1 className="font-semibold text-2xl sm:text-3xl mb-4 border-b-4 border-b-primary-light w-fit">
                    Category
                </h1>
            </div>
            {isLoading ? (
                <Skeletons width={150} height={100} nums={10} />
            ) : error ? (
                <p>Error</p>
            ) : (
                <ul className="flex flex-wrap gap-x-12 gap-y-5">
                    {data?.map((category, index) => (
                        <CategoryItem key={index} category={category} />
                    ))}
                </ul>
            )}
        </div>
    );
}
