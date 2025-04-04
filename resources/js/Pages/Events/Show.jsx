import DefaultLayout from "@/Layouts/DefaultLayout";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Show = ({ event }) => {
    return (
        <DefaultLayout>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {/* Event Image */}
                    {event.image && (
                        <div className="w-full h-64 md:h-96 relative">
                            <img
                                src={`/storage/${event.image}`}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Event Details */}
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-2xl leading-6 font-bold text-gray-900">
                            {event.title}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            {event.is_public ? "Evento Público" : "Evento Privado"}
                        </p>
                    </div>

                    <div className="border-t border-gray-200">
                        <dl>
                            {/* Description */}
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Descripción
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {event.description}
                                </dd>
                            </div>

                            {/* Date */}
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Fecha
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {format(new Date(event.start_date), "PPP", { locale: es })}
                                    {event.end_date && event.end_date !== event.start_date && (
                                        <> - {format(new Date(event.end_date), "PPP", { locale: es })}</>
                                    )}
                                </dd>
                            </div>

                            {/* Time */}
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Horario
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {event.start_time} - {event.end_time}
                                </dd>
                            </div>

                            {/* Location */}
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Ubicación
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {event.location}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Show;