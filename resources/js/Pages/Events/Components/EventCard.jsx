import Modal from '@/Components/Modal';
import ReservationForm from '@/Components/ReservationForm';
import { Card } from 'flowbite-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

function EventCard({ event }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <Card
            className="max-w-sm pt-0"
            imgAlt={event?.title || 'Imagen del evento'}
            imgSrc={
                event.image
                    ? `storage/${event.image}`
                    : 'https://flowbite-react.com/images/products/apple-watch.png'
            }
        >
            <a href={route('events.show', event.id)}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {event?.title || 'Título del evento'}
                </h5>
            </a>

            <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CalendarIcon className="h-5 w-5" />
                    <span>
                        {event.start_date !== event.end_date ?

                            format(new Date(event.start_date), 'dd MMM yyyy', { locale: es }) - 
                        format(new Date(event.end_date), 'dd MMM yyyy', { locale: es })
                            :
                            format(new Date(event.start_date), 'dd MMM yyyy', { locale: es })
                        }
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ClockIcon className="h-5 w-5" />
                    <span>
                        {event.start_time} - {event.end_time}
                    </span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{event.location}</span>
                </div>

                <p className="text-gray-700 dark:text-gray-400">
                    {event?.description || 'Descripción del evento'}
                </p>
            </div>

            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Hacer Reservación
                </button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="max-h-[90vh] relative overflow-y-auto">
                    <div className="absolute top-0 right-0 z-10">
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-white hover:text-gray-100 m-2 bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <ReservationForm event={event} onClick={()=>setShowModal(false)} />
                </div>
            </Modal>
        </Card>
    );
}

export default EventCard;
