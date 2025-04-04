import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card } from 'flowbite-react';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

const Index = ({ images }) => {
    const handleDelete = (id) => {
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
                router.delete(route('images.destroy', id), {
                    onSuccess: () => Swal.fire('¡Eliminado!', 'La imagen ha sido eliminada.', 'success')
                });
            }
        });
    };

    return (
        <DefaultLayout>
            <Head title="Imágenes" />
            
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Galería de Imágenes</h2>
                    <Link
                        href={route('images.create')}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        Nueva Imagen
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((image) => (
                        <Card key={image.id}>
                            <img
                                src={`/storage/${image.file_path}`}
                                alt={image.alt_text}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <p className="text-sm text-gray-600">{image.section}</p>
                                <p className="mt-1 text-gray-500">{image.alt_text}</p>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <Link href={route('images.show', image.id)}>
                                        <EyeIcon className="h-5 w-5 text-blue-600 hover:text-blue-800" />
                                    </Link>
                                    <Link href={route('images.edit', image.id)}>
                                        <PencilSquareIcon className="h-5 w-5 text-yellow-600 hover:text-yellow-800" />
                                    </Link>
                                    <button onClick={() => handleDelete(image.id)}>
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Index;