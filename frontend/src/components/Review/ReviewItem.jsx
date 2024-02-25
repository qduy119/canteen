import ReviewImage from "./ReviewImage";

export default function ReviewItem({ review }) {
    return (
        <li className="flex gap-4 p-4">
            <div
                className="w-[30px] xs:w-[40px] h-[30px] xs:h-[40px] bg-white bg-center bg-cover rounded-[50px]"
                style={{
                    backgroundImage: `url(${review.user.avatar})`,
                }}
            />
            <div>
                <p>{review.user.fullName}</p>
                <div>
                    {Array.from({ length: 5 }, (_, index) => index).map(
                        (index) => (
                            <i
                                key={index}
                                className={`${
                                    index < review.rating
                                        ? "fa-solid"
                                        : "fa-regular"
                                } fa-star text-yellow-400 mr-[2px]`}
                            />
                        )
                    )}
                </div>
                <p className="text-gray-500 mb-2">
                    {new Date(review.createAt).toLocaleString()}
                </p>
                <p>{review.description}</p>
                {review.images && (
                    <div className="p-2 flex flex-wrap items-center gap-8 mt-2">
                        {review.images.map((image, index) => (
                            <div
                                key={index}
                                className="w-[100px] h-[100px] border-[1px] border-primary rounded-md flex items-center"
                            >
                                <ReviewImage image={image} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </li>
    );
}
