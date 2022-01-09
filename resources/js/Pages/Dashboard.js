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

const usePreviousValue = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default function Dashboard(props) {
    const [editDoc, setEditDoc] = useState(null)

    const { membership, village } = props;
    
    const identityCard = membership?.identities?.find((i) => i.type === 'idcard');
    const identityAssignment = membership?.identities?.find((i) => i.type === 'assigment');

    const prevIdC = usePreviousValue(identityCard);
    const prevIdA = usePreviousValue(identityAssignment);

    useEffect(() => {
        if (
            (editDoc && (identityCard?.document !== prevIdC?.document)) ||
            (editDoc && (identityAssignment?.document !== prevIdA?.document))
        ) {
            setEditDoc(null)
            window.location.reload()
        }
    }, [identityCard, identityAssignment, prevIdA, prevIdC, editDoc])
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<Title>{props.title || ''}</Title>}
        >
            <Head title={props.title || ''} />
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-4/12 md:mx-2">
                        <UserCard {...{ membership, village }} />
                    </div>

                    <div className="w-full md:w-8/12 mx-2 h-64 p-3">
                        
                    </div>
                </div>
            </div>
        </Authenticated >
    );
}
