import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useModifyOrderMutation } from "../../services/order";
import { useAddPaymentMutation } from "../../services/payment";
import { useGetMeQuery } from "../../services/privateAuth";

export default function PaymentPage() {
    const { data: user } = useGetMeQuery();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const [amount, bankCode, cardType, payDate, orderId, status] = [
        query.get("vnp_Amount"),
        query.get("vnp_BankCode"),
        query.get("vnp_CardType"),
        query.get("vnp_PayDate"),
        query.get("vnp_TxnRef"),
        query.get("vnp_ResponseCode"),
    ];
    const [updateOrder] = useModifyOrderMutation();
    const [addPayment] = useAddPaymentMutation();

    useEffect(() => {
        updateOrder({ id: orderId, status: "Success" });
        addPayment({
            userId: user.id,
            orderId,
            payDate: moment(payDate, "YYYYMMDDHHmmss").toDate(),
            bankCode,
            cardType,
            amount: Number(amount) / 100000,
            status: status === "00" ? "Success" : "Error",
        });
    }, [
        updateOrder,
        addPayment,
        orderId,
        user.id,
        payDate,
        bankCode,
        cardType,
        amount,
        status,
    ]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-md">
                <div className="w-[81px] h-[81px] rounded-full bg-green-600 text-white mx-auto flex justify-center items-center text-4xl">
                    ✔
                </div>
                <div className="text-center mt-5">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment.
                    </p>
                    <p> Have a nice day! </p>
                    <div className="py-6 text-center">
                        <a
                            href="/order"
                            className="block px-12 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold py-3 transition-all duration-300"
                        >
                            CONTINUE
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
