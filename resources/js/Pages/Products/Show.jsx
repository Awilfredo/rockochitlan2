import DefaultLayout from '@/Layouts/DefaultLayout';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Show = ({ product }) => {
    const user = usePage().props.auth.user;
    
    const handleShare = async () => {
        const shareData = {
            title: product.name,
            text: product.description,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support Web Share API
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(product.name);
                
                Swal.fire({
                    title: 'Compartir producto',
                    html: `
                        <div class="flex flex-col space-y-3">
                            <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" 
                               target="_blank" 
                               class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                Compartir en Facebook
                            </a>
                            <a href="https://twitter.com/intent/tweet?url=${url}&text=${title}" 
                               target="_blank"
                               class="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600">
                                Compartir en Twitter
                            </a>
                            <a href="https://wa.me/?text=${title}%20${url}"
                               target="_blank"
                               class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                Compartir en WhatsApp
                            </a>
                        </div>
                    `,
                    showConfirmButton: false,
                    showCloseButton: true
                });
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };
    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('products.destroy', product.id), {
                    onSuccess: () => {
                        Swal.fire(
                            '¡Eliminado!',
                            'El producto ha sido eliminado.',
                            'success',
                        );
                    },
                });
            }
        });
    };

    return (
        <DefaultLayout>
            <div className="flex w-full flex-wrap justify-center px-5">
                <div className="mb-5 grid w-full grid-cols-1 rounded-lg bg-white p-5 shadow-md xl:w-10/12">
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">
                        Detalles del Producto
                    </h2>
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        {/* Product Information */}
                        <div className="w-full">
                            {/* Nombre */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2">
                                    {product.name}
                                </div>
                            </div>

                            {/* Descripción */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <div className="mt-1 min-h-[100px] rounded-md border border-gray-300 bg-gray-50 px-4 py-2">
                                    {product.description}
                                </div>
                            </div>

                            {/* Precio */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Precio
                                </label>
                                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2">
                                    ${product.price}
                                </div>
                            </div>

                            {/* Stock */
                            user?.roles.includes('admin') &&
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2">
                                    {product.stock}
                                </div>
                            </div>
                            }

                            {/* Categoría y Subcategoría */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Categoría / Subcategoría
                                </label>
                                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2">
                                    {product.subcategory.category.name} /{' '}
                                    {product.subcategory.name}
                                </div>
                            </div>

                            {/* Visible */
                            user?.roles.includes('admin') &&
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Estado
                                </label>
                                <div className="mt-1 rounded-md border border-gray-300 bg-gray-50 px-4 py-2">
                                    {product.visible ? 'Visible' : 'No visible'}
                                </div>
                            </div>
                            }
                        </div>

                        {/* Product Image */}
                        <div className="lg:col-span-2">
                            <div className="flex h-full w-full items-center justify-center rounded-md border border-gray-300">
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Share and Action Buttons */}
                <div className="my-6 flex w-full justify-center space-x-4 border-t border-gray-200 pt-6">
                    <button
                        onClick={handleShare}
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                        </svg>
                        Compartir
                    </button>

                    {user?.roles?.includes('admin') && (
                        <>
                            <Link
                                href={route('products.edit', product.id)}
                                className="inline-flex items-center rounded-md bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700"
                            >
                                <PencilSquareIcon className="mr-2 h-5 w-5" />
                                Editar
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                            >
                                <TrashIcon className="mr-2 h-5 w-5" />
                                Eliminar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Show;
