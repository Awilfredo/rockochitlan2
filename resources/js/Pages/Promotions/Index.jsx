import { useState } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from 'flowbite-react';
import PromotionCard from '@/Components/PromotionCard';
import PrimaryGreenButton from '@/Components/PrimaryGreenButton';

export default function Index({ promotions }) {
    return (
        <DefaultLayout>
            <Head title="Promociones" />

            <div className="p-4 sm:p-6 lg:p-8 w-full">
                <div className="sm:flex sm:items-center sm:justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Promociones
                    </h1>
                    <Link href={route('promotions.create')}>
                        <PrimaryGreenButton>
                            Nueva Promoción
                        </PrimaryGreenButton>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                    {promotions.length === 0 ? (
                        <p className="text-gray-500 text-center col-span-full">
                            No hay promociones disponibles
                        </p>
                    ) : (
                        promotions.map((promotion) => (
                            <PromotionCard key={promotion.id} promotion={promotion} />
                        ))
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}