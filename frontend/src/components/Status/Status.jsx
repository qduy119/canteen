export default function Status({ status }) {
    let base =
        "px-4 py-1 font-medium rounded-md text-white text-center cursor-pointer w-[90px] ";
    if (status === "Pending") {
        base = base.concat("bg-yellow-400");
    } else if (status === "Success") {
        base = base.concat("bg-green-500");
    } else if (status === "Cancel") {
        base = base.concat("bg-red-500");
    }
    return <p className={base}>{status}</p>;
}
