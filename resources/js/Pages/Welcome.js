import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <>
            <Head title="RED METRIC | Beranda" />
            <header className="flex flex-wrap items-center justify-between px-12 h-32 -mb-32 relative">
                <ul className="order-last md:order-first flex-1 flex justify-center md:justify-start list-reset">
                    <li>
                        <a href={route('welcome')} className="text-sm text-grey-darker underline hover:text-red-500">
                            Beranda
                        </a>
                    </li>
                    <li className="ml-8">
                        <a href={route('about-us')} className="text-sm text-grey-darker no-underline hover:text-red-500">
                            Tentang
                        </a>
                    </li>
                    <li className="ml-8">
                        <a href={route('news')} className="text-sm text-grey-darker no-underline hover:text-red-500">
                            Pers
                        </a>
                    </li>
                </ul>
                <div className="w-full md:w-auto flex justify-center">
                    <a href={route('welcome')} className="block text-center text-red-500 text-lg no-underline">
                        <img src="/images/logo.png" alt={props?.appName} className="w-50 h-auto" />
                    </a>
                </div>
                <ul className="flex-1 flex justify-center md:justify-end list-reset">
                    <li className="ml-8 hidden md:inline">
                        <Link href={props.auth.user ? route('dashboard') : route('login')}>
                            <span className="text-sm font-bold px-4 py-3 no-underline text-white bg-red-500 hover:bg-black">
                                {props.auth.user ? 'Dashboard' : 'Login'}
                            </span>
                        </Link>
                    </li>
                </ul>
            </header>
            <div className="w-full flex flex-wrap md:h-screen pt-32">
                <div className="pt-6 md:pt-0 w-full md:flex-1 md:order-last">
                    <img src="https://ik.imagekit.io/8bnvluby33xpi/bgredmetric_9RD460UhD.jpg?updatedAt=1641004141362&tr=w-1080,h-1080,fo-auto"
                        className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="w-full p-6 pb-12 md:p-12 md:w-5/12 flex justify-center items-center relative">
                    <div className="w-full relative text-center py-12 px-12 md:p-0 md:text-right">
                        <h1 className="text-5xl mb-4">KLASTERISASI DESA</h1>
                        <h2 className="text-2xl mb-4">Pemeringkatan Menuju Desa Cerdas</h2>
                        <p className="mb-10 leading-loose tracking-wide text-gray-700">
                            Mendorong tercapainya <a href="https://id.wikipedia.org/wiki/Transformasi_digital" target="_blank" rel="noopener noreferrer"><u>transformasi digital</u></a>&nbsp;
                            desa yang terkoneksi<br />dengan dunia luar secara daring maupun secara nyata,<br />
                            dan menselaraskan dengan pembentukan <a href="https://id.wikipedia.org/wiki/Kota_cerdas" target="_blank" rel="noopener noreferrer"><strong>Smart City</strong></a>.
                        </p>
                        {!props.auth.user && (
                            <Link href={route('register')}>
                                <span className="inline-block bg-black text-white px-6 py-3 text-sm hover:bg-red-500">
                                    Bergabung Sekarang
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
