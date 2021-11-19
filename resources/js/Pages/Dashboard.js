import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Uploader from '@/Components/Uploader';
import moment from 'moment'

export default function Dashboard(props) {
    const { membership, village } = props
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                {/*<img className="h-auto w-full mx-auto"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                />*/}
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{membership?.first_name?.toUpperCase() || props.auth.user.name?.toUpperCase() || 'Your Name'}</h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">{props.auth.user.email || 'Belum ada email'}</h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                {membership ? `${membership.address}, Kec. ${membership.subdistrict} Kab/Kota ${membership.city}, ${membership.province}` : ''}
                            </p>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        {
                                            props.auth.user.email_verified_at
                                                ? <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Verified</span>
                                                : <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Unverified</span>
                                        }
                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">
                                        {props.auth.user.created_at ? moment(props.auth.user.created_at, "YYYY-MM-DD").format("DD MMM Y") : '-'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* End of profile card */}
                        <div className="my-4"></div>


                    </div>

                    <div className="w-full md:w-9/12 mx-2 h-64">
                        {/* Profile tab */}
                        {/* About Section */}
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Data Desa / Kelurahan</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Nama Desa / Kelurahan</div>
                                        <div className="px-4 py-2">{village?.name || '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Tanggal Berdiri</div>
                                        <div className="px-4 py-2">{village?.since ? moment(village.since, "YYYY-MM-DD").format("DD MMM Y") : '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Kepala Desa / Lurah</div>
                                        <div className="px-4 py-2">{village?.head || '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Alamat</div>
                                        <div className="px-4 py-2">{village?.address || '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Sekretaris Desa / Lurah</div>
                                        <div className="px-4 py-2">{village?.secretary || '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Provinsi</div>
                                        <div className="px-4 py-2">{village?.province || '-'}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Luas Wilayah Desa</div>
                                        <div className="px-4 py-2">{village?.area || ''}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Alamat Website Official Desa</div>
                                        <div className="px-4 py-2"><a className="text-blue-800" href="#" target="_blank" rel="noopener noreferrer">{village?.website || '-'}</a></div>
                                    </div>
                                </div>
                            </div>
                            <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-blue-100 hover:shadow-xs p-3 my-4">
                                Edit Data Desa / Kelurahan
                            </button>
                            <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-blue-100 hover:shadow-xs p-3 my-4">
                                Download Surat Tugas
                            </button>
                        </div>
                        {/* End of about section */}

                        <div className="my-4"></div>

                        {/* Experience and education */}
                        <div className="bg-white p-3 shadow-sm rounded-sm">

                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span clas="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Unggah Identitas Penduduk (KTP) </span>
                                    </div>
                                    <div className="p-3">
                                        <Uploader />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span clas="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path fill="#fff"
                                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Unggah Surat Tugas Desa</span>
                                    </div>
                                    <div className="p-3">
                                        <Uploader />
                                    </div>
                                </div>
                            </div>
                            {/* End of Experience and education grid */}
                        </div>
                        {/* End of profile tab */}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}