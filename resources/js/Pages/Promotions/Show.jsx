import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, Button } from 'flowbite-react';

export default function Show({ promotion }) {
    return (
        <DefaultLayout>
            <Head title={`Promoción - ${promotion.title}`} />
            
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6 flex items-center justify-between">
                        <Link href={route('promotions.index')}>
                            <Button color="gray" size="sm">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Volver
                            </Button>
                        </Link>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="relative h-64 overflow-hidden bg-gray-200">
                            <img
                                src={`/storage/${promotion.product.image}`}
                                alt={promotion.product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                                <div className="absolute bottom-4 left-4">
                                    <h1 className="text-3xl font-bold text-white mb-2">
                                        {promotion.title}
                                    </h1>
                                    <p className="text-white/90">
                                        {promotion.product.name}
                                    </p>
                                </div>
                                <div className="absolute top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-full">
                                    <span className="text-3xl font-bold block">
                                        -{promotion.discount}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Descripción
                                        </h3>
                                        <p className="mt-2 text-gray-600">
                                            {promotion.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Producto
                                        </h3>
                                        <div className="mt-2 flex items-center space-x-4">
                                            <img
                                                src={`/storage/${promotion.product.image}`}
                                                alt={promotion.product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {promotion.product.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    ${promotion.product.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Detalles de la promoción
                                        </h3>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span>Inicio: {new Date(promotion.start_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Fin: {new Date(promotion.end_date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-6">
                                        <Link href={route('promotions.edit', promotion.id)}>
                                            <Button color="warning">
                                                Editar Promoción
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
}