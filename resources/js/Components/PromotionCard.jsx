import { router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

function PromotionCard({ promotion }) {
    const user = usePage().props.auth.user;

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
                router.delete(route('promotions.destroy', promotion.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire(
                            '¡Eliminado!',
                            'La promoción ha sido eliminada.',
                            'success',
                        );
                    },
                });
            }
        });
    };

    const handleShare = async () => {
        const shareData = {
            title: promotion.title,
            text: `${promotion.product?.name} - ${promotion.discount}% de descuento`,
            url: route('promotions.show', promotion.id),
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                const url = encodeURIComponent(
                    route('promotions.show', promotion.id),
                );
                const title = encodeURIComponent(
                    `${promotion.title} - ${promotion.discount}% de descuento`,
                );

                Swal.fire({
                    title: 'Compartir promoción',
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
                    showCloseButton: true,
                });
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <div
            className="group relative mx-auto my-5 w-full max-w-sm transform rounded-lg bg-white pb-5 pt-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            // imgAlt={promotion.product?.name || 'Product Image'}
            // imgSrc={`/storage/${promotion.product.image}`}
        >
            <div className="relative h-56 overflow-hidden rounded-t-lg px-0">
                <img
                    src={`/storage/${promotion.product?.image}`}
                    alt={promotion.product?.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                        <h5 className="mb-1 text-2xl font-bold text-white drop-shadow-lg">
                            {promotion.title}
                        </h5>
                        <p className="text-sm text-white/90 drop-shadow-lg">
                            {promotion.product?.name}
                        </p>
                    </div>
                    <div className="absolute right-4 top-4 rotate-12 transform rounded-full bg-red-600 px-4 py-2 text-white shadow-lg">
                        <span className="block text-center text-2xl font-bold">
                            -{promotion.discount}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-b from-white to-gray-50 p-5">
                <div className="space-y-3">
                    <p className="line-clamp-2 text-gray-700">
                        {promotion.description}
                    </p>

                    <div className="flex items-center justify-between border-t pt-3 text-sm">
                        <div className="space-y-1">
                            <div className="flex items-center text-gray-600">
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>
                                    Inicio:{' '}
                                    {new Date(
                                        promotion.start_date,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>
                                    Fin:{' '}
                                    {new Date(
                                        promotion.end_date,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleShare}
                            className="flex items-center text-blue-600 transition-colors hover:text-blue-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-5 w-5"
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
                    </div>
                </div>
            </div>

            {user?.roles.includes('admin') && (
                <div className="lefth-2 absolute top-2 z-10 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <button
                        className="rounded-full bg-yellow-500/90 p-2.5 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-yellow-400"
                        onClick={() => {
                            window.location.href = route(
                                'promotions.edit',
                                promotion.id,
                            );
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </button>

                    <button
                        className="rounded-full bg-red-500/90 p-2.5 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-400"
                        onClick={handleDelete}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default PromotionCard;
