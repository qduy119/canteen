import { useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WalletIcon from "@mui/icons-material/Wallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export default function CheckoutBox({ onCheckout, method, onSetMethod }) {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="px-5 sm:px-10 py-4 lg:px-5 mt-10 lg:mt-0 border rounded-md">
            <p className="font-medium flex items-center">
                <span>
                    <PaymentsIcon className="mr-2" />
                </span>
                CHECKOUT
            </p>
            <div className="px-0 py-2 sm:p-5">
                <h3 className="text-lg font-semibold uppercase">User</h3>
                <div className="cursor-pointer flex items-center justify-between gap-0 sm:gap-10 mt-3 border py-2 px-4 rounded">
                    <div className="flex items-center gap-x-2">
                        <CheckCircleIcon className="text-green-500" />
                        <div>
                            <p>Full Name</p>
                            <p className="font-medium text-lg">
                                {user.fullName}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 sm:gap-x-3">
                        <EditIcon className="cursor-pointer z-10" />
                        <DeleteIcon className="cursor-pointer z-10" />
                    </div>
                </div>
                <div className="cursor-pointer flex items-center justify-between gap-0 sm:gap-10 mt-2 border py-2 px-4 rounded">
                    <div className="flex items-center gap-x-2">
                        <CheckCircleIcon className="text-green-500" />
                        <div>
                            <p>Phone Number</p>
                            <p className="font-medium text-lg">
                                {user.phoneNumber}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 sm:gap-x-3">
                        <EditIcon className="cursor-pointer z-10" />
                        <DeleteIcon className="cursor-pointer z-10" />
                    </div>
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold uppercase">
                    PAYMENT METHODS
                </h3>
                <div className="cursor-pointer flex items-center gap-x-3 mt-2 py-2 px-4 rounded">
                    <IconButton onClick={() => onSetMethod()}>
                        {method === "MOMO" ? (
                            <CheckCircleIcon className="text-green-500" />
                        ) : (
                            <CheckCircleOutlineIcon />
                        )}
                    </IconButton>
                    <p className="uppercase text-lg flex items-center gap-x-1">
                        <WalletIcon /> MOMO WALLET
                    </p>
                </div>
                <div className="cursor-pointer flex items-center gap-x-3 mt-2 py-2 px-4 rounded">
                    <IconButton onClick={() => onSetMethod("ATM")}>
                        {method === "ATM" ? (
                            <CheckCircleIcon className="text-green-500" />
                        ) : (
                            <CheckCircleOutlineIcon />
                        )}
                    </IconButton>
                    <p className="uppercase text-lg flex items-center gap-x-1">
                        <CreditCardIcon /> ATM
                    </p>
                </div>
            </div>
            <div className="p-5">
                <button
                    type="button"
                    className="uppercase font-bold text-lg py-[10px] bg-primary hover:bg-primary-dark w-full rounded text-white transition-all"
                    onClick={onCheckout}
                >
                    PLACE ORDER
                </button>
            </div>
        </div>
    );
}
