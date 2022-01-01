import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function About(props) {
    return (
        <>
            <Head title="RED METRIC | Tentang" />
            <header className="flex flex-wrap items-center justify-between px-12 h-32 -mb-32 relative">
                <ul className="order-last md:order-first flex-1 flex justify-center md:justify-start list-reset">
                    <li>
                        <Link href={route('welcome')}>
                            <span className="text-sm text-grey-darker no-underline hover:text-red-500">
                                Beranda
                            </span>
                        </Link>
                    </li>
                    <li className="ml-8">
                        <Link href={route('about-us')}>
                            <span className="text-sm text-grey-darker underline hover:text-red-500">
                                Tentang
                            </span>
                        </Link>
                    </li>
                    <li className="ml-8">
                        <Link href={route('news')}>
                            <span className="text-sm text-grey-darker no-underline hover:text-red-500">
                                Pers
                            </span>
                        </Link>
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
                <div className="container mx-auto flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-4 flex flex-wrap mb-12 md:mb-0">
                        <div className="p-2 w-1/2">
                            <img src="https://www.desakaranglangit.web.id/desa/upload/artikel/kecil_1578677067_petani.jpg" className="w-full" />
                        </div>
                        <div className="p-2 w-1/2">
                            <img src="https://awsimages.detik.net.id/community/media/visual/2021/01/04/akses-pendidikan-desa-terpencil-di-kerinci-2_169.jpeg?w=700&q=90" className="w-full" />
                        </div>
                        <div className="p-2 w-full">
                            <img src="https://pandudigital.id/wp-content/uploads/2019/02/pandudigtal8a-1140x570.jpg"
                                className="w-full h-64 object-cover" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-4">
                        <h2 className="text-4xl mb-10">Tentang,<br />RED METRIC</h2>
                        <div className="max-w-lg">
                            <p className="mb-6 text-gray-700">
                                Fungsi dari Red Metric sendiri adalah untuk mendorong tercapainya digitalisasi desa yang terkoneksi dengan
                                dunia luar secara daring maupun secara nyata, dan menselaraskan dengan pembentukan Smart City.
                            </p>
                            <p className="mb-6 text-gray-700">
                                Fungsi Red Metric tersebut selaras dengan misi dari Kelompok Kajian Digital ITTP sendiri, yaitu membangun ilmu dan teknologi yang terkait dengan pengembangan Desa Digital (Smart Village).
                            </p>
                            <p className="mb-10 text-gray-700">
                                Mengembangkan jaringan Kerjasama dengan berbagai pemangku kepentingan baik dalam maupun luar negeri terkait dengan pengembangan Desa Digital. Serta memberikan kontribusi tentang Desa Digital.
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
            </div>
        </>
    )
}
