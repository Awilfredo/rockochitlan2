import DefaultLayout from '@/Layouts/DefaultLayout';
import {
    CheckCircleIcon,
    TrashIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { Card } from 'flowbite-react';
import Swal from 'sweetalert2';

const Show = ({ reservation }) => {
    const handleApprove = () => {
        router.put(
            route('reservations.approve', reservation.id),
            {},
            {
                onSuccess: () => {
                    Swal.fire(
                        '¡Aprobada!',
                        'La reservación ha sido aprobada.',
                        'success',
                    );
                },
            },
        );
    };

    const handleReject = () => {
        Swal.fire({
            title: '¿Motivo del rechazo?',
            input: 'text',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Rechazar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(
                    route('reservations.reject', reservation.id),
                    {
                        reason: result.value,
                    },
                    {
                        onSuccess: () => {
                            Swal.fire(
                                '¡Rechazada!',
                                'La reservación ha sido rechazada.',
                                'success',
                            );
                        },
                    },
                );
            }
        });
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
                router.delete(route('reservations.destroy', reservation.id), {
                    onSuccess: () => {
                        Swal.fire(
                            '¡Eliminada!',
                            'La reservación ha sido eliminada.',
                            'success',
                        );
                    },
                });
            }
        });
    };

    // Format the date to a more readable format
    const formattedDate = new Date(reservation.reservation_date).toLocaleString(
        'es-ES',
        {
            dateStyle: 'long',
            timeStyle: 'short',
        },
    );

    return (
        <DefaultLayout>
            <Head title="Detalles de Reservación" />

            <div className="flex w-full justify-center p-5">
                <div className="mx-auto max-w-2xl">
                    <Card>
                        <div className="mb-6 flex items-center justify-between">
                            <Link
                                href={route('reservations.index')}
                                className="w-fit text-gray-500 hover:text-gray-900"
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
                        </div>

                        <h2 className="mb-6 text-2xl font-bold text-gray-800">
                            Detalles de la Reservación
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Nombre
                                </h3>
                                <p className="mt-1 text-lg text-gray-900">
                                    {reservation.name}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Correo Electrónico
                                </h3>
                                <p className="mt-1 text-lg text-gray-900">
                                    {reservation.email}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Teléfono
                                </h3>
                                <p className="mt-1 text-lg text-gray-900">
                                    {reservation.phone}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Fecha y Hora
                                </h3>
                                <p className="mt-1 text-lg text-gray-900">
                                    {formattedDate}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Número de Invitados
                                </h3>
                                <p className="mt-1 text-lg text-gray-900">
                                    {reservation.guest_number}
                                </p>
                            </div>

                            {reservation.special_request && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Peticiones Especiales
                                    </h3>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {reservation.special_request}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4">
                                <h3 className="text-sm font-medium text-gray-500">
                                    Estado
                                </h3>
                                <span className="mt-1 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                    Confirmada
                                </span>
                            </div>

                            <div className="border-t w-full border-gray-200 pt-6">
                                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                                    <button
                                        onClick={handleApprove}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                                        Aprobar
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                                    >
                                        <XCircleIcon className="h-5 w-5 mr-2" />
                                        Rechazar
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        <TrashIcon className="h-5 w-5 mr-2" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Show;
