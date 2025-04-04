import EditButton from '@/Components/EditButton';
import EventCard from '@/Pages/Events/Components/EventCard';
import MapLocation from '@/Components/MapLocation';
import PrimaryButton from '@/Components/PrimaryButton';
import ProductCard from '@/Components/ProductCard';
import ReservationForm from '@/Components/ReservationForm';
import Section from '@/Components/Section';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Carousel } from 'flowbite-react';
import Swal from 'sweetalert2';
import EditContent from './PageContents/Components/EditContent';
import { useState } from 'react';

export default function Welcome({
    laravelVersion,
    phpVersion,
    featured,
    events,
    products,
    pageContents
}) {
    const user = usePage().props.auth.user;
    const [showEditContenModal, setShowEditContenModal] = useState(false);
    const [editContent, setEditContent] = useState({
        contentKey:'',
        initialContent: '',
        url: '',
    });
    

    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const handleEdit = (text, url) => {
        setShowEditContenModal(true);
        setEditContent({
            contentKey:'',
            initialContent: text,
            url: url,
        });
    };

    return (
        <DefaultLayout>
            <Head title="Welcome" />
            <div className="flex h-56 w-full flex-wrap sm:h-64 xl:h-80 2xl:h-96">
                <Carousel pauseOnHover>
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                        alt="..."
                    />
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
                        alt="..."
                    />
                </Carousel>
                {user?.roles.includes('admin') ? (
                    <div className="mt-5 flex w-full justify-center">
                        <EditButton></EditButton>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <Section>
                <div className="card m-10 max-w-4xl">
                    <div className="flex flex-wrap justify-center gap-4">
                        <h1 className="text-center text-3xl">
                            {pageContents.find(content=>content.key==='home_tittle').content}
                        </h1>
                        {user?.roles.includes('admin') ? (
                            <EditButton
                                onClick={() => handleEdit('Editar Nombre')}
                            ></EditButton>
                        ) : (
                            ''
                        )}
                    </div>

                    <p className="mt-5 text-xl">
                        Ven y vive una gran experiencia con nuestros exquisitos
                        platos y las mejores cervezas acompañado de la buena
                        Música. Trae a toda tu familia y amigos para vivir un
                        momento maravilloso, lleno de sensaciones al paladar.
                        {user?.roles.includes('admin') ? (
                            <EditButton
                                className="ml-5"
                                onClick={() => handleEdit('Editar descripcion')}
                            ></EditButton>
                        ) : (
                            ''
                        )}
                    </p>
                </div>
                <div className="flex w-full flex-wrap justify-center gap-4">
                    <Link
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                        href={route('products.index')}
                    >
                        <svg
                            className="mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M9 3a2 2 0 0 1 1.972 2.335l1.973.33a4.011 4.011 0 0 0-.005-1.361A2 2 0 0 1 15.733 7H5a1 1 0 1 1 .539-1.843a1 1 0 0 0 1.513-.614A2.001 2.001 0 0 1 9 3Zm1.516-1.703A3.998 3.998 0 0 0 5.51 3.043A3 3 0 0 0 3 8.236V20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2h2a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2v-.354a4 4 0 0 0-4.896-6.169a4.01 4.01 0 0 0-1.588-1.18ZM17 11h2v7h-2v-7Zm-2-2v11H5V9h10Zm-8 2v7h2v-7H7Zm6 0v7h-2v-7h2Z"
                            />
                        </svg>
                        Ver Menú
                    </Link>
                    <PrimaryButton>Reservar Mesa</PrimaryButton>
                </div>
            </Section>
            {featured.length ? (
                <Section>
                    <h2 className="mb-5 w-full text-center text-3xl">
                        Menú Destacado
                    </h2>

                    <div className="w-full flex flex-wrap justify-center md:grid md:grid-cols-2 xl:grid-cols-3 ">
                        {featured.map((element, index) => (
                            <ProductCard
                                key={index}
                                product={element}
                            ></ProductCard>
                        ))}
                    </div>
                    <div className="mt-5 flex w-full justify-center">
                        <Link
                            href={route('products.index')}
                            className="mx-2 my-2 rounded bg-indigo-700 px-6 py-2 text-xs text-white transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                            Ver más...
                        </Link>
                    </div>
                </Section>
            ) : (
                ''
            )}

            {/* Next Events */}
            {events.length ? (
                <Section>
                    <div className="title mb-5 w-full pt-28 text-center text-3xl font-semibold">
                        Próximo Evento
                    </div>

                    {events.map((event, index) => (
                        <EventCard key={index} event={event}></EventCard>
                    ))}
                    <div className="mt-5 flex w-full justify-center">
                        <Link
                            href={route('events.index')}
                            className="mx-2 my-2 rounded bg-indigo-700 px-6 py-2 text-xs text-white transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                            Ver más...
                        </Link>
                    </div>
                </Section>
            ) : (
                ''
            )}

            <Section
            >
                <ReservationForm></ReservationForm>
            </Section>

            <Section className="flex w-full justify-center px-5">
                <div className="flex gap-4 mb-6">
                    <a
                        href="https://maps.google.com/?q=ROCKOCHITLAN"
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-md hover:bg-gray-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                            <rect width="512" height="512" rx="15%" fill="#ffffff"/>
                            <g clipPath="url(#a)">
                                <path stroke="#fbbc04" strokeWidth="130" d="M104 379l152-181"/>
                                <path stroke="#4285f4" strokeWidth="130" d="M256 198L378 53"/>
                                <path stroke="#34a853" strokeWidth="130" d="M189 459l243-290"/>
                                <path stroke="#1a73e8" strokeWidth="130" d="M255 120l-79-67"/>
                                <path stroke="#ea4335" strokeWidth="130" d="M76 232l91-109"/>
                            </g>
                            <circle cx="256" cy="198" r="51" fill="#ffffff"/>
                            <defs>
                                <clipPath id="a">
                                    <path d="M375 136a133 133 0 00-79-66 136 136 0 00-40-6 133 133 0 00-103 48 133 133 0 00-31 86c0 38 13 64 13 64 15 32 42 61 61 86a399 399 0 0130 45 222 222 0 0117 42c3 10 6 13 13 13s11-5 13-13a228 228 0 0116-41 472 472 0 0145-63c5-6 32-39 45-64 0 0 15-29 15-68 0-37-15-63-15-63z"/>
                                </clipPath>
                            </defs>
                        </svg>
                        Google Maps
                    </a>
                    <a
                        href="https://waze.com/ul?q=ROCKOCHITLAN"
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#33CCFF] px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-[#28a3cc]"
                    >
                        <svg className='text-black' version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 122.71 122.88">
                            <g>
                                <path fill="#FFFFFF" d="M55.14,104.21c4.22,0,8.44,0.19,12.66-0.09c3.84-0.19,7.88-0.56,11.63-1.5c29.82-7.31,45.76-40.23,32.72-68.07 C104.27,17.76,90.77,8.19,72.3,6.22c-14.16-1.5-26.82,2.72-37.51,12.28c-10.5,9.47-15.94,21.28-16.31,35.44 c-0.09,3.28,0,6.66,0,9.94C18.38,71.02,14.35,76.55,7.5,78.7c-0.09,0-0.28,0.19-0.38,0.19c2.63,6.94,13.31,17.16,19.97,19.69 C35.45,87.14,52.32,91.18,55.14,104.21L55.14,104.21z"/>
                                <path fill="currentColor" d="M54.95,110.49c-1.03,4.69-3.56,8.16-7.69,10.31c-5.25,2.72-10.6,2.63-15.57-0.56c-5.16-3.28-7.41-8.25-7.03-14.35 c0.09-1.03-0.19-1.41-1.03-1.88c-9.1-4.78-16.31-11.44-21.28-20.44c-0.94-1.78-1.69-3.66-2.16-5.63c-0.66-2.72,0.38-4.03,3.19-4.31 c3.38-0.38,6.38-1.69,7.88-4.88c0.66-1.41,1.03-3.09,1.03-4.69c0.19-4.03,0-8.06,0.19-12.1c1.03-15.57,7.5-28.5,19.32-38.63 C42.67,3.97,55.42-0.43,69.76,0.03c25.04,0.94,46.51,18.57,51.57,43.23c4.59,22.32-2.34,40.98-20.07,55.51 c-1.03,0.84-2.16,1.69-3.38,2.44c-0.66,0.47-0.84,0.84-0.56,1.59c2.34,7.13-0.94,15-7.5,18.38c-8.91,4.41-19.22-0.09-21.94-9.66 c-0.09-0.38-0.56-0.84-0.84-0.84C63.11,110.4,59.07,110.49,54.95,110.49L54.95,110.49z M55.14,104.21c4.22,0,8.44,0.19,12.66-0.09 c3.84-0.19,7.88-0.56,11.63-1.5c29.82-7.31,45.76-40.23,32.72-68.07C104.27,17.76,90.77,8.19,72.3,6.22 c-14.16-1.5-26.82,2.72-37.51,12.28c-10.5,9.47-15.94,21.28-16.31,35.44c-0.09,3.28,0,6.66,0,9.94 C18.38,71.02,14.35,76.55,7.5,78.7c-0.09,0-0.28,0.19-0.38,0.19c2.63,6.94,13.31,17.16,19.97,19.69 C35.45,87.14,52.32,91.18,55.14,104.21L55.14,104.21z"/>
                                <path fill="currentColor" d="M74.92,79.74c-11.07-0.56-18.38-4.97-23.07-13.78c-1.13-2.16-0.09-4.31,2.06-4.78c1.31-0.28,2.53,0.66,3.47,2.16 c1.22,1.88,2.44,3.75,4.03,5.25c8.81,8.34,23.25,5.72,28.79-5.06c0.66-1.31,1.5-2.34,3.09-2.34c2.34,0.09,3.66,2.44,2.63,4.59 c-2.91,5.91-7.5,10.22-13.69,12.28C79.51,78.99,76.7,79.36,74.92,79.74L74.92,79.74z"/>
                                <path fill="currentColor" d="M55.32,48.98c-3.38,0-6.09-2.72-6.09-6.09s2.72-6.09,6.09-6.09s6.09,2.72,6.09,6.09C61.42,46.17,58.7,48.98,55.32,48.98 L55.32,48.98z"/>
                                <path fill="currentColor" d="M98.27,42.79c0,3.38-2.72,6.09-6,6.19c-3.38,0-6.09-2.63-6.09-6.09c0-3.38,2.63-6.09,6-6.19 C95.46,36.7,98.17,39.42,98.27,42.79L98.27,42.79z"/>
                            </g>
                        </svg>
                        Waze
                    </a>
                </div>
                <MapLocation></MapLocation>
                <EditContent show={true}></EditContent>
            </Section>
        </DefaultLayout>
    );
}
