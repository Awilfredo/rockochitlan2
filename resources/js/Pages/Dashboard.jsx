import CarritoIco from '@/Components/Icons/CarritoIco';
import FoodIcon from '@/Components/Icons/FoodIcon';
import ShopIco from '@/Components/Icons/ShopIco';
import UsersIco from '@/Components/Icons/UsersIco';
import InfoCard from '@/Components/InfoCard';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, router } from '@inertiajs/react';

export default function Dashboard({ users, reservations, products }) {
    return (
        <DefaultLayout>
            <Head title="Dashboard" />
            <div className="px-5">
            <h3 className="text-3xl font-medium text-gray-700">
                    Dashboard
                </h3>
                <div className="flex flex-wrap py-5">
                    <InfoCard
                        onClick={() => router.visit(route('users.index'))}
                        svg={<UsersIco></UsersIco>}
                        value={users}
                        title="Usuarios registrados"
                    ></InfoCard>

                    <InfoCard
                    onClick={() => router.visit(route('products.index'))}
                        svg={<FoodIcon className='w-8 h-8 text-white'></FoodIcon>}
                        iconBg="bg-orange-600"
                        value={products}
                        title={'Total de productos'}
                    ></InfoCard>

                    <InfoCard
                        svg={<CarritoIco></CarritoIco>}
                        iconBg="bg-orange-600"
                        value={products}
                        title={'Total de productos'}
                    ></InfoCard>
                    <InfoCard
                        svg={<ShopIco></ShopIco>}
                        iconBg="bg-pink-600"
                        title={'Total de reservaciones'}
                        value={reservations}
                    ></InfoCard>
                </div>
            </div>
        </DefaultLayout>
    );
}
