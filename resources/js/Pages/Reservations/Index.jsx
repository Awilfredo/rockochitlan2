import DefaultLayout from '@/Layouts/DefaultLayout';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Index = ({ reservations }) => {
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
                router.delete(route('reservations.destroy', id), {
                    onSuccess: () => {
                        Swal.fire(
                            '¡Eliminado!',
                            'La reservación ha sido eliminada.',
                            'success'
                        )
                    }
                });
            }
        });
    };

    const handleApprove = (id) => {
        router.put(route('reservations.approve', id), {}, {
            onSuccess: () => {
                Swal.fire('¡Aprobada!', 'La reservación ha sido aprobada.', 'success');
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: '¿Motivo del rechazo?',
            input: 'text',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Rechazar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(route('reservations.reject', id), {
                    reason: result.value
                }, {
                    onSuccess: () => {
                        Swal.fire('¡Rechazada!', 'La reservación ha sido rechazada.', 'success');
                    }
                });
            }
        });
    };

    const columns = [
        {
            name: 'Acciones',
            width: '50px',
            cell: (row) => (
                <div className="flex flex-wrap space-x-2 w-full">
                    <Link
                        href={route('reservations.show', row.id)}
                        className="flex items-center text-blue-600 hover:text-blue-900"
                        title="Ver detalles"
                    >
                        <EyeIcon className="h-6 w-6" />
                    </Link>
                    {/* <Link
                        href={route('reservations.edit', row.id)}
                        className="flex items-center text-yellow-600 hover:text-yellow-900"
                        title="Editar"
                    >
                        <PencilSquareIcon className="h-6 w-6" />
                    </Link> */}
                    <button
                        onClick={() => handleApprove(row.id)}
                        className="flex items-center text-green-600 hover:text-green-900"
                        title="Aprobar"
                    >
                        <CheckCircleIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={() => handleReject(row.id)}
                        className="flex items-center text-yellow-600 hover:text-yellow-900"
                        title="Rechazar"
                    >
                        <XCircleIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="flex items-center text-red-600 hover:text-red-900"
                        title="Eliminar"
                    >
                        <TrashIcon className="h-6 w-6" />
                    </button>
                </div>
            ),
            width: '200px',
        },
        {
            name: 'Nombre',
            wrap: true,
            selector: (row) => row.name,
            sortable: true,
            minWidth: '150px',
        },
        {
            name: 'Fecha y Hora',
            selector: (row) => row.reservation_date,
            wrap: true,
            sortable: true,
            format: (row) =>
                new Date(row.reservation_date).toLocaleString('es-ES', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                }),
        },
        {
            name: 'Invitados',
            width:'100px',
            selector: (row) => row.guest_number,
            sortable: true,
        },
        {
            name: 'Estado',
            width:'100px',
            cell: (row) => (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    Confirmada
                </span>
            ),
        },
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f9fafb',
                borderBottomWidth: '1px',
                borderColor: '#e5e7eb',
            },
        },
        headCells: {
            style: {
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                paddingLeft: '1rem',
                paddingRight: '1rem',
            },
        },
        cells: {
            style: {
                width: 'fit-content',
                paddingLeft: '1rem',
                paddingRight: '1rem',
            },
        },
    };

    return (
        <DefaultLayout>
            <Head title="Reservaciones" />

            <div className="w-full p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Lista de Reservaciones
                    </h2>
                    {/* <Link
                        href={route('reservations.create')}
                        className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                    >
                        Nueva Reservación
                    </Link> */}
                </div>

                <DataTable
                    columns={columns}
                    onRowClicked={(row) => router.visit(route('reservations.show', row.id))}
                    pointerOnHover
                    highlightOnHover
                    data={reservations}
                    pagination
                    paginationPerPage={25}
                    customStyles={customStyles}
                    noDataComponent="No hay reservaciones disponibles"
                    striped
                    responsive
                    defaultSortFieldId={2}
                    defaultSortAsc={false}
                />
            </div>
        </DefaultLayout>
    );
};

export default Index;
