import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { Center, Grid, GridItem } from '@chakra-ui/layout';
import {
    FormControl,
    FormLabel,
    Text,
    Box,
    useColorModeValue,
    Flex,
    Image,
    Link,
    SimpleGrid,
    Divider,
    Icon
} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { Button } from '@chakra-ui/button';
import Uploader from '@/Components/Uploader';
import UserCard from '@/Components/UserCard';
import Title from '@/Components/Title';
import JuryCard from '@/Components/JuryCard';
import JuryForm from './JuryForm';
import ProfileForm from './ProfileForm';

const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default function Dashboard({
    membership,
    provinces,
    village,
    errors,
    title,
    auth
}) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<Title>{title || ''}</Title>}
        >
            <Head title={title || ''} />
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-4/12 md:mx-2">
                        {
                            auth?.user?.role_id === 3
                                ? <JuryCard {...{ membership }} />
                                : <UserCard {...{ membership, village }} />
                        }
                    </div>

                    <div className="w-full md:w-8/12 mx-2 bg-white p-3 border-t-4 h-full">
                        {
                            auth?.user?.role_id === 3
                                ? <JuryForm {...{ membership, provinces, auth }} />
                                : <ProfileForm {...{ membership, provinces, village, auth }} />
                        }
                    </div>
                </div>
            </div>
        </Authenticated >
    );
}
