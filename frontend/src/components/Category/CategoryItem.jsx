import { Link } from "react-router-dom";

export default function CategoryItem({ category }) {
    return (
        <li className="hover:scale-110 transition-all duration-500">
            <Link to={`/category/${category.id}`}>
                <img
                    src={category.thumbnail}
                    alt="Thumbnail"
                    width="81"
                    height="81"
                    className="rounded-md"
                />
                <p className="text-center font-semibold max-w-[81px]">{category.name}</p>
            </Link>
        </li>
    );
}
