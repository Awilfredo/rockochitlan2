import { useForm, usePage } from "@inertiajs/react";
import { Card } from "flowbite-react";
import { useEffect } from "react";
import Swal from "sweetalert2";

function ReservationForm({event, onClick=()=>{}}) {   
    const user = usePage().props.auth.user;
    const { data, setData, post, errors, reset, processing } = useForm({
        name: user?.name || '',
        user_id: user?.id || null,
        email: user?.email || '',
        phone: '',
        reservation_date: event ? `${event.start_date}T${event.start_time}` : '',
        guest_number: '1',
        special_request: ''
    });    

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('reservations.store'), {
            preserveScroll: true,
            onSuccess: (res) => {
                reset();
                Swal.fire({
                    title: '¡Reservación Realizada!',
                    text: 'Tu reservación ha sido realizada con éxito.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            onError: (errors) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, verifica los datos ingresados.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3B82F6'
                });
            },
            onFinish: () => {
                // Additional cleanup if needed
                event ? onClick() : null;
            }
        });
    };

    return (
        <Card className="max-w-2xl mx-auto bg-white p-6 shadow-md relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hacer una Reservación</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Tu nombre"
                        required
                    />
                    {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        placeholder="tu.correo@ejemplo.com"
                        required
                    />
                    {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Tu número de teléfono"
                        required
                    />
                    {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha y Hora
                        </label>
                        <input
                            type="datetime-local"
                            value={data.reservation_date}
                            onChange={e => setData('reservation_date', e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                            required
                        />
                        {errors.reservation_date && <div className="text-red-600 text-sm mt-1">{errors.reservation_date}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Invitados
                        </label>
                        <input
                            type="number"
                            value={data.guest_number}
                            onChange={e => setData('guest_number', e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                            min="1"
                            max="10"
                            required
                        />
                        {errors.guest_number && <div className="text-red-600 text-sm mt-1">{errors.guest_number}</div>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Peticiones Especiales
                    </label>
                    <textarea
                        value={data.special_request}
                        onChange={e => setData('special_request', e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        rows="4"
                        placeholder="¿Tienes alguna petición o preferencia especial?"
                    ></textarea>
                    {errors.special_request && <div className="text-red-600 text-sm mt-1">{errors.special_request}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-blue-600 py-3 text-white font-semibold transition-all duration-200 hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Realizando Reservación...' : 'Hacer Reservación'}
                </button>
            </form>
        </Card>
    );
}

export default ReservationForm;