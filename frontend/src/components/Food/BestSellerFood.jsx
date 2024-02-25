import { useTopSales } from "../../hooks";
import Skeletons from "../Skeleton/Skeletons";
import FoodItem from "./FoodItem";

export default function BestSellerFood() {
    const { isLoading, error, data: products } = useTopSales();

    return (
        <div className="mb-10">
            <h1 className="font-semibold text-2xl sm:text-3xl mb-4 border-b-4 border-b-primary-light w-fit">
                Best Seller
            </h1>
            {isLoading ? (
                <Skeletons width={200} height={250} nums={5} />
            ) : error ? (
                <p>Error</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                        {products?.map((food, index) => (
                            <FoodItem key={index} food={food} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
