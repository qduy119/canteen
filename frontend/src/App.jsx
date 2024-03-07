import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectRouter from "./components/Protect/ProtectRouter";
import HomePage from "./pages/customer/HomePage";
import CategoryPage from "./pages/customer/CategoryPage";
import ProductPage from "./pages/customer/ProductPage";
import CartPage from "./pages/customer/CartPage";
import OrderPage from "./pages/customer/OrderPage";
import SearchPage from "./pages/customer/SearchPage";
import LoginPage from "./pages/customer/LoginPage";
import SignupPage from "./pages/customer/SignupPage";
import ProfilePage from "./pages/customer/ProfilePage";
import CheckoutPage from "./pages/customer/CheckoutPage";
import ErrorPage from "./pages/customer/ErrorPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminCategoryPage from "./pages/admin/CategoryPage";
import MenuPage from "./pages/admin/MenuPage";
import AdminOrderPage from "./pages/admin/OrderPage";
import CustomerPage from "./pages/admin/CustomerPage";
import CouponPage from "./pages/admin/CouponPage";
import TransactionPage from "./pages/admin/TransactionPage";
import RevenuePage from "./pages/admin/RevenuePage";
import OAuthSuccessPage from "./pages/customer/OAuthSuccessPage";
import PaymentPage from "./pages/customer/PaymentPage";
import NotFoundPage from "./pages/customer/NotFoundPage";
import getCategoryById from "./utils/getCategoryById";
import getProductById from "./utils/getProductById";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                path: "/",
                element: <CustomerLayout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                    },
                    {
                        path: "/home",
                        element: <HomePage />,
                    },
                    {
                        path: "category/:id",
                        element: <CategoryPage />,
                        loader: getCategoryById,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "food/:id",
                        element: <ProductPage />,
                        loader: getProductById,
                        errorElement: <ErrorPage />,
                    },
                    {
                        path: "search",
                        element: <SearchPage />,
                    },
                    {
                        path: "/",
                        element: <ProtectRouter />,
                        children: [
                            {
                                path: "cart",
                                element: <CartPage />,
                            },
                            {
                                path: "order",
                                element: <OrderPage />,
                            },
                            {
                                path: "checkout",
                                element: <CheckoutPage />,
                            },
                            {
                                path: "profile",
                                element: <ProfilePage />,
                            },
                            {
                                path: "payment",
                                element: <PaymentPage />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignupPage />,
            },
            {
                path: "oauth-success",
                element: <OAuthSuccessPage />,
            },
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        path: "",
                        element: <Navigate replace to="dashboard" />,
                    },
                    {
                        path: "dashboard",
                        element: <DashboardPage />,
                    },
                    {
                        path: "category",
                        element: <AdminCategoryPage />,
                    },
                    {
                        path: "menu",
                        element: <MenuPage />,
                    },
                    {
                        path: "coupon",
                        element: <CouponPage />,
                    },
                    {
                        path: "order",
                        element: <AdminOrderPage />,
                    },
                    {
                        path: "transaction",
                        element: <TransactionPage />,
                    },
                    {
                        path: "customer",
                        element: <CustomerPage />,
                    },
                    {
                        path: "revenue",
                        element: <RevenuePage />,
                    },
                ],
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
