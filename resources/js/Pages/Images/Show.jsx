import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link } from '@inertiajs/react';
import { Card } from 'flowbite-react';

const Show = ({ image }) => {
    return (
        <DefaultLayout>
            <Head title="Detalles de Imagen" />

            <div className="p-6">
                <div className="mx-auto max-w-2xl">
                    <Card>
                        <Link
                            href={route('images.index')}
                            className="text-gray-500 hover:text-gray-900 w-fit"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                />
                            </svg>
                        </Link>

                        <img
                            src={`/storage/${image.file_path}`}
                            alt={image.alt_text}
                            className="h-96 w-full object-contain"
                        />

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Sección</h3>
                                <p className="mt-1 text-lg text-gray-900">{image.section}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Texto Alternativo</h3>
                                <p className="mt-1 text-lg text-gray-900">{image.alt_text}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Posición</h3>
                                <p className="mt-1 text-lg text-gray-900">{image.position}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Show;