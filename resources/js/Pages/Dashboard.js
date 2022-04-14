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
    Icon,
    Container
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
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
    auth,
    ...props
}) {
    const [image, setImage] = useState(null)
    const supabaseUrl = process.env.MIX_SUPABASE_URL;
    const supabaseKey = process.env.MIX_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const handleOnUpload = async (event) => {
        const avatarFile = event.target.files[0];
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload('public/redmetric1.jpg', avatarFile);
        console.log('d', data);
    }

    const handleOnPreview = async () => {
        const { signedURL, error } = await supabase
            .storage
            .from('avatars')
            .createSignedUrl('public/redmetric1.jpg', 60);
        setImage(signedURL);
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<Title>{title || ''}</Title>}
        >
            <Head title={title || ''} />
            <div className="container mx-auto my-5 pl-5 pr-5">
                <Flex
                    w="full"
                    gridColumnGap={4}
                    align="start"
                    justify="space-between"
                    direction={{ base: "column", md: "row" }}
                >
                    <Box width={{ base: "full", md: "33.333333%" }}>
                        {
                            parseInt(auth?.user?.role_id, 10) === 3
                                ? <JuryCard {...{ membership }} />
                                : <UserCard {...{ membership, village }} />
                        }
                    </Box>
                    <Box width={{ base: "full", md: "66.666667%" }} bg="white" p={3} borderTopWidth={4}>
                        {
                            parseInt(auth?.user?.role_id, 10) === 3
                                ? <JuryForm {...{ membership, provinces, auth }} />
                                : <ProfileForm {...{ membership, provinces, village, auth }} />
                        }
                    </Box>
                </Flex>
            </div>
        </Authenticated>
    );
}
