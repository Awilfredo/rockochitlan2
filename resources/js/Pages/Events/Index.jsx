import EventCard from '@/Pages/Events/Components/EventCard';
import PrimaryGreenButton from '@/Components/PrimaryGreenButton';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, usePage } from '@inertiajs/react';
function Index({ events }) {
    const user = usePage().props.auth.user;
    return (
        <DefaultLayout>
            <div className="w-full">
                <h1 className="w-ful mb-5 mt-5 text-center text-xl">
                    {events.length ? 'Eventos' : 'No hay eventos'}
                </h1>
                {user?.roles.includes('admin') ? (
                    <div className="mb-5 flex w-full flex-wrap justify-center gap-4 px-2">
                        <Link href={route('events.create')}>
                            <PrimaryGreenButton>
                                Crear Nuevo Evento
                            </PrimaryGreenButton>
                        </Link>
                    </div>
                ) : (
                    ''
                )}
                {events.length ? (
                    <div className="mb-5 flex w-full flex-wrap justify-center gap-4 px-2 sm:grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                        {events.map((element) => (
                            <EventCard key={element.id} event={element} />
                        ))}
                    </div>
                ) : (
                    ''
                )}
            </div>
        </DefaultLayout>
    );
}

export default Index;
