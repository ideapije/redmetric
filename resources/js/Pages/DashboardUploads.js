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

export default function DashboardUploads(props) {
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
                        <Box
                            role={'group'}
                            p={6}
                            w={'full'}
                            bg={useColorModeValue('white', 'gray.800')}
                            rounded={'lg'}
                            pos={'relative'}
                            zIndex={1}
                        >
                            {(identityCard && identityAssignment) && (
                                <Flex justify="space-between">
                                    <Box />
                                    <Box display="flex">
                                        {
                                            editDoc
                                                ? <Link onClick={() => setEditDoc(null)}><Text color='blue.500'>Batal</Text></Link>
                                                : (
                                                    <>
                                                        <Icon as={FaRegEdit} mr={3} />
                                                        <Link onClick={() => setEditDoc(true)}><Text color='blue.500'>Edit Dokumen</Text></Link>
                                                    </>
                                                )
                                        }
                                    </Box>
                                </Flex>
                            )}
                            <Box p={4} display={{ md: 'flex' }}>
                                <Box flexShrink={0} pt={6}>
                                    {
                                        (identityCard && !editDoc)
                                            ? (
                                                <>
                                                    <Image src={route('dashboard.profile.preview', { type: 'idcard' })} alt="ID card" borderRadius={10} w={300} />
                                                </>
                                            )
                                            : (
                                                <FormControl isRequired>
                                                    <FormLabel htmlFor='idcard'>Upload KTP</FormLabel>
                                                    <Uploader url={route('dashboard.profile.upload', membership)} type="idcard" />
                                                </FormControl>
                                            )
                                    }
                                </Box>
                                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                                    <Text
                                        fontWeight='bold'
                                        textTransform='uppercase'
                                        fontSize='sm'
                                        letterSpacing='wide'
                                        color='teal.600'
                                    >
                                        Kartu Identitas (KTP) Kepala Desa
                                    </Text>
                                    <Text mt={2} color='gray.500'>
                                        Kami pastikan data KTP yang telah terupload aman dan tidak ada penyalahgunaan.
                                        Kami juga merekomendasi untuk melakukan watermark dahulu sebelum Upload.
                                    </Text>
                                    <Link
                                        mt={2}
                                        mb={3}
                                        display='block'
                                        fontSize='lg'
                                        lineHeight='normal'
                                        fontWeight='semibold'
                                        href={'https://watermarkktp.com/'}
                                        target={'_blank'}
                                    >
                                        Watermark KTP
                                    </Link>
                                </Box>
                            </Box>
                            <Divider orientation='horizontal' />
                            <Box p={4} display={{ md: 'flex' }}>
                                <Box flexShrink={0} pt={6}>
                                    {
                                        (identityAssignment && !editDoc)
                                            ? (
                                                <object data={route('dashboard.profile.preview', { type: 'assigment' })} type="application/pdf">
                                                    <div>No online PDF viewer installed</div>
                                                </object>
                                            )
                                            : (
                                                <FormControl isRequired>
                                                    <FormLabel htmlFor='idcard'>Upload Surat Pernyataan</FormLabel>
                                                    <Uploader url={route('dashboard.profile.upload', membership)} type="assigment" />
                                                </FormControl>
                                            )
                                    }
                                </Box>
                                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                                    <Text
                                        fontWeight='bold'
                                        textTransform='uppercase'
                                        fontSize='sm'
                                        letterSpacing='wide'
                                        color='teal.600'
                                    >
                                        Surat Pernyataan
                                    </Text>
                                    <Text mt={1} color='gray.500'>
                                        Berkas surat pernyataan dapat diisi sesuai dengan template yang ada pada link download dibawah ini
                                    </Text>
                                    <Link href={route('dashboard.download')} mb={3}>
                                        <Button mt={2} mb={3} colorScheme='blue'>
                                            Download Template Surat Pernyataan
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>

                    </div>
                </div>
            </div>
        </Authenticated >
    );
}
