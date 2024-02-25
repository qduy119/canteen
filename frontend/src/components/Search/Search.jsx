import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ search, onSetSearch, onSubmit }) {
    return (
        <form
            action="/"
            onSubmit={(e) => onSubmit(e)}
            className="flex items-center "
        >
            <div className="flex items-center h-[42px] py-2 pl-5 pr-2 rounded-l-full border-solid border-[1px] border-gray-300 focus-within:border-primary focus-within:shadow-primary-light">
                <label htmlFor="search" className="hidden"></label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    className="border-none outline-none w-[150px] sm:w-[250px] lg:w-[300px] bg-transparent"
                    value={search}
                    onChange={(e) => onSetSearch(e.target.value)}
                />
                {search ? (
                    <CloseIcon
                        sx={{
                            width: "20px",
                            height: "20px",
                            opacity: 100,
                            ":hover": {
                                cursor: "pointer",
                                backgroundColor: "#dfdfdf",
                                borderRadius: "50px",
                            },
                        }}
                        onClick={() => onSetSearch("")}
                    />
                ) : (
                    <CloseIcon
                        sx={{
                            width: "20px",
                            height: "20px",
                            opacity: 0,
                        }}
                        onClick={() => onSetSearch("")}
                    />
                )}
            </div>
            <button
                type="submit"
                className="h-[42px] rounded-r-full border-l-0 border-solid border-[1px] py-[7px] px-4 border-gray-300 bg-gray-100 hover:bg-gray-20"
            >
                <SearchIcon />
            </button>
        </form>
    );
}
