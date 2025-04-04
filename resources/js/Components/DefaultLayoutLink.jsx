import { Link } from "@inertiajs/react";
function DefaultLayoutLink({ href, children }) {
    return (
        <Link
            className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            href={href}
        >
            {children}
        </Link>
    );
}

export default DefaultLayoutLink;
