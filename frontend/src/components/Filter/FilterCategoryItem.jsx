export default function FilterCategoryItem({ category, onAddCategory }) {
    return (
        <li className="flex items-center gap-2">
            <input
                type="checkbox"
                name={category.name}
                id={category.id}
                onChange={() => onAddCategory(category.id)}
            />
            <label htmlFor={category.id}>{category.name}</label>
        </li>
    );
}
