import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="px-3 w-full bg-primary">
            <div className="block sm:flex items-center justify-between py-3 px-2">
                <Link
                    to="/"
                    className="block text-3xl font-bold text-center text-white"
                >
                    hcmus@canteen
                </Link>
                <div className="flex items-center justify-between px-10 sm:px-0 gap-x-5 mt-0 sm:mt-4 text-white font-thin">
                    <a
                        href="https://chat.openai.com"
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="https://mui.com"
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}
