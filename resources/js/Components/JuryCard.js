import React from 'react';
import moment from 'moment';
import {
    Flex,
    Stack,
    Text,
    Icon,
    Box
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from '@inertiajs/inertia-react';

const JuryCard = ({ membership }) => (
    <div className="bg-white p-3 border-t-4 border-red-400">
        <Stack>
            <small>Nama Lengkap</small>
            <h3 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {membership?.first_name || ''} {membership?.last_name || ''}
            </h3>
            <Box display="flex">
                <Icon as={FaMapMarkerAlt} mr={2} /><small>Alamat</small>
            </Box>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {membership?.address || '-'}{membership?.province ? `, ${membership?.province}` : ''}
            </p>
        </Stack>
        <Stack>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="py-3">
                    <strong>Kecamatan</strong>
                    <br />
                    <span className="ml-auto">
                        <Text isTruncated>{membership?.subdistrict || '-'}</Text>
                    </span>
                </li>
                <li className="py-3">
                    <strong>Kabupaten/Kota</strong>
                    <br />
                    <span className="ml-auto">
                        <Text isTruncated>{membership?.city || '-'}</Text>
                    </span>
                </li>
                <li className="py-3">
                    <strong>Provinsi</strong>
                    <br />
                    <span className="ml-auto">
                        <Text isTruncated>{membership?.province || '-'}</Text>
                    </span>
                </li>
                <li className="flex items-center py-3">
                    <span>E-mail</span>
                    <span className="ml-auto">
                        <Text isTruncated>{membership?.email || '-'}</Text>
                    </span>
                </li>
                <li className="flex items-center py-3">
                    <span>No. Handphone</span>
                    <span className="ml-auto">
                        <Text isTruncated>{membership?.phone || '-'}</Text>
                    </span>
                </li>
            </ul>
        </Stack>
    </div>
)

export default JuryCard
