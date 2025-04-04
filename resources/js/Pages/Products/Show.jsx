import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link, router } from "@inertiajs/react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

const Show = ({ product }) => {
    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('products.destroy', product.id), {
                    onSuccess: () => {
                        Swal.fire(
                            '¡Eliminado!',
                            'El producto ha sido eliminado.',
                            'success'
                        )
                    }
                });
            }
        });
    };

    return (
        <DefaultLayout>
            <div className="w-full flex flex-wrap justify-center px-5">
                <div className="w-full xl:w-10/12 p-5 grid grid-cols-1 bg-white rounded-lg shadow-md mb-5">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Detalles del Producto
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Product Information */}
                        <div className="w-full">
                            {/* Nombre */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
                                    {product.name}
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 min-h-[100px]">
                                    {product.description}
                                </div>
                            </div>

                            {/* Precio */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Precio
                                </label>
                                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
                                    ${product.price}
                                </div>
                            </div>

                            {/* Stock */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
                                    {product.stock}
                                </div>
                            </div>

                            {/* Categoría y Subcategoría */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Categoría / Subcategoría
                                </label>
                                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
                                    {product.subcategory.category.name} / {product.subcategory.name}
                                </div>
                            </div>

                            {/* Visible */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Estado
                                </label>
                                <div className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
                                    {product.visible ? 'Visible' : 'No visible'}
                                </div>
                            </div>
                        </div>

                        {/* Product Image */}
                        <div className="lg:col-span-2">
                            <div className="w-full h-full flex items-center justify-center border border-gray-300 rounded-md">
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-center w-full space-x-4 my-6 border-t border-gray-200">
                    <Link
                        href={route('products.edit', product.id)}
                        className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors"
                    >
                        <PencilSquareIcon className="w-5 h-5 mr-2" />
                        Editar
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                        <TrashIcon className="w-5 h-5 mr-2" />
                        Eliminar
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Show;