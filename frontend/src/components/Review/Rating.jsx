export default function Rating({ rating, onSetRating }) {
    return (
        <div className="mx-2 xs:mx-8">
            <div>
                {Array.from({ length: 5 }, (_, index) => index).map((index) => (
                    <i
                        key={index}
                        className={`${
                            index < rating ? "fa-solid" : "fa-regular"
                        } fa-star text-yellow-400 scale-110 md:scale-150 mr-2 md:mr-4`}
                        onClick={() => {
                            onSetRating(index + 1);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
