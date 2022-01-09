import React from 'react';
import moment from 'moment';
import {
    Flex,
    Stack,
    Text,
    Icon,
    Box
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaRegEdit, FaGlobe } from 'react-icons/fa';
import { Link } from '@inertiajs/inertia-react';

const UserCard = ({ village, auth }) => (
    <div className="bg-white p-3 border-t-4 border-red-400">
        <Stack>
            <small>Nama Desa</small>
            <h3 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {village?.name || '-'}
            </h3>
            {
                village?.website
                    ? (
                        <Box display="flex" color="blue.300">
                            <Icon as={FaGlobe} mr={2} /><a href={village.website} target="_blank" target="_blank" rel="noopener noreferrer">{village.website}</a>
                        </Box>
                    )
                    : ''
            }
            <Box display="flex">
                <Icon as={FaMapMarkerAlt} mr={2} /><small>Alamat Kantor Kepala Desa</small>
            </Box>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {village?.address || '-'}{village?.province ? `, ${village?.province}` : ''}
            </p>
        </Stack>
        <Stack>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                    <span>Tanggal Berdiri</span>
                    <span className="ml-auto">
                        <Text isTruncated>{village?.since ? moment(village.since, "YYYY-MM-DD").format("DD MMM Y") : '-'}</Text>
                    </span>
                </li>
                <li className="flex items-center py-3">
                    <span>ID Desa</span>
                    <span className="ml-auto">
                        <Text isTruncated>-</Text>
                    </span>
                </li>
                <li className="py-3">
                    <strong>Nama Kepala Desa (Lurah)</strong>
                    <br />
                    <span className="ml-auto">
                        <Text isTruncated>{village?.head || '-'}</Text>
                    </span>
                </li>
                <li className="py-3">
                    <strong>Nama Sekretaris Desa</strong>
                    <br />
                    <span className="ml-auto">
                        <Text isTruncated>{village?.secretary || '-'}</Text>
                    </span>
                </li>
                <li className="flex items-center py-3">
                    <span>Jumlah Penduduk Pria</span>
                    <span className="ml-auto">
                        <Text isTruncated>{village?.amount_male || '-'}</Text>
                    </span>
                </li>
                <li className="flex items-center py-3">
                    <span>Jumlah Penduduk Wanita</span>
                    <span className="ml-auto">
                        <Text isTruncated>{village?.amount_female || '-'}</Text>
                    </span>
                </li>
                <li className="flex items-center py-3">
                    <span>Jumlah Usia Produktif (15 – 60 th)</span>
                    <span className="ml-auto">
                        <Text isTruncated>{village?.amount_productive_age || '-'}</Text>
                    </span>
                </li>
                <li className="flex items-center py-3">
                    <span>Luas Wilayah (km²)</span>
                    <span className="ml-auto">
                        <Text isTruncated>{village?.area || '-'}</Text>
                    </span>
                </li>
            </ul>
        </Stack>
    </div>
)

export default UserCard
