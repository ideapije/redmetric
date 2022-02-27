import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Uploader from '@/Components/Uploader';
import moment from 'moment'
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import UserCard from '@/Components/UserCard';
import ReactDatePicker from 'react-datepicker';
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputGroup,
    InputRightAddon,
    VStack,
    Heading,
    Text,
    Textarea,
    SimpleGrid,
    GridItem,
    Select,
    Checkbox,
    Button,
    Box,
    Flex,
    Spacer,
    HStack,
} from '@chakra-ui/react';

export default function JuryForm({
    membership,
    provinces,
    auth
}) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        ...membership,
        email: auth.user.email
    });

    const handleOnChange = (event) => {
        if (event.hasOwnProperty('target')) {
            setData(event.target.name, event.target.value);
        } else {
            setData('since', event)
        }
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.jury.update', membership));
    }
    return (
        <form onSubmit={submit}>
            <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
                <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                    <GridItem colSpan={1}>
                        <FormControl isRequired>
                            <FormLabel>Nama Depan</FormLabel>
                            <Input name="first_name" value={data.first_name || ''} onChange={handleOnChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Nama Belakang</FormLabel>
                            <Input name="last_name" value={data.last_name || ''} onChange={handleOnChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>E-mail</FormLabel>
                            <Input name="email" value={data.email || ''} onChange={handleOnChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>No. Handphone</FormLabel>
                            <Input name="phone" value={data.phone || ''} onChange={handleOnChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>Alamat Lengkap</FormLabel>
                            <Textarea name="address" value={data.address || ''} onChange={handleOnChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <SimpleGrid columns={3} columnGap={4}>
                            <GridItem colSpan={1}>
                                <FormControl>
                                    <FormLabel>Provinsi</FormLabel>
                                    <Select defaultValue={data.province || ''} name="province" onChange={handleOnChange}>
                                        {provinces?.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <FormControl isRequired>
                                    <FormLabel>Kabupaten/Kota</FormLabel>
                                    <Input name="city" value={data.city || ''} onChange={handleOnChange} />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <FormControl isRequired>
                                    <FormLabel>Kecamatan</FormLabel>
                                    <Input name="subdistrict" value={data.subdistrict || ''} onChange={handleOnChange} />
                                </FormControl>
                            </GridItem>
                        </SimpleGrid>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <HStack>
                            <Spacer />
                            <Button colorScheme="red" type="submit" size="lg" disabled={processing}>
                                Save
                            </Button>
                        </HStack>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </form>
    );
}
