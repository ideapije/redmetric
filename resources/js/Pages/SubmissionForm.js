import React, { useEffect, useRef, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { Button } from '@chakra-ui/button';
import { Box, Grid, GridItem, HStack, VStack, Wrap } from '@chakra-ui/layout';
import {
    Flex,
    Spacer,
    Stack,
    Divider,
    InputGroup,
    InputAddon,
    InputLeftAddon,
    InputRightAddon,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Link as BtnLink,
    Icon,
    SimpleGrid,
    Heading,
    Progress,
    useBreakpointValue,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Tag,
    TagLeftIcon,
    TagLabel,
    IconButton,
    ButtonGroup
} from '@chakra-ui/react';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    EmailIcon,
    CheckIcon,
    AttachmentIcon,
    DeleteIcon
} from '@chakra-ui/icons';
import ValidationErrors from '@/Components/ValidationErrors';
import Step from '@/Components/Step';
import { FormControl } from '@chakra-ui/form-control';
import { MdSend, MdAttachFile } from 'react-icons/md'
import { Input } from '@chakra-ui/input';
import { createClient } from '@supabase/supabase-js';

export default function SubmissionForm(props) {
    const { data, setData, post, put, get, processing, errors } = useForm({});
    const { period, steps } = props;
    const [uploadFailed, setUploadFailed] = useState({
        status: false,
        message: 'Please upload a file with a maximum size of 2 MB and format is : *.jpg, *.jpeg, *.png or *.pdf'
    });
    const [loading, setLoading] = useState({
        preview: false,
        upload: false,
        remove: false
    });
    const submitRef = useRef(null);
    const publishRef = useRef(null);
    const page = parseInt(props?.page, 10);
    const lastKey = steps.length;
    const colSpan = useBreakpointValue({ base: 2, md: 1 });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const supabaseUrl = process.env.MIX_SUPABASE_URL;
    const supabaseKey = process.env.MIX_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const handleOnChange = (value, index) => {
        console.log('event.target.value', value, index);
        const values = data?.map((v, vx) => {
            return (vx === index)
                ? { ...v, value }
                : v
        });
        setData(values);
    };

    const handleOnUpload = (event) => {
        if (uploadFailed.status) {
            setUploadFailed({
                ...uploadFailed,
                status: false
            });
        }
        const index = parseInt(event.target.id);
        const file = event.target.files[0];
        const fsize = Math.round((file.size / 1024));
        if (
            fsize <= 2048 &&
            ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
        ) {
            const updated = data.map((d, dx) => {
                if (dx === index) {
                    return {
                        ...d,
                        evidence: {
                            ...d.evidence,
                            name: 'a270f637daa2e.png',
                            file: 'redmetric-dev-bucket/public/a270f637daa2e.png'
                        }
                    }
                }
                return d;
            });
            setData(updated);
        } else {
            setUploadFailed({
                ...uploadFailed,
                status: true
            });
        }
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.user.submission.store', { period, page }));
    }
    const submitPublish = (e) => {
        e.preventDefault();
        put(route('dashboard.user.submission.publish', period));
    }
    const handleOnClickSave = () => {
        submitRef.current.click();
    }
    const handleOnClickPublish = () => {
        publishRef.current.click();
    }

    const handleOnPreviewFile = async (fileUrl) => {
        setLoading({
            ...loading,
            preview: true
        });
        const [bucketName, folderName, fileName] = fileUrl.split('/');
        const { publicURL, error } = await supabase
            .storage
            .from(bucketName)
            .getPublicUrl(`${folderName}/${fileName}`);
        if (publicURL) {
            setLoading({
                ...loading,
                preview: false
            });
            window.open(publicURL, '_blank');
        }
    }

    const handleOnRemoveFile = async (index, fileUrl) => {
        const updated = data.map((d, dx) => {
            if (dx === index) {
                return {
                    ...d,
                    evidence: null
                }
            }
            return d;
        });
        setData(updated);
        /*setLoading({
            ...loading,
            remove: true
        });
        const [bucketName, folderName, fileName] = fileUrl.split('/');
        const { data: deleted, error } = await supabase
            .storage
            .from(bucketName)
            .remove([`${folderName}/${fileName}`]);
        if (error) {
            setUploadFailed({
                status: true,
                message: error
            });
        }
        if (deleted) {
            const updated = data.map((d, dx) => {
                if (dx === index) {
                    return {
                        ...d,
                        evidence: null
                    }
                }
                return d;
            });
            setData(updated);
            setLoading({
                ...loading,
                remove: false
            });
        }*/
    }

    useEffect(() => {
        setData(props.inputs);
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Submission Form</h2>}
        >
            <Head title="Submission Form" />
            <Step items={steps} page={page} />
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"></div>
                </div>
            </div>
            <div className="container mx-auto my-5 p-5">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <form onSubmit={submit} encType="multipart/form-data" method="post">
                        <input type="hidden" name="_token" value={props.csrf_token} />
                        <ValidationErrors errors={errors} />
                        <Progress colorScheme="green" value={props?.progress} size="lg" />
                        <VStack w="full" spacing={10}>
                            {data && Object.values(data).map((d, ix) => (
                                <SimpleGrid w="full" spacing={4} key={ix} columns={2} px={4} py={4} bg="white" borderBottom="1px solid rgba(0,0,0,0.1)">
                                    <GridItem colSpan={2}>
                                        <VStack align="flex-start" spacing={4}>
                                            <Heading size="lg">{d?.indicator?.code}</Heading>
                                            <Text fontSize="xl">{d.label}</Text>
                                            <Text color="gray.400">{d?.indicator?.description}</Text>
                                            {d?.indicator?.evidence && <Text color="red.400" fontSize="sm">* {d.indicator.evidence}</Text>}
                                        </VStack>
                                    </GridItem>
                                    <GridItem colSpan={colSpan}>
                                        {d?.indicator?.evidence && (
                                            <>
                                                {
                                                    ((d?.evidence?.file) && d.evidence.file !== '0')
                                                        ? (
                                                            <ButtonGroup isAttached variant="outline">
                                                                <Button
                                                                    mr='-px'
                                                                    leftIcon={<Icon as={MdAttachFile} />}
                                                                    isLoading={loading.preview}
                                                                    onClick={() => handleOnPreviewFile(d?.evidence?.file)}
                                                                >
                                                                    Lihat Dokumen &nbsp;<u>{d?.evidence?.name}</u>
                                                                </Button>
                                                                <IconButton
                                                                    colorScheme="red"
                                                                    aria-label="Trash"
                                                                    icon={<DeleteIcon />}
                                                                    isLoading={loading.remove}
                                                                    onClick={() => handleOnRemoveFile(ix, d?.evidence?.file)}
                                                                />
                                                            </ButtonGroup>
                                                        )
                                                        : (
                                                            <>
                                                                <InputGroup mb={3}>
                                                                    <InputLeftAddon>
                                                                        <AttachmentIcon />
                                                                    </InputLeftAddon>
                                                                    <Input id={ix} type="file" name="evidence" onChange={handleOnUpload} placeholder="*.jpg, *.jpeg, *.png or *.pdf" />
                                                                    <InputRightAddon >
                                                                        Max. Size 2 MB
                                                                    </InputRightAddon>
                                                                </InputGroup>
                                                                {uploadFailed.status && <Text size="xs" color="red">{uploadFailed.message}</Text>}
                                                            </>
                                                        )
                                                }
                                            </>
                                        )}
                                    </GridItem>
                                    <GridItem colSpan={colSpan}>
                                        <Flex w="full" align="flex-end" justify="end">
                                            <FormControl w={{ base: "full", md: "50%" }}>
                                                <InputGroup>
                                                    <NumberInput value={d?.value}>
                                                        <NumberInputField
                                                            value={d?.value}
                                                            onChange={(e) => handleOnChange(e.target.value, ix)}
                                                            disabled={processing}
                                                        />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper onClick={() => handleOnChange(parseInt(d?.value, 10) + 1, ix)} />
                                                            <NumberDecrementStepper onClick={() => handleOnChange(parseInt(d?.value, 10) - 1, ix)} />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                    <InputRightAddon children={d.unit} />
                                                </InputGroup>
                                            </FormControl>
                                        </Flex>
                                    </GridItem>
                                </SimpleGrid>
                            ))}
                        </VStack>
                        <button type="submit" style={{ opacity: 0 }} ref={submitRef}></button>
                    </form>
                    <Flex
                        px={4}
                        py={2}
                        w="full"
                        bg="gray.50"
                        direction={{ base: "column", md: "row" }}
                    >
                        <Box w={{ base: "full", md: "85%" }} pb={4} pt={3}>
                            <Flex
                                w="full"
                                justify="space-between"
                            >
                                <Link href={route('dashboard.user.submission.form', { period, page: page - 1 })}>
                                    <Button
                                        variant="ghost"
                                        disabled={page === 1}
                                        leftIcon={<ArrowLeftIcon />}
                                    >
                                        Previous
                                    </Button>
                                </Link>
                                {((lastKey !== page) || ((lastKey === page) && (parseInt(props?.progress, 10) < 100))) && (
                                    <Link href={route('dashboard.user.submission.form', { period, page: page + 1 })}>
                                        <Button
                                            disabled={(lastKey === page)}
                                            variant="ghost"
                                            rightIcon={<ArrowRightIcon />}
                                        >
                                            Next
                                        </Button>
                                    </Link>
                                )}
                                {((lastKey === page) && (parseInt(props?.progress, 10) === 100)) && (
                                    <Button onClick={onOpen} rightIcon={<MdSend />} colorScheme='red' variant='solid'>
                                        Publish
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                        <Box w={{ base: "full", md: "15%" }} p={3}>
                            <Button
                                onClick={handleOnClickSave}
                                leftIcon={<CheckIcon />}
                                colorScheme="red"
                                w="full"
                                isLoading={processing}
                            >
                                Save
                            </Button>
                        </Box>
                    </Flex>
                </div>
                <form onSubmit={submitPublish} method="post">
                    <input type="hidden" name="_token" value={props.csrf_token} />
                    <input type="hidden" name="period" value={period.id || 0} />
                    <button type="submit" style={{ opacity: 0 }} ref={publishRef}></button>
                </form>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Publish Red Metric</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontSize='xl'>Apakah Anda yakin?</Text>
                            <Text fontSize='lg'>
                                Data yang terkirim tidak dapat di edit setelah <b>Publish Red Metric</b>
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='ghost' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button rightIcon={<MdSend />} colorScheme='red' variant='solid' onClick={handleOnClickPublish}>
                                Publish
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </Authenticated>
    );
}
