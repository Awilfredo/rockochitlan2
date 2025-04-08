import DefaultLayoutLink from '@/Components/DefaultLayoutLink';
import AppLogo from '@/Components/Icons/AppLogo';
import EventIcon from '@/Components/Icons/EventIcon';
import HomeIcon from '@/Components/Icons/HomeIcon';
import MenuIcon from '@/Components/Icons/MenuIcon';
import ReservationIcon from '@/Components/Icons/ReservationIco';
import SaleIcon from '@/Components/Icons/SaleIcon';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ScrollToTopButton from '@/Components/ScrollTopButton';
import { Link, usePage } from '@inertiajs/react';
import { Footer } from 'flowbite-react';
import { useRef, useState } from 'react';
import {
    BsBriefcaseFill,
    BsDribbble,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTwitter,
    BsWhatsapp,
} from 'react-icons/bs';

function DefaultLayout({ children }) {
    const user = usePage().props.auth.user;

    const scrollContainerRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="flex w-full overflow-y-auto bg-gray-200">
            <style>
                {`
                    .menu {
                        width: 15rem;
                    }
                    @media (min-width: 1024px) {
                        .menu {
                            width: 100rem;
                        }
                    }
                `}
            </style>
            {/* Sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black opacity-50 transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                // className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 h-full max-h-[calc(100vh-1rem)] overflow-y-auto pt-10 overflow-x-hidden ${
                //     sidebarOpen
                //         ? "translate-x-0 ease-out"
                //         : "-translate-x-full ease-in"
                // }`}

                className={`${
                    sidebarOpen
                        ? 'translate-x-0 ease-out'
                        : '-translate-x-full ease-in'
                } menu fixed inset-y-0 left-0 z-30 transform overflow-y-auto overflow-x-hidden bg-gray-900 pt-10 transition duration-300 lg:static lg:inset-0 lg:translate-x-0`}
            >
                <div className="mt-8 w-64">
                    <div className="flex flex-wrap items-center">
                        <AppLogo></AppLogo>
                        <span className="mx-2 text-xl font-semibold text-white lg:text-2xl">
                            ROCKOCHITLÁN
                        </span>
                    </div>
                </div>

                <nav className="w-64">
                    {user?.roles.includes('admin') ? (
                        <DefaultLayoutLink href={route('dashboard')}>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                                ></path>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                                ></path>
                            </svg>
                            <span className="mx-3">Dashboard</span>
                        </DefaultLayoutLink>
                    ) : (
                        ''
                    )}
                    <DefaultLayoutLink href={route('home')}>
                        <HomeIcon></HomeIcon>
                        <span className="mx-3">Inicio</span>
                    </DefaultLayoutLink>
                    {user?.roles.includes('admin') ? (
                        <DefaultLayoutLink href={route('reservations.index')}>
                            <ReservationIcon className="w-6" />
                            <span className="mx-3">Reservaciones</span>
                        </DefaultLayoutLink>
                    ) : (
                        ''
                    )}
                    <DefaultLayoutLink href={route('products.index')}>
                        <MenuIcon />
                        <span className="mx-3">Menú</span>
                    </DefaultLayoutLink>
                    <DefaultLayoutLink href={route('events.index')}>
                        <EventIcon />
                        <span className="mx-3">Eventos</span>
                    </DefaultLayoutLink>
                    <DefaultLayoutLink href={route('promotions.index')}>
                        <SaleIcon />
                        <span className="mx-3">Promociones</span>
                    </DefaultLayoutLink>
                    {/* More menu items */}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex h-svh overflow-auto" ref={scrollContainerRef}>
                <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b-4 border-indigo-600 bg-white px-6 py-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-500 focus:outline-none lg:hidden"
                        >
                            <svg
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6H20M4 12H20M4 18H11"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </button>

                        {/*Buscador de productos*/}
                        {/* <div className="relative mx-4 lg:mx-0">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                    className="w-5 h-5 text-gray-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </span>

                            <input
                                className="w-32 pl-10 pr-4 rounded-md form-input sm:w-64 focus:border-indigo-600"
                                type="text"
                                placeholder="Search"
                            />
                        </div> */}
                    </div>

                    <div className="flex items-center gap-5">
                        <Link
                            href={route('home')}
                            className="ml-4 text-gray-700 hover:text-blue-700 lg:hidden"
                        >
                            <HomeIcon></HomeIcon>
                        </Link>

                        <Link
                            href={route('products.index')}
                            className="ml-4 text-gray-700 hover:text-blue-700 lg:hidden"
                        >
                            <MenuIcon></MenuIcon>
                        </Link>
                    </div>

                    {user ? (
                        <div className="flex items-center">
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setNotificationOpen(!notificationOpen)
                                    }
                                    className="mx-4 flex text-gray-600 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17H15Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </button>

                                {notificationOpen && (
                                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white"
                                        >
                                            Notification 1
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white"
                                        >
                                            Notification 2
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    className="relative block h-8 w-8 overflow-hidden rounded-full shadow focus:outline-none"
                                >
                                    {/* <img
                                        className="h-full w-full object-cover"
                                        src="https://randomuser.me/api/portraits/men/32.jpg"
                                        alt="Your avatar"
                                    /> */}

                                    <AppLogo className='w-8 h-8 text-blue-600'></AppLogo>

                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white"
                                        >
                                            Profile
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white"
                                        >
                                            Settings
                                        </a>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route('logout')}
                                            as="button"
                                            className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white"
                                        >
                                            Salir
                                        </ResponsiveNavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <Link
                            href={route('login')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Log in
                        </Link>
                    )}
                </header>
                <div className="w-full mt-24 flex flex-wrap">
                    <main className="w-full flex flex-wrap">{children}</main>

                    <div className="w-full">
                        <Footer bgDark className='w-full'>
                            <div className="w-full">
                                <div className="grid-cols grid w-full gap-8 px-6 py-8">
                                    {/* <div>
                                        <Footer.Title title="Company" />
                                        <Footer.LinkGroup col>
                                            <Footer.Link href="#">
                                                About
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                Careers
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                Brand Center
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                Blog
                                            </Footer.Link>
                                        </Footer.LinkGroup>
                                    </div> */}
                                    <div>
                                        <Footer.Title title="Contáctanos" />
                                        <Footer.LinkGroup
                                            col={false}
                                            className="flex-wrap justify-center gap-4"
                                        >
                                            <Footer.Link
                                          
                                                href="https://wa.me/72836378"
                                                target='blank'
                                            >
                                                <BsWhatsapp className="mx-auto mb-2 h-8 w-8 text-green-500" />
                                                WhatsApp
                                            </Footer.Link>
                                            <Footer.Link href="https://www.instagram.com/rockochitlan_grill_music?igsh=MWI5bmV2a2hoM2EzMQ==" target='blank'>
                                                <BsInstagram className="mx-auto mb-2 h-8 w-8 text-purple-700" />
                                                Instagram
                                            </Footer.Link>
                                            <Footer.Link href="https://www.facebook.com/share/16L6EHY6na/ " target='blank'>
                                                <BsFacebook className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                                                Facebook
                                            </Footer.Link>
                                            {/* <Footer.Link href="#">
                                                Contact Us
                                            </Footer.Link> */}
                                        </Footer.LinkGroup>
                                    </div>
                                    {/* <div>
                                        <Footer.Title title="legal" />
                                        <Footer.LinkGroup col>
                                            <Footer.Link href="#">
                                                Privacy Policy
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                Licensing
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                Terms &amp; Conditions
                                            </Footer.Link>
                                        </Footer.LinkGroup>
                                    </div>
                                    <div>
                                        <Footer.Title title="download" />
                                        <Footer.LinkGroup col>
                                            <Footer.Link href="#">
                                                iOS
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                Android
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                Windows
                                            </Footer.Link>
                                            <Footer.Link href="#">
                                                MacOS
                                            </Footer.Link>
                                        </Footer.LinkGroup>
                                    </div> */}
                                </div>
                                <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
                                    <Footer.Copyright
                                        href="#"
                                        by="Wilfredo Cruz"
                                        year={2025}
                                    />
                                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                                        <Footer.Icon
                                            href="https://www.facebook.com/share/1FoUUNRr38/"
                                            icon={BsFacebook}
                                        />
                                        <Footer.Icon
                                            href="https://www.instagram.com/w1lfredo0_0?utm_source=qr&igsh=MWVhczdicmlsN20yeA=="
                                            target='blank'
                                            icon={BsInstagram}
                                        />
                                        {/* <Footer.Icon
                                            href="#"
                                            icon={BsTwitter}
                                        /> */}
                                        <Footer.Icon href="https://github.com/Awilfredo" target='blank' icon={BsGithub} />
                                        <Footer.Icon
                                            href="https://awilfredo.github.io/portafolio/"
                                            target='blank'
                                            icon={BsBriefcaseFill}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Footer>
                    </div>
                </div>
            </div>
            <ScrollToTopButton scrollRef={scrollContainerRef} />
        </div>
    );
}

export default DefaultLayout;
