export default function FilterRating({ onFilterRating }) {
    return (
        <div className="mt-3">
            {Array.from({ length: 5 }, (_, index) => index + 1)
                .reverse()
                .map((star) => {
                    return (
                        <p
                            key={star}
                            className="mt-1 cursor-pointer hover:-translate-y-[1px] transition-all duration-300"
                            onClick={() => onFilterRating(star)}
                        >
                            {Array.from({ length: 5 }, (_, index) => index).map(
                                (index) => (
                                    <i
                                        key={index}
                                        className={`${
                                            index < star
                                                ? "fa-solid"
                                                : "fa-regular"
                                        } fa-star text-yellow-400 mr-[2px]`}
                                    />
                                )
                            )}
                            <span className="ml-[4px] text-gray-600">
                                {star !== 5 && "& Up"}
                            </span>
                        </p>
                    );
                })}
        </div>
    );
}
