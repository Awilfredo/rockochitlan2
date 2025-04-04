import CarritoIco from "@/Components/Icons/CarritoIco";
import ShopIco from "@/Components/Icons/ShopIco";
import UsersIco from "@/Components/Icons/UsersIco";
import InfoCard from "@/Components/InfoCard";
import DefaultLayout from "@/Layouts/DefaultLayout";

function Index() {
    return (
        <DefaultLayout>
            <div className="container px-6 py-8 mx-auto">
                <h3 className="text-3xl font-medium text-gray-700">
                    Dashboard
                </h3>

                <div className="">
                    <div className="flex flex-wrap -mx-6">
                        <InfoCard
                            svg={<UsersIco></UsersIco>}
                            value={8282}
                            title="New Users"
                        ></InfoCard>

                        <InfoCard
                            svg={<CarritoIco></CarritoIco>}
                            iconBg="bg-orange-600"
                            value={200521}
                            title={"Total Orders"}
                        ></InfoCard>
                        <InfoCard
                            svg={<ShopIco></ShopIco>}
                            iconBg="bg-pink-600"
                            title={"Avaible Products"}
                            value={215}
                        ></InfoCard>
                    </div>
                </div>

                <div className="mt-8"></div>

                <div className="flex flex-col mt-8">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-10 h-10 rounded-full "
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium leading-5 text-gray-900">
                                                        John Doe
                                                    </div>
                                                    <div className="text-sm leading-5 text-gray-500">
                                                        john@example.com
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">
                                                Software Engineer
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                Web dev
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                            Owner
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Index;
