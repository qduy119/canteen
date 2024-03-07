import { formatPrice } from "../../utils";

export default function CheckoutItem({ item, i }) {
    return (
        <tr>
            <td className="whitespace-nowrap px-6 py-4">{i + 1}</td>
            <td className="whitespace-nowrap px-6 py-4 flex justify-center">
                <div
                    className="w-[50px] h-[50px] bg-center bg-cover rounded-md"
                    style={{
                        backgroundImage: `url(${item.item.thumbnail})`,
                    }}
                />
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item.item.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.quantity}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {formatPrice(
                    item.item.price *
                        item.quantity *
                        (1 - item.item.discount * 0.01)
                )}{" "}
                $
            </td>
        </tr>
    );
}
