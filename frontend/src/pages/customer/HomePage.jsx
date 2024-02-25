import FoodList from "../../components/Food/FoodList";
import CategoryList from "../../components/Category/CategoryList";
import BestSellerFood from "../../components/Food/BestSellerFood";

export default function HomePage() {
    return (
        <main className="px-4 py-8">
            <CategoryList />
            <BestSellerFood />
            <FoodList />
        </main>
    );
}
